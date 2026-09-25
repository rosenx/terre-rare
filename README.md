# TERRE RARE

TERRE RARE 品牌展示官网。完整静态网站，使用 HTML、CSS 和 JavaScript，无需安装前端依赖或执行构建。

## 已包含

- 响应式首页与原版品牌 Logo 显露动画
- 随滚动缩小的首屏，以及两侧图片逐步出现的效果
- 产品筛选、产品详情弹窗与移动端导航
- Ingredient Journal、Why Fewer、Traceability 和 Fingertip Moments
- 用户提供的产品图片、一个全站共用的固定背景
- 键盘操作、减少动态效果偏好支持

## 本地预览

在本目录打开终端，运行：

```sh
python3 -m http.server 8000 --directory docs
```

Windows 也可使用 `py -m http.server 8000 --directory docs`。

然后打开 http://localhost:8000 。按 Ctrl+C 停止本地服务器。

## 发布到 GitHub Pages

1. 将本项目全部文件上传到 GitHub 仓库的 `main` 分支，保留文件夹结构。
2. 打开仓库的 **Settings → Pages**，在 **Build and deployment → Source** 选择 **GitHub Actions**。
3. 打开 **Actions → Publish Terre Rare → Run workflow** 运行一次；以后提交到 `main` 会自动更新。
4. 成功后，发布网址显示在工作流结果和 **Settings → Pages** 中。

配置依据：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

若无法使用 Actions，也可选择 **Deploy from a branch → main → /docs**。两种方式选择一种即可。

## 修改内容

| 文件 | 用途 |
|---|---|
| `docs/index.html` | 首页 |
| `docs/style.css` | 共用样式、响应式布局、背景及动画 |
| `docs/script.js` | 导航、筛选、弹窗、滚动效果 |
| `docs/journal.html` | 内容索引 |
| `docs/ingredient-to-formula.html` | 原料与配方文章 |
| `docs/fingertip-moments.html` | 品牌摄影系列 |
| `docs/why-fewer.html` | 品牌理念 |
| `docs/traceability.html` | 产品追溯信息状态 |
| `docs/assets/` | 网站图片 |

所有站内链接都使用相对地址，兼容 GitHub Pages 的仓库子路径。字体来自 Google Fonts；字体请求失败时会使用本地备用字体。图片均随项目提供，无需外部图片服务。

## 检查

```sh
python3 scripts/check_site.py
node --check docs/script.js
```

## 内容状态

这是可独立运行的品牌展示网站，不含购物车、支付、订单、用户账户或数据库。未提供的原料来源、批次编号、价格、供货情况和专家背书仍明确标记为待确认。上线不代表这些业务信息已经核实。

原版 Logo 和产品图片归相关权利人所有。具体素材来源见 `ASSETS.md`，品牌内容与待补充信息见 `BRAND-CONTENT.md`。项目未擅自添加开源许可。
