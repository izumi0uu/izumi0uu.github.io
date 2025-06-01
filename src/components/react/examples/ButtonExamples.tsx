import { Button } from "@/components/react/radix-ui/Button";

/**
 * 按钮示例组件 - 展示所有语义化变体
 *
 * 基于项目的语义化变量系统，Tailwind v4 自动生成对应的工具类
 * 所有颜色都会根据当前主题（默认、酒红）和模式（亮色、暗色）自动适配
 */
export function ButtonExamples() {
  return (
    <div className="bg-base text-on-background space-y-8 p-6">
      <div>
        <h2 className="text-headings mb-4 text-xl font-semibold">🎨 基础按钮变体</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="link">链接按钮</Button>
        </div>
      </div>

      <div>
        <h2 className="text-headings mb-4 text-xl font-semibold">⚡ 功能状态按钮</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="success">成功操作</Button>
          <Button variant="destructive">危险操作 (Error)</Button>
          <Button variant="warning">警告操作</Button>
          <Button variant="info">信息提示</Button>
        </div>
      </div>

      <div>
        <h2 className="text-headings mb-4 text-xl font-semibold">📦 容器变体 (柔和色彩)</h2>
        <p className="text-content-secondary mb-3 text-sm">
          容器变体使用对应的 <code>*-container</code>{" "}
          语义色，提供更柔和的背景，通常用于次级强调或信息区域内的按钮。
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary-container">主色容器</Button>
          <Button variant="secondary-container">次色容器</Button>
          <Button variant="success-container">成功容器</Button>
          <Button variant="error-container">错误容器</Button>
          <Button variant="warning-container">警告容器</Button>
          <Button variant="info-container">信息容器</Button>
        </div>
      </div>

      <div>
        <h2 className="text-headings mb-4 text-xl font-semibold">🎯 Brutal 风格按钮 (实验性)</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="brutal">Brutal 主色</Button>
          <Button variant="brutal-normal">Brutal 普通 (基于Surface)</Button>
        </div>
      </div>

      <div>
        <h2 className="text-headings mb-4 text-xl font-semibold">📏 尺寸变体 (以主色容器为例)</h2>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="sm" variant="primary-container">
            小按钮
          </Button>
          <Button size="default" variant="primary-container">
            默认按钮
          </Button>
          <Button size="lg" variant="primary-container">
            大按钮
          </Button>
          <Button size="icon" variant="primary-container">
            <span role="img" aria-label="icon">
              🔥
            </span>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-headings mb-4 text-xl font-semibold">🔄 组合与语义化用法示例</h2>
        <div className="space-y-6">
          {/* 表单提交组合 */}
          <div className="border-outline rounded-lg border p-4">
            <h3 className="text-content mb-3 font-medium">表单操作</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">保存更改</Button>
              <Button variant="secondary">取消</Button>
              <Button variant="destructive" className="ml-auto">
                删除记录
              </Button>
            </div>
          </div>

          {/* 状态提示组合 */}
          <div className="border-outline rounded-lg border p-4">
            <h3 className="text-content mb-3 font-medium">通知与提示</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="success-container">✅ 任务已完成</Button>
              <Button variant="warning-container">⚠️ 注意：低库存</Button>
              <Button variant="info-container">ℹ️ 查看版本更新</Button>
              <Button variant="error-container" className="ml-auto">
                ❌ 连接超时
              </Button>
            </div>
          </div>

          {/* 导航操作组合 */}
          <div className="border-outline rounded-lg border p-4">
            <h3 className="text-content mb-3 font-medium">导航与探索</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="link">了解更多详情</Button>
              <Button variant="ghost">查看个人资料</Button>
              <Button variant="outline">分享给朋友</Button>
            </div>
          </div>
        </div>
      </div>

      {/* 主题提示说明 */}
      <div className="bg-surface-container text-on-surface mt-10 rounded-lg p-6">
        <h3 className="text-on-surface mb-3 text-lg font-semibold">🌈 主题与模式自动适配</h3>
        <p className="text-content-secondary text-sm leading-relaxed">
          所有上面展示的按钮都会根据您项目当前设置的主题（例如"默认蓝"、"酒红"）和色彩模式（亮色/暗色）自动调整其颜色。
          这是因为按钮的颜色直接来源于您在 <code>semantic.css</code> 中定义的 CSS
          语义化变量，而这些变量本身就包含了主题切换的逻辑。
          <br />
          <br />
          切换主题或明暗模式后，无需修改任何按钮代码，它们的视觉表现会自动匹配新的主题设定，确保了整个应用视觉风格的统一性和灵活性。
        </p>
        <div className="theme-indicator text-on-surface-variant mt-4 text-xs">
          当前主题指示 (需要您在页面某处定义 .theme-indicator::after)
        </div>
      </div>
    </div>
  );
}
