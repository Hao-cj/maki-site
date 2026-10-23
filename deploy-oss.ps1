<#
.SYNOPSIS
    Maki 个人站点 · 一键发布到阿里云 OSS（静态网站托管）

.DESCRIPTION
    脚本会依次完成：
      1. 准备官方 ossutil（缺失时自动下载并校验 SHA256）
      2. 创建 Bucket（已存在则跳过）
      3. 配置静态网站托管：默认首页 index.html、404 页 404.html
      4. 上传 _publish\ 下的全部文件（带正确的 Content-Type，增量上传）
      5. 把 Bucket 设为公共读
      6. 自检 index.html 是否可访问

    可以重复运行：内容没变的文件会被跳过，适合日常更新。

.PARAMETER Bucket
    Bucket 名称，全局唯一，只能小写字母、数字和短横线。

.PARAMETER Region
    地域 ID，默认香港 oss-cn-hongkong（免 ICP 备案）。
    内地地域如 oss-cn-hangzhou 需要用已备案的域名绑定。

.PARAMETER CustomDomain
    可选。已绑定到该 Bucket 的自定义域名，仅用于最后打印访问地址。

.PARAMETER NoUpload
    只创建 Bucket、配置静态托管和权限，不上传文件。

.EXAMPLE
    .\deploy-oss.ps1
    交互式输入 AccessKey、Bucket 等参数。

.EXAMPLE
    $env:OSS_ACCESS_KEY_ID='LTAI...'; $env:OSS_ACCESS_KEY_SECRET='...'
    .\deploy-oss.ps1 -Bucket maki-site-2026 -Region oss-cn-hongkong
#>
[CmdletBinding()]
param(
    [string]$Bucket,
    [string]$Region = 'oss-cn-hongkong',
    [string]$AccessKeyId = $env:OSS_ACCESS_KEY_ID,
    [string]$AccessKeySecret = $env:OSS_ACCESS_KEY_SECRET,
    [string]$CustomDomain = $env:OSS_CUSTOM_DOMAIN,
    [switch]$NoUpload
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$script:root = $PSScriptRoot
if (-not $script:root) { $script:root = (Get-Location).Path }
$script:ossutil = $null
$script:cfg = $null

function Write-Step {
    param([string]$Text)
    Write-Host ''
    Write-Host ('=' * 64) -ForegroundColor DarkCyan
    Write-Host "  $Text" -ForegroundColor Cyan
    Write-Host ('=' * 64) -ForegroundColor DarkCyan
}

function Write-Info { param([string]$Text) Write-Host "  $Text" -ForegroundColor Gray }
function Write-Ok   { param([string]$Text) Write-Host "  [OK] $Text" -ForegroundColor Green }
function Write-Warn { param([string]$Text) Write-Host "  [注意] $Text" -ForegroundColor Yellow }

function Invoke-Oss {
    param(
        [Parameter(Mandatory = $true)][string[]]$OssArgs,
        [switch]$AllowFailure
    )
    $raw = & $script:ossutil @OssArgs -c $script:cfg 2>&1
    $code = $LASTEXITCODE
    $text = (($raw | ForEach-Object { "$_" }) -join "`n").Trim()
    if ($code -ne 0 -and -not $AllowFailure) {
        if ($text) { Write-Host $text -ForegroundColor DarkYellow }
        throw "ossutil 执行失败（退出码 $code）：ossutil $($OssArgs -join ' ')"
    }
    return [pscustomobject]@{ Code = $code; Text = $text }
}

function Get-Ossutil {
    $toolsDir = Join-Path $script:root 'tools'
    $exe = Join-Path $toolsDir 'ossutil64.exe'
    if (Test-Path $exe) { return $exe }

    $zipUrl = 'https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-windows-amd64.zip'
    $zipSha = '8e9176aedc87d230ccd97dc7236b16564f2a068609ed301acdc73dc27faf7e77'

    Write-Info '未找到 ossutil，正在从阿里云官方地址下载（约 15 MB）…'
    if (-not (Test-Path $toolsDir)) { New-Item -ItemType Directory -Path $toolsDir | Out-Null }
    $zip = Join-Path $toolsDir 'ossutil.zip'
    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -Uri $zipUrl -OutFile $zip -UseBasicParsing

    $actual = (Get-FileHash -Path $zip -Algorithm SHA256).Hash.ToLower()
    if ($actual -ne $zipSha) {
        Remove-Item $zip -Force
        throw "ossutil 安装包校验失败（期望 $zipSha，实际 $actual），已删除下载的文件。请检查网络是否被劫持，或手动从 $zipUrl 下载后放到 tools\ossutil64.exe。"
    }
    Write-Ok '安装包 SHA256 校验通过'

    $tmp = Join-Path $toolsDir 'unzip'
    if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
    Expand-Archive -Path $zip -DestinationPath $tmp -Force
    $found = Get-ChildItem -Path $tmp -Filter '*.exe' -Recurse | Select-Object -First 1
    if (-not $found) { throw '安装包内没有找到 ossutil 可执行文件。' }
    Move-Item $found.FullName $exe -Force
    Remove-Item $tmp -Recurse -Force
    Remove-Item $zip -Force
    return $exe
}

function New-OssConfig {
    $path = Join-Path ([IO.Path]::GetTempPath()) ("ossutil-{0}.cfg" -f ([guid]::NewGuid().ToString('N')))
    $lines = @(
        '[Credentials]'
        'language=CH'
        "endpoint=$script:endpoint"
        "accessKeyID=$AccessKeyId"
        "accessKeySecret=$AccessKeySecret"
    )
    # 必须是无 BOM 的 UTF-8：带 BOM 时 ossutil 可能读不出 [Credentials] 段
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, (($lines -join "`r`n") + "`r`n"), $utf8NoBom)
    return $path
}

function New-PublishSet {
    # 只把网站真正需要的文件复制到 _publish，避免 previews/、压缩包被传上去
    $pub = Join-Path $script:root '_publish'
    if (Test-Path $pub) { Remove-Item $pub -Recurse -Force }
    New-Item -ItemType Directory -Path $pub | Out-Null

    $files = @('index.html', 'travel.html', 'recommendations.html', 'food.html',
        '404.html', 'styles.css', 'script.js', 'content.js', '.nojekyll')
    foreach ($name in $files) {
        $path = Join-Path $script:root $name
        if (Test-Path $path) { Copy-Item $path -Destination $pub -Force }
    }

    $assets = Join-Path $script:root 'assets'
    if (Test-Path $assets) {
        Copy-Item $assets -Destination (Join-Path $pub 'assets') -Recurse -Force
    }

    $items = Get-ChildItem -Path $pub -Recurse -File
    $mb = [math]::Round((($items | Measure-Object -Property Length -Sum).Sum / 1MB), 1)
    Write-Info "已生成发布内容：$($items.Count) 个文件，约 $mb MB"
    return $pub
}

function Resolve-Region {
    param([string]$Value)
    $v = $Value.Trim().ToLower()
    if ($v -match '://') { $v = ($v -split '://')[1] }
    $v = $v -replace '/.*$', ''
    if ($v -like '*.aliyuncs.com') {
        $id = ($v -split '\.')[0]
        if ($id.StartsWith('oss-')) { $id = $id.Substring(4) }
        return [pscustomobject]@{ Id = "oss-$id"; Endpoint = "$v".TrimEnd('/') }
    }
    if ($v.StartsWith('oss-')) { return [pscustomobject]@{ Id = $v; Endpoint = "$v.aliyuncs.com" } }
    return [pscustomobject]@{ Id = "oss-$v"; Endpoint = "oss-$v.aliyuncs.com" }
}

# ---------------------------------------------------------------- 交互式补齐参数
Write-Host ''
Write-Host '  Maki 个人站点 · 阿里云 OSS 一键发布' -ForegroundColor White
Write-Host '  纯静态站点，无需服务器；上传后由 OSS 直接对外提供访问。' -ForegroundColor DarkGray

if (-not $AccessKeyId) { $AccessKeyId = (Read-Host '  请输入 AccessKey ID').Trim() }
if (-not $AccessKeySecret) {
    $sec = Read-Host '  请输入 AccessKey Secret（输入时不显示）' -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
    try { $AccessKeySecret = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}
if (-not $Bucket) {
    $suggest = 'maki-site-' + (-join ((48..57) + (97..122) | Get-Random -Count 6 | ForEach-Object { [char]$_ }))
    $answer = (Read-Host "  请输入 Bucket 名称（全局唯一，仅小写字母/数字/短横线，回车用 $suggest）").Trim()
    if (-not $answer) { $answer = $suggest }
    $Bucket = $answer
}

$AccessKeyId = $AccessKeyId.Trim()
$AccessKeySecret = $AccessKeySecret.Trim()
$Bucket = $Bucket.Trim().ToLower()

if ($Bucket -notmatch '^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$') {
    throw "Bucket 名称不合法：$Bucket（3-63 位，只能小写字母、数字、短横线，且不能以短横线开头或结尾）"
}
if (-not $AccessKeyId -or -not $AccessKeySecret) { throw 'AccessKey 不完整，已退出。' }

$regionInfo = Resolve-Region $Region
$script:endpoint = $regionInfo.Endpoint
$bucketUrl = "http://$Bucket.$($regionInfo.Endpoint)/"

Write-Info "Bucket   : $Bucket"
Write-Info "地域     : $($regionInfo.Id)（$($regionInfo.Endpoint)）"
Write-Info "发布目录 : $script:root\_publish"

# ---------------------------------------------------------------- 1. ossutil
Write-Step '1/6 准备 ossutil'
$script:ossutil = Get-Ossutil
$script:cfg = New-OssConfig

try {
    $ver = Invoke-Oss -OssArgs @('--version') -AllowFailure
    Write-Ok "ossutil 就绪：$(($ver.Text -replace "`r?`n", ' ').Trim())"
    # ------------------------------------------------------------ 2. Bucket
    Write-Step '2/6 检查 / 创建 Bucket'
    $mb = Invoke-Oss -OssArgs @('mb', "oss://$Bucket") -AllowFailure
    if ($mb.Code -eq 0) {
        Write-Ok 'Bucket 创建成功'
    }
    elseif ($mb.Text -match 'AlreadyExists|BucketAlreadyExists|already exists|已存在') {
        # 名字可能属于自己，也可能被其他账号占用，用一次列目录来区分
        $probe = Invoke-Oss -OssArgs @('ls', "oss://$Bucket/", '--limited-num', '1') -AllowFailure
        if ($probe.Code -eq 0) {
            Write-Ok 'Bucket 已存在且属于当前账号，继续'
        }
        elseif ($probe.Text -match 'AccessDenied|AccessDeniedError|Forbidden') {
            Write-Host $probe.Text -ForegroundColor DarkYellow
            throw "Bucket 名称 $Bucket 已被其他阿里云账号占用，请换一个名称后重试。"
        }
        else {
            Write-Ok 'Bucket 已存在，继续'
        }
    }
    else {
        Write-Host $mb.Text -ForegroundColor DarkYellow
        throw '创建 Bucket 失败。常见原因：名称已被他人占用、AccessKey 无 oss:PutBucket 权限、或地域与 AccessKey 所属账号不符。'
    }

    # ------------------------------------------------------------ 3. 静态网站托管
    Write-Step '3/6 配置静态网站托管（index.html / 404.html）'
    $xml = Join-Path $env:TEMP ("oss-website-{0}.xml" -f ([guid]::NewGuid().ToString('N')))
    $websiteXml = @'
<?xml version="1.0" encoding="UTF-8"?>
<WebsiteConfiguration>
    <IndexDocument>
        <Suffix>index.html</Suffix>
    </IndexDocument>
    <ErrorDocument>
        <Key>404.html</Key>
    </ErrorDocument>
</WebsiteConfiguration>
'@
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($xml, $websiteXml, $utf8NoBom)
    try {
        Invoke-Oss -OssArgs @('website', '--method', 'put', "oss://$Bucket", $xml) | Out-Null
        Write-Ok '默认首页 index.html、错误页 404.html 已生效'
    }
    finally {
        if (Test-Path $xml) { Remove-Item $xml -Force }
    }

    # ------------------------------------------------------------ 4. 上传
    if (-not $NoUpload) {
        Write-Step '4/6 上传网站文件'
        $pub = New-PublishSet
        if (-not (Test-Path (Join-Path $pub 'index.html'))) {
            throw "发布内容不完整：$pub 下没有 index.html，请确认项目根目录文件齐全。"
        }
        $pubArg = $pub.TrimEnd('\') + '\'

        # 先按类型上传，确保 Content-Type 正确（浏览器据此决定预览还是下载）
        $passes = @(
            @{ Name = 'HTML 页面'; Patterns = @('*.html'); Meta = 'Content-Type:text/html; charset=utf-8#Cache-Control:no-cache' },
            @{ Name = '样式表'; Patterns = @('*.css'); Meta = 'Content-Type:text/css; charset=utf-8#Cache-Control:public, max-age=86400' },
            @{ Name = 'JavaScript'; Patterns = @('*.js'); Meta = 'Content-Type:application/javascript; charset=utf-8#Cache-Control:public, max-age=86400' },
            @{ Name = '图片'; Patterns = @('*.jpg', '*.jpeg', '*.png', '*.webp', '*.avif', '*.gif', '*.svg', '*.ico'); Meta = 'Cache-Control:public, max-age=604800' },
            @{ Name = '文本'; Patterns = @('*.txt', '*.md', '*.json', '*.xml'); Meta = 'Cache-Control:public, max-age=3600' }
        )
        foreach ($pass in $passes) {
            $cmdArgs = @('cp', '-r', $pubArg, "oss://$Bucket/", '-f', '-u', '-j', '10', '--meta', $pass.Meta)
            foreach ($pattern in $pass.Patterns) { $cmdArgs += @('--include', $pattern) }
            $r = Invoke-Oss -OssArgs $cmdArgs -AllowFailure
            if ($r.Code -ne 0) {
                Write-Warn "$($pass.Name) 上传返回非零退出码，继续尝试其余文件"
                if ($r.Text) { Write-Host $r.Text -ForegroundColor DarkYellow }
            }
            else {
                Write-Ok "$($pass.Name) 已同步"
            }
        }

        # 兜底：把上面没匹配到的文件也传上去（已上传的会被 -u 跳过）
        $rest = Invoke-Oss -OssArgs @('cp', '-r', $pubArg, "oss://$Bucket/", '-f', '-u', '-j', '10') -AllowFailure
        if ($rest.Code -ne 0) {
            Write-Host $rest.Text -ForegroundColor DarkYellow
            throw '上传失败，请查看上面的 ossutil 报错。'
        }
        Write-Ok '全部文件上传完成'
    }
    else {
        Write-Step '4/6 已跳过上传（-NoUpload）'
    }

    # ------------------------------------------------------------ 5. 公共读
    Write-Step '5/6 设置 Bucket 为公共读'
    $acl = Invoke-Oss -OssArgs @('set-acl', "oss://$Bucket", 'public-read') -AllowFailure
    if ($acl.Code -eq 0) {
        Write-Ok 'Bucket 已是公共读，匿名访客可以读取网站文件'
    }
    else {
        Write-Host $acl.Text -ForegroundColor DarkYellow
        Write-Warn '设置为公共读失败。新版 Bucket 默认开启「阻止公共访问」，需要先关掉它：'
        Write-Info '阿里云控制台 → OSS → 该 Bucket → 权限控制 → 阻止公共访问 → 关闭 → 回填「我确认关闭阻止公共访问」'
        Write-Info "关闭后重新运行本脚本即可（已上传的文件不会重复上传）。"
    }

    # ------------------------------------------------------------ 6. 自检
    Write-Step '6/6 自检'
    $checkUrl = "http://$Bucket.$($regionInfo.Endpoint)/index.html"
    try {
        $resp = Invoke-WebRequest -Uri $checkUrl -Method Head -UseBasicParsing -TimeoutSec 20
        if ($resp.StatusCode -eq 200) {
            Write-Ok "index.html 可访问（HTTP 200）"
        }
        else {
            Write-Warn "index.html 返回 HTTP $($resp.StatusCode)"
        }
    }
    catch {
        $code = $null
        if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
        if ($code -eq 403) {
            Write-Warn 'HTTP 403：Bucket 还不是公共读，见第 5 步的提示。'
        }
        else {
            Write-Warn "访问自检未通过：$($_.Exception.Message)"
        }
    }

    $total = Invoke-Oss -OssArgs @('du', "oss://$Bucket/") -AllowFailure
    if ($total.Code -eq 0 -and $total.Text) {
        Write-Info ($total.Text -split "`n" | Select-Object -Last 1)
    }

    # ------------------------------------------------------------ 收尾
    Write-Step '完成'
    Write-Host ''
    Write-Host '  控制台地址 : https://oss.console.aliyun.com/bucket' -ForegroundColor White
    Write-Host "  Bucket 域名: $bucketUrl" -ForegroundColor White
    Write-Host '  （注意：直接访问 Bucket 域名时，HTML 会被浏览器强制下载，这是 OSS 的安全策略）' -ForegroundColor DarkGray
    Write-Host ''
    Write-Host '  要让网站像正常网页一样打开，还需绑定自定义域名：' -ForegroundColor White
    Write-Host '    1. Bucket → Bucket 配置 → 域名管理 → 绑定域名' -ForegroundColor Gray
    Write-Host '    2. 域名解析加一条 CNAME，指向上面的 Bucket 域名' -ForegroundColor Gray
    Write-Host '    3. 需要 HTTPS 时，在同一页面「证书托管」里选一张证书' -ForegroundColor Gray
    if ($CustomDomain) {
        Write-Host ''
        Write-Host "  自定义域名 : http://$CustomDomain" -ForegroundColor White
    }
    Write-Host ''
    Write-Host '  详细步骤见 DEPLOY-OSS.md' -ForegroundColor DarkGray
    Write-Host ''
}
finally {
    if ($script:cfg -and (Test-Path $script:cfg)) { Remove-Item $script:cfg -Force -ErrorAction SilentlyContinue }
}
