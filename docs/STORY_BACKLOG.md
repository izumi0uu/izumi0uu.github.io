# Story Backlog

基于 2026-06-01 的仓库审查结果整理。

说明：
- 本文档只基于当前仓库代码、现有页面、脚本配置和本地命令验证结果。
- `P0` 表示发布阻塞或主流程不可用。
- `P1` 表示重要的用户可见缺口或高价值工程问题。
- `P2` 表示体验优化、技术债或非阻塞问题。

## P0

### P0-01 恢复生产构建可用性
- 状态：已完成（2026-06-01）
- 完成说明：生产构建现在在缺少 `.env.production` 时仍会回退到内建 canonical 站点配置，仓库默认状态可直接构建。
- 完成证据：
  - `src/config/process-env.ts`
  - `.env.production.example`
  - `README.md`
  - 本地验证：`npm run build` 成功
- 类型：Bug
- 用户故事：作为站点维护者，我希望在干净环境中执行 `npm run build` 能成功，这样我才能稳定地产出可部署的静态站点。
- 当前问题：生产构建依赖 `SITE_URL` 等环境变量，但仓库当前只有 `.env.development`，没有对应的生产环境配置或兜底方案。
- 验收标准：
  1. 在标准生产构建环境下执行 `npm run build` 成功。
  2. 必需环境变量有明确的提供方式，例如文档、示例文件或安全兜底逻辑。
  3. 构建失败时的报错信息对维护者可理解，不再出现当前这种“仓库默认状态即失败”的情况。
- 仓库证据：
  - `package.json:7`
  - `src/config/process-env.ts:25-44`
  - `astro.config.ts:85`
  - 本地验证：`npm run build` 失败，错误为 `SITE_URL: Required`

### P0-02 修复静态部署输出目录错配
- 状态：已完成（2026-06-01）
- 完成说明：部署脚本已经对齐 Astro 静态产物目录，发布目标从错误的 `build/` 切回 `dist/`。
- 完成证据：
  - `package.json`
  - `README.md`
  - 本地验证：`deploy` 指向 `gh-pages -d dist`
- 类型：Bug
- 用户故事：作为站点维护者，我希望部署脚本发布的是实际构建产物目录，这样发布流程不会因为目录错误而失败。
- 当前问题：部署脚本发布 `build/`，但 Astro 当前产物目录是 `dist/`。
- 验收标准：
  1. `deploy` 脚本引用的目录与真实构建输出一致。
  2. 发布流程文档与脚本保持一致。
  3. 本地能确认构建产物目录存在且部署脚本目标正确。
- 仓库证据：
  - `package.json:12`
  - `astro.config.ts:185`
  - 本地验证：仓库中存在 `dist/`，不存在 `build/`

## P1

### P1-01 让站内搜索真正可用
- 类型：Feature
- 用户故事：作为访问者，我希望导航栏里的搜索框能真正搜索或跳转，而不是只展示一个选择器外壳。
- 当前问题：搜索框已接入导航栏，但当前只维护本地选中状态，没有执行搜索、过滤、跳转或结果页联动。
- 验收标准：
  1. 搜索框至少支持一种真实行为：页面跳转、内容过滤或全文搜索。
  2. 搜索结果与现有文章/项目内容相关联，而不是静态假数据。
  3. 桌面端和移动端的搜索行为一致。
- 仓库证据：
  - `src/components/react/ui/NavigationBar.tsx:110-132`
  - `src/components/react/ui/SearchBox.tsx:40-114`

### P1-02 实现 Blog Explore / Tags / Categories 页面
- 类型：Feature
- 用户故事：作为读者，我希望可以按标签、分类或 Explore 页面浏览内容，这样我能更快找到感兴趣的文章。
- 当前问题：路由常量、metadata 和筛选类型已经准备好，但实际页面路由并不存在。
- 验收标准：
  1. `explore`、`tags`、`categories` 对应页面可访问。
  2. 页面能消费现有文章数据，而不是空壳。
  3. 标签/分类链接能形成完整的导航闭环。
- 仓库证据：
  - `src/constants/routes.ts:5-8`
  - `src/constants/metadata.ts:48-68`
  - `src/types/post.ts:25-70`
  - `src/utils/routing/paths.ts:44-53`
  - `src/pages/` 当前仅有 blog 列表页与详情页，没有上述页面

### P1-03 补齐 Open Graph 与 Feed 能力，或移除失效引用
- 状态：已完成（2026-06-02）
- 完成说明：页面 metadata 已切换到真实存在的静态 Open Graph 资源，并补齐 `feed.json` / `feed.xml` 构建产物与 feed discoverability 链接。
- 完成证据：
  - `src/components/BaseHead.astro`
  - `src/pages/api/feed.json.ts`
  - `src/pages/api/feed.xml.ts`
  - `src/libs/api/open-graph/image-path.ts`
  - `public/images/default/default-open-graph-image.webp`
  - `tests/smoke/seo-contract.test.ts`
  - 本地验证：`npm run lint`、`npm run check-types`、`npm run test:smoke` 成功
- 类型：Bug / Feature
- 用户故事：作为站点分享者或搜索引擎消费者，我希望页面引用的 Open Graph 图片和 Feed 地址真实存在，这样分享预览和订阅能力才是可用的。
- 当前问题：常量中定义了 API 路径，页面元数据也在消费这些地址，但实际没有对应页面路由文件。
- 验收标准：
  1. `/api/open-graph/*`、`/api/feed.json`、`/api/feed.xml` 中被公开引用的能力真实存在，或不再被页面引用。
  2. 项目页和通用页面生成的 metadata 不再指向缺失资源。
  3. Open Graph 相关辅助代码不再保留空文件或永久 `TODO` 占位。
- 仓库证据：
  - `src/constants/routes.ts:22-25`
  - `src/layouts/Page.astro:29-33`
  - `src/pages/[lang]/project/[year]/[slug].astro:78-81`
  - `src/libs/api/open-graph/image-path.ts:19-25`
  - `src/libs/api/open-graph/page.ts` 为空文件
  - `src/pages/` 下没有 `api` 路由

### P1-04 修复语言切换闪烁与 SSG 兼容问题
- 类型：Bug
- 用户故事：作为双语用户，我希望语言切换稳定、无闪烁，并且与静态站点模式兼容。
- 当前问题：README 已明确记录两个已知问题：Paraglide middleware 与 Astro SSG 的兼容性不足，以及从默认语言切到目标语言时发生闪烁。
- 验收标准：
  1. 默认语言与非默认语言之间切换时，不再出现明显闪烁。
  2. 静态构建产物下的语言解析与切换流程稳定。
  3. 缺失翻译时的回退和提示逻辑可预测、可验证。
- 仓库证据：
  - `README.md:11-18`
  - `src/middleware.ts:69-75`
  - `src/components/react/ui/I18nToggleButton.tsx:30-53`
  - `src/utils/routing/navigation.ts:18-29`

### P1-05 恢复 lint 工具链可执行状态
- 状态：已完成（2026-06-02）
- 完成说明：仓库已补齐 `ESLint` flat config，并覆盖 `Astro`、`TS/TSX`、`MDX` 源文件；生成目录 `src/paraglide` 被排除在人工 lint 基线之外。
- 完成证据：
  - `package.json`
  - `eslint.config.mjs`
  - `README.md`
  - 本地验证：`npm run lint`、`npm run check-types`、`npm run test:smoke` 成功
- 类型：Engineering Bug
- 用户故事：作为维护者，我希望 `npm run lint` 能运行，这样我才能在提交前发现基础代码问题。
- 当前问题：脚本已定义，但仓库当前没有可用的 `eslint` 可执行依赖。
- 验收标准：
  1. `npm run lint` 可成功执行。
  2. lint 配置与 Astro/TSX/MDX 文件类型匹配。
  3. 项目文档说明 lint 的使用方式。
- 仓库证据：
  - `package.json:14`
  - 本地验证：`npm run lint` 失败，错误为 `eslint: command not found`

### P1-06 补齐 About / Experience 页面真实内容
- 类型：Feature
- 用户故事：作为访客，我希望 About 和 Experience 页面展示真实内容，而不是空白或占位页。
- 当前问题：About 页面目前仅渲染标题；Experience 页面只渲染空 `List` 布局，没有内容源或卡片数据。
- 验收标准：
  1. About 页面有完整自我介绍或站点说明内容。
  2. Experience 页面有可浏览的经历数据结构与页面展示。
  3. 页面 metadata 与页面正文一致，不再只是占位入口。
- 仓库证据：
  - `src/pages/[lang]/about.astro:25-26`
  - `src/pages/[lang]/experience.astro:17-25`
  - `src/content/config.ts:40-62`

### P1-07 建立统一测试 SDK 与命令入口
- 状态：已完成（2026-06-01）
- 完成说明：仓库已统一到 `Vitest + Playwright`，并补齐 `test`、`test:smoke`、`test:e2e` 入口、配置和测试目录约定。
- 完成证据：
  - `package.json`
  - `vitest.config.ts`
  - `playwright.config.ts`
  - `docs/TESTING.md`
  - 本地验证：`npm run test` 成功
- 类型：Engineering Feature
- 用户故事：作为维护者，我希望项目有统一的测试 SDK、测试目录约定和命令入口，这样后续修 bug 与做功能时都能把验证沉淀为可重复执行的自动化测试。
- 当前问题：仓库当前只有 `build`、`lint`、`check-types` 等工程命令，没有系统化测试依赖、测试脚本或目录规范。
- 验收标准：
  1. 引入并确定一套系统测试基础设施，例如 `Vitest`、`Playwright` 或等价组合，并在仓库内形成统一约定。
  2. `package.json` 中存在清晰的测试入口，例如 `test`、`test:unit`、`test:smoke`、`test:e2e`。
  3. 测试配置、目录结构、运行方式有文档说明，团队成员可以在本地直接执行。
  4. 至少有一条真实可跑通的测试链路，证明 SDK 不是空壳。
- 仓库证据：
  - `package.json` 当前没有任何 `test*` 脚本
  - 当前依赖列表中没有现成的系统化测试运行器配置

### P1-08 为 P0 构建与部署契约补齐 smoke test / spec
- 状态：已完成（2026-06-01）
- 完成说明：`P0` 的环境变量回退、部署目录和 sitemap 域名契约已经写入 smoke spec，并纳入统一测试入口。
- 完成证据：
  - `tests/smoke/build-contract.test.ts`
  - `tests/scripts/build-default-production.mjs`
  - `docs/TESTING.md`
  - 本地验证：`npm run test:smoke` 成功
- 类型：Engineering Feature
- 用户故事：作为维护者，我希望 `P0` 的构建和部署规则被写成 spec 并自动验证，这样以后改环境配置、部署脚本或站点域名时不会静默回归。
- 当前问题：虽然 `P0` 已修复，但当前仍主要依赖人工验证，没有自动化回归保障。
- 验收标准：
  1. 将 `P0` 契约写成明确 spec，例如环境回退规则、默认 `SITE_URL`、部署目录、sitemap 域名。
  2. 至少有一组 smoke test 能自动验证以下行为：
     - 没有 `.env.production` 时 `npm run build` 仍成功
     - 生产构建使用 canonical 域名
     - 部署目录是 `dist`
  3. 这些测试被纳入统一测试命令，而不是孤立脚本。
  4. 测试失败时能给出定位信息，帮助快速判断是 env、build 还是 deploy 契约被改坏。
- 仓库证据：
  - `src/config/process-env.ts`
  - `package.json`
  - `dist/sitemap-index.xml`
  - `dist/sitemap-0.xml`

## P2

### P2-01 优化字体加载中的 fallback 抖动
- 类型：UX Bug
- 用户故事：作为访客，我希望首次加载和路由切换时字体过渡稳定，不出现明显的多次 fallback 跳变。
- 当前问题：README 记录字体会在首次加载和路由切换时切换 fallback 三次，当前头部仍在并行组合本地字体、Google Fonts 和工具类层。
- 验收标准：
  1. 首屏加载与页面切换时的字体抖动明显减少。
  2. 中文、英文和代码字体的加载顺序可解释、可验证。
  3. 字体优化不会引入新的可访问性或 CLS 问题。
- 仓库证据：
  - `README.md:20-22`
  - `src/components/BaseHead.astro:177-184`
  - `src/components/fonts/FontLoader.astro:9-63`
  - `src/components/fonts/GoogleFontsLoader.astro:9-18`

### P2-02 修复自定义 ScrollArea 滚动条
- 类型：Bug
- 用户故事：作为用户，我希望自定义滚动区域的滚动条样式和交互稳定可用。
- 当前问题：组件内直接标记了 `TODO: FIX SCROLL BAR`。
- 验收标准：
  1. 垂直和水平滚动条样式正常显示。
  2. 滚动交互在亮暗主题下都可用。
  3. 该组件至少有一个明确的使用场景或演示页验证。
- 仓库证据：
  - `src/components/react/radix-ui/ScrollArea.tsx:8`

### P2-03 排查 GSAP / View Transition 的内存泄漏问题
- 类型：Tech Debt / Bug
- 用户故事：作为维护者，我希望页面转场与动画能力可以安全启用，而不是因为内存泄漏长期被关闭。
- 当前问题：`ClientRouter` 被明确注释为会导致 GSAP 相关内存泄漏，基础布局里也保留了 `LITTLE MEMORY LEAK` 注释。
- 验收标准：
  1. 明确定位泄漏来源，给出可复现方式。
  2. 视图切换要么被安全恢复，要么保留禁用但有清晰技术结论。
  3. 相关清理逻辑与组件生命周期一致。
- 仓库证据：
  - `src/components/BaseHead.astro:173-175`
  - `src/layouts/Base.astro:39`
  - `src/utils/animation/cleanup.ts`

### P2-04 清理未完成的内容平台与 CMS 技术债
- 类型：Tech Debt
- 用户故事：作为维护者，我希望仓库里未完成的内容平台方向是清晰的，这样后续不会在多个半成品方案之间来回切换。
- 当前问题：仓库同时存在未完成的 CMS 方向、空的 open-graph 页面文件、以及内容加载层的待迁移注释。
- 验收标准：
  1. 明确当前内容来源方案：纯内容仓、GitHub Pages 静态方案，或外部 CMS。
  2. 删除不再使用的占位代码，或补齐真正要保留的实现。
  3. 内容层文档与代码结构一致。
- 仓库证据：
  - `src/constants/image.ts:186`
  - `src/libs/api/cms/strapi.ts:1-45`
  - `src/libs/api/open-graph/page.ts`
  - `src/content/config.ts:10`

### P2-05 将测试接入 CI / 发布前门禁
- 类型：Engineering Feature
- 用户故事：作为维护者，我希望统一测试命令能接入 CI 或发布前门禁，这样回归不会只在本地被发现。
- 当前问题：即使后续补了测试 SDK，如果没有门禁，测试仍可能长期不执行。
- 验收标准：
  1. 在 CI 或等价自动化流程中执行 `check-types`、`build` 和核心测试命令。
  2. 为不同测试层级定义合理门禁，例如 PR 级 smoke / unit，发布前 e2e。
  3. 失败日志能在 CI 中直接定位到测试层级和失败原因。
- 仓库证据：
  - 当前仓库只有 `.github` 目录，尚未在 backlog 中定义测试门禁 story
  - `package.json` 目前缺少统一测试命令

## 建议执行顺序

1. 先处理 `P0-01` 和 `P0-02`，恢复“能构建、能发布”的基本盘。
2. 接着处理 `P1-07` 和 `P1-08`，先把测试 SDK 和 `P0` 回归保障立起来。
3. 再处理 `P1-05`，把 lint 工具链恢复，统一到工程验证入口里。
4. 然后优先做 `P1-03`、`P1-04`、`P1-01`、`P1-02`，把主要用户路径补齐。
5. 最后处理 `P1-06` 与全部 `P2`，补内容、接 CI，并清技术债。
