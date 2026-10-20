# 上线与更新

这是一个纯静态站点。仓库根目录就是网站根目录，不需要安装依赖，也没有构建命令。

## 第一次上线

1. 在 GitHub 新建一个仓库。免费使用 GitHub Pages 时建议选择 **Public**。
2. 在本地项目目录添加远程仓库并推送：

```powershell
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

3. 打开仓库的 **Settings → Pages**：
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **main**
   - Folder 选择 **/ (root)**
   - 点击 **Save**

4. 等一两分钟，访问 GitHub 给出的地址：
   - 仓库名为 `<用户名>.github.io`：`https://<用户名>.github.io/`
   - 其他仓库名：`https://<用户名>.github.io/<仓库名>/`

## 以后更新

修改页面、`content.js` 或 `assets/` 后执行：

```powershell
git status
git add -A
git commit -m "更新旅行记录"
git push
```

推送完成后，GitHub Pages 会自动重新发布。也可以使用 GitHub Desktop 完成提交和推送。

## 绑定自己的域名

在 **Settings → Pages → Custom domain** 填写域名，然后按 GitHub 提示配置 DNS。DNS 生效后开启 **Enforce HTTPS**。

## 不进入仓库的文件

`previews/`、`dist/`、`Sucai/`、分享压缩包、`_verify*.js` 和 `.chrome-*` 都是本地文件，已写入 `.gitignore`，不会上传到 GitHub。

## 注意

- 公开仓库意味着网页里的文字、照片和联系方式也会公开。
- GitHub Pages 在国内的访问速度可能不稳定。如果以后主要给国内访客看，可以保留 GitHub 作为源码仓库，改用国内对象存储/CDN，或连接到 Cloudflare Pages 发布。
