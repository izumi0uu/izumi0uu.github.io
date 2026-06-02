# Testing

统一测试入口基于 `Vitest + Playwright`。

## Commands

- `npm run test`
  - 先执行一次受控生产构建，再顺序运行 smoke 和 e2e。
- `npm run test:smoke`
  - 执行受控生产构建，然后运行 `Vitest` 的仓库契约检查。
- `npm run test:e2e`
  - 执行受控生产构建，自动确保 Chromium 已安装，然后启动 `astro preview` 并运行 `Playwright` 浏览器测试。

内部辅助脚本：

- `npm run test:build`
  - 通过 `tests/scripts/build-default-production.mjs` 执行构建。
  - 如果本地存在 `.env.production`，脚本会临时备份并在构建后恢复，保证 smoke / e2e 始终验证仓库默认的生产契约。

## Test layout

- `tests/smoke`
  - 维护仓库级契约和发布阻塞规则，例如环境变量回退、部署目录、生成产物约束。
- `tests/e2e`
  - 维护用户可见的真实浏览器路径。

## Current coverage

- `tests/smoke/build-contract.test.ts`
  - `SITE_URL` 在无环境文件时回退到 `https://izumi0uu.com`
  - `deploy` 脚本发布 `dist`
  - sitemap 和首页产物保持关键契约
- `tests/smoke/seo-contract.test.ts`
  - 默认 Open Graph 图来自真实静态资源
  - `feed.json` / `feed.xml` 产物存在
  - 页面 metadata 不再指向缺失的 `/api/open-graph/*`
- `tests/smoke/locale-contract.test.ts`
  - `/en/` 和 `/zh/` 首页都会在静态 HTML 中输出对应 locale 的 header 文案
  - 根路径重定向页会先读取 `user-preferred-lang`，默认 locale 只保留为 `noscript` fallback
  - 缺失翻译时的 locale fallback 目标保持可预测
- `tests/e2e/home.spec.ts`
  - `/` 会重定向到 `/en/`
  - `/en/` 会渲染 hero 区块和博客主入口
- `tests/e2e/locale-routing.spec.ts`
  - 根路径会尊重本地保存的首选语言并直接落到 `/zh/`
  - About 页面语言切换会命中对应的 locale 前缀静态路由

## Notes

- `test` 和 `test:e2e` 会先执行 `playwright install chromium`，首次运行会有浏览器下载时间，后续通常会复用本地缓存。
