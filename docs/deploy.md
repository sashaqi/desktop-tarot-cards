# 部署网页版

渲染层没有任何 Electron / Node 依赖，所有经过 preload 桥接的调用都有兜底，所以同一份源码可以直接构建成静态站点。

```bash
npm run build:web     # 产物在 dist-web/
npm run preview:web   # 本地预览产物
```

`BASE_PATH` 控制资源前缀：托管在域名根目录时留空，托管在子路径时设为该路径。

```bash
BASE_PATH=/desktop-tarot-cards/ npm run build:web
```

## GitHub Pages（已自动化）

`.github/workflows/deploy-web.yml` 会在 push 到 `main` 时自动构建并发布。

**首次需要手动开启一次**：仓库 → Settings → Pages → Source 选择 **GitHub Actions**。

之后每次 push 自动更新，地址为 `https://<用户名>.github.io/desktop-tarot-cards/`。

## Cloudflare Pages（国内访问更稳，需在控制台配置一次）

GitHub Pages 在国内访问不稳定，建议同时部署一份 Cloudflare 镜像。两者用同一个仓库、同一份构建产物。

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授权并选择 `desktop-tarot-cards` 仓库
3. 构建配置填：

   | 项目 | 值 |
   |---|---|
   | Framework preset | None |
   | Build command | `npm run build:web` |
   | Build output directory | `dist-web` |
   | Root directory | *(留空)* |

4. 环境变量**不用设** `BASE_PATH`——Cloudflare 从根目录提供服务，默认的 `/` 正确
5. 保存后自动构建，得到 `https://<项目名>.pages.dev`

之后 push 到 `main` 时两边都会自动更新。

## 关于 AI 解读

网页版不提供 AI 解读，这是有意的：Anthropic API Key 一旦填进网页就等于公开泄露，而且浏览器直连 Anthropic 也会被 CORS 拦截。`AiReadingPanel` 检测不到 `window.api` 时会自行隐藏，本地牌意库不受影响。

需要 AI 解读的用户请使用桌面版。
