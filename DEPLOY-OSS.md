# 阿里云 OSS 部署（静态网站托管）

站点是纯静态的：没有构建、没有依赖，上传后由 OSS 直接对外提供访问，不需要买服务器。

整套流程分两段：**本机跑一次脚本**（传文件、建 Bucket、开静态托管），**控制台点几下**（关掉阻止公共访问、绑域名、配 HTTPS）。之后更新网站只要重跑脚本。

---

## 0. 先想清楚两件事

**① 必须有一个域名。**
OSS 的默认域名（`xxx.oss-cn-hongkong.aliyuncs.com`）访问 HTML 时，浏览器会被强制下载而不是显示网页，这是阿里云的安全策略。只有绑定自定义域名后，网站才能像正常网页一样打开。域名在[阿里云万网](https://wanwang.aliyun.com/domain)买，普通 `.com` 大约 60–80 元/年，`.top`、`.site` 这类首年更便宜。

**② 地域选香港，可以省掉备案。**
- **中国香港（`oss-cn-hongkong`）**：绑域名不需要 ICP 备案，当天就能上线。内地访问速度略慢于内地节点，但对个人站点完全够用。**推荐。**
- **内地地域（如杭州）**：必须完成 ICP 备案才能绑域名；而且纯 OSS 账号拿不到备案服务号（备案服务号需要 ECS 等付费产品），流程会拖到两三周。

下面的步骤按香港写。要换地域，只需把脚本的 `-Region` 换成对应 ID，例如 `-Region oss-cn-hangzhou`。

---

## 1. 建一个 RAM 子账号（别用主账号 AccessKey）

主账号 AccessKey 泄露等于账号被接管。建一个只干 OSS 这件事的子账号：

1. 打开 [RAM 访问控制](https://ram.console.aliyun.com/users) → **创建用户**
2. 登录名称随便填（如 `oss-deploy`），**访问方式勾选「OpenAPI 调用访问」**
3. 创建完成后立刻复制 **AccessKey ID** 和 **AccessKey Secret**（Secret 只显示一次）
4. 给这个用户授权。想省事可以直接加系统策略 `AliyunOSSFullAccess`；想更收敛，用自定义策略：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "oss:PutBucket",
        "oss:GetBucketInfo",
        "oss:GetBucketAcl",
        "oss:PutBucketAcl",
        "oss:PutBucketWebsite",
        "oss:GetBucketWebsite",
        "oss:GetBucketStat",
        "oss:PutObject",
        "oss:GetObject",
        "oss:ListObjects"
      ],
      "Resource": ["acs:oss:*:*:*"]
    }
  ]
}
```

部署完可以把这个子账号停用或删掉，需要更新时再启用。

---

## 2. 在本机运行部署脚本

在项目目录 `D:\website_jh` 打开 PowerShell（不需要管理员）：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\deploy-oss.ps1
```

脚本会依次做六件事，并按提示问你 AccessKey、Bucket 名称（回车用随机建议名）：

| 步骤 | 做什么 |
| --- | --- |
| 1 | 检查/下载官方 ossutil（`tools\ossutil64.exe`，带 SHA256 校验），不装到系统里 |
| 2 | 创建 Bucket（已存在就跳过） |
| 3 | 配置静态网站托管：首页 `index.html`、错误页 `404.html` |
| 4 | 生成 `_publish\` 发布内容并上传（按类型设置 Content-Type，只传变化的文件） |
| 5 | 把 Bucket 设为公共读 |
| 6 | 自检 `index.html` 是否返回 200 |

也可以先把密钥放进环境变量，避免留在命令历史里：

```powershell
$env:OSS_ACCESS_KEY_ID = 'LTAI...'
$env:OSS_ACCESS_KEY_SECRET = '...'
.\deploy-oss.ps1 -Bucket maki-site-2026 -Region oss-cn-hongkong
```

**第 5 步大概率会失败**，这是正常的：2025 年 10 月起新建的 Bucket 默认开启「阻止公共访问」，必须先关掉才能设公共读。照第 3 节做，然后重跑脚本（已上传的文件会跳过）。

---

## 3. 控制台收尾

打开 [OSS 控制台](https://oss.console.aliyun.com/bucket) → 点你的 Bucket。

### 3.1 关闭「阻止公共访问」

**权限控制 → 阻止公共访问 → 关闭**，弹窗里输入「我确认关闭阻止公共访问」→ 确定。

然后重新运行一次 `.\deploy-oss.ps1`，让脚本把 Bucket 设成公共读并自检通过。

> 公共读意味着任何知道 URL 的人都能下载这些文件。这个站本来就是公开的展示站，没问题；但别把私密资料放进这个 Bucket。

### 3.2 绑定域名

**Bucket 配置 → 域名管理 → 绑定域名**，填写 `www.你的域名.com` 或 `你的域名.com`，按提示确认。

然后去[云解析 DNS](https://dns.console.aliyun.com/) → 你的域名 → 解析设置 → 添加记录：

| 记录类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| CNAME | `www` | `你的bucket名.oss-cn-hongkong.aliyuncs.com` |

用主域名（`@`）的话，先确认没有同名的 A 记录，否则不能共存。DNS 生效通常几分钟到几小时。

### 3.3 开启 HTTPS（强烈建议）

**域名管理** 里对应域名那一行 → **证书托管** → 选择证书 → 上传。

没有证书的话，先去[数字证书管理服务](https://yundun.console.aliyun.com/?p=cas)申请一张**免费证书**（个人测试证书，3 个月有效），签发后再回这里选择。证书到期前记得续，否则会报「不安全」。

---

## 4. 验证

- `https://你的域名/` → 显示首页
- `https://你的域名/travel.html` → 显示旅游页
- `https://你的域名/随便一个不存在的路径` → 显示自定义 404 页，并返回 404 状态码

---

## 5. 以后更新

改完 `index.html`、`content.js`、`styles.css` 或 `assets/` 里的图片后，直接重跑：

```powershell
.\deploy-oss.ps1 -Bucket maki-site-2026 -Region oss-cn-hongkong
```

脚本会重新生成 `_publish\`，只上传有变化的文件（几十个文件通常十几秒）。域名、HTTPS、静态托管配置都不用重做。

想只发布、不重建 Bucket 和托管配置，可以加 `-NoUpload` 做预检，或者直接跑上传那一步：

```powershell
.\tools\ossutil64.exe cp -r .\_publish\ oss://maki-site-2026/ -f -u
```

（这样用需要先生成过 `tools\ossutil64.exe`，并先执行过一次 `ossutil config`。）

---

## 6. 费用大概多少

按 56 MB 图片 + 一个月的正常访问量估算：

| 项目 | 单价（香港，参考） | 你的用量 | 月费 |
| --- | --- | --- | --- |
| 标准存储 | 约 0.15 元/GB/月 | 0.06 GB | 约 0.01 元 |
| 外网流出流量 | 约 0.5 元/GB | 假设 5 GB | 约 2.5 元 |
| 请求次数 | 约 0.01 元/万次 | 几万次 | 几毛钱 |

加起来每月几块钱，主要开销是流量。域名是独立支出（几十元/年）。阿里云 OSS 通常有 40 GB 免费额度（以控制台最新公告为准）。

---

## 7. 出问题怎么办

| 现象 | 原因 / 处理 |
| --- | --- |
| 打开域名变成下载文件 | 还没有绑定自定义域名，或解析没生效；检查 CNAME |
| 访问返回 403 | Bucket 不是公共读。回到 3.1 关闭阻止公共访问后重跑脚本 |
| 访问返回 `NoSuchWebsiteConfiguration` | 静态托管没配成功，重跑脚本第 3 步，或看控制台「数据管理 → 静态页面」 |
| 上传报 `Endpoint` 相关错误 | `-Region` 和 Bucket 实际地域不一致，换成正确的 region ID |
| 上传报 `InvalidAccessKeyId` | AccessKey 写错，或子账号被停用 |
| 上传报 `AccessDenied` | 子账号缺少权限，按第 1 节策略补上 |
| 页面样式错乱 | 检查 `styles.css`、`content.js` 是否上传成功（`ossutil ls oss://你的bucket/`） |

---

## 附：为什么不用默认域名

官方文档明确说明：使用 Bucket 域名访问 HTML 文件时，浏览器会强制下载而非在线预览，要实现网页正常浏览必须绑定自定义域名。

- [静态网站托管](https://help.aliyun.com/zh/oss/user-guide/hosting-static-websites)
- [通过自定义域名访问 OSS](https://help.aliyun.com/zh/oss/user-guide/access-buckets-via-custom-domain-names)
- [通过 HTTPS 协议访问 OSS](https://help.aliyun.com/zh/oss/user-guide/access-oss-by-https-protocol)
- [ossutil 安装](https://help.aliyun.com/zh/oss/developer-reference/install-ossutil)
