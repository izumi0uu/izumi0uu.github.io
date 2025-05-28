"use client"

import * as React from "react"
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  User,
  Settings,
  Search,
  Heart,
  Star,
  MessageCircle,
  Share,
  Edit,
  Trash2,
  Plus,
  X,
} from "lucide-react"

import { cn } from "@/utils/ui/styles"

/**
 * 语义化颜色系统使用示例组件
 *
 * 本组件展示了如何在各种常见开发场景中使用语义化颜色系统
 * 涵盖了文本、背景、边框、状态指示、交互元素等多种用法
 */
const SemanticColorExamples = () => {
  const [selectedTab, setSelectedTab] = React.useState("basics")

  return (
    <div className="bg-background text-on-background min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* 页面标题 */}
        <header className="space-y-4 text-center">
          <h1 className="text-headings text-4xl font-bold">语义化颜色系统使用指南</h1>
          <p className="text-content-secondary mx-auto max-w-2xl text-lg">
            本页面展示了项目中语义化颜色系统在各种开发场景中的实际应用，
            帮助开发者理解和正确使用这些颜色变量。
          </p>
        </header>

        {/* 导航标签 */}
        <nav className="flex flex-wrap justify-center gap-2">
          {[
            { id: "basics", label: "基础用法" },
            { id: "states", label: "状态系统" },
            { id: "components", label: "组件示例" },
            { id: "layouts", label: "布局层次" },
            { id: "interactions", label: "交互元素" },
            { id: "themes", label: "主题适配" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                "rounded-lg border-2 px-4 py-2 transition-all",
                selectedTab === tab.id
                  ? "bg-primary-container text-on-primary-container border-primary"
                  : "bg-surface-container text-content border-outline hover:bg-surface-container-high"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 内容区域 */}
        <main className="space-y-12">
          {/* 基础用法 */}
          {selectedTab === "basics" && (
            <section className="space-y-8">
              <h2 className="text-headings border-outline border-b-2 pb-2 text-2xl font-bold">
                基础颜色用法
              </h2>

              {/* 文本颜色示例 */}
              <div className="bg-surface border-outline rounded-lg border p-6">
                <h3 className="text-headings mb-4 text-xl font-semibold">文本颜色层次</h3>
                <div className="space-y-3">
                  <p className="text-headings text-lg font-medium">
                    标题文本 - 使用 text-headings，最高对比度
                  </p>
                  <p className="text-content">正文内容 - 使用 text-content，标准阅读对比度</p>
                  <p className="text-content-secondary">
                    次要信息 - 使用 text-content-secondary，降低视觉权重
                  </p>
                  <p className="text-captions text-sm">
                    说明文字 - 使用 text-captions，用于图片说明、版权信息等
                  </p>
                  <div className="flex gap-4 text-sm">
                    <a href="#" className="text-link hover:text-link-hover transition-colors">
                      普通链接
                    </a>
                    <a href="#" className="text-link-visited">
                      已访问链接
                    </a>
                  </div>
                </div>
              </div>

              {/* 背景层次示例 */}
              <div className="space-y-4">
                <h3 className="text-headings text-xl font-semibold">背景层次系统</h3>
                <div className="bg-background border-outline rounded-lg border p-4">
                  <p className="text-content mb-4">最底层背景 - bg-background</p>
                  <div className="bg-surface rounded-lg p-4">
                    <p className="text-on-surface mb-4">表面层 - bg-surface</p>
                    <div className="bg-surface-variant rounded-lg p-4">
                      <p className="text-on-surface-variant mb-4">表面变体 - bg-surface-variant</p>
                      <div className="bg-surface-container rounded-lg p-4">
                        <p className="text-content mb-4">容器层 - bg-surface-container</p>
                        <div className="bg-surface-container-high rounded-lg p-4">
                          <p className="text-content">高级容器 - bg-surface-container-high</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 状态系统 */}
          {selectedTab === "states" && (
            <section className="space-y-8">
              <h2 className="text-headings border-outline border-b-2 pb-2 text-2xl font-bold">
                状态指示系统
              </h2>

              {/* 功能状态色 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* 成功状态 */}
                <div className="bg-success-container border-success rounded-lg border p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <CheckCircle className="text-success" size={24} />
                    <h3 className="text-on-success-container font-semibold">成功状态</h3>
                  </div>
                  <p className="text-on-success-container mb-4">
                    操作已成功完成！数据已保存到服务器。
                  </p>
                  <button className="bg-success text-on-success rounded px-4 py-2 transition-opacity hover:opacity-90">
                    确认
                  </button>
                </div>

                {/* 错误状态 */}
                <div className="bg-error-container border-error rounded-lg border p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <AlertCircle className="text-error" size={24} />
                    <h3 className="text-on-error-container font-semibold">错误状态</h3>
                  </div>
                  <p className="text-on-error-container mb-4">操作失败，请检查网络连接后重试。</p>
                  <button className="bg-error text-on-error rounded px-4 py-2 transition-opacity hover:opacity-90">
                    重试
                  </button>
                </div>

                {/* 警告状态 */}
                <div className="bg-warning-container border-warning rounded-lg border p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <AlertTriangle className="text-warning" size={24} />
                    <h3 className="text-on-warning-container font-semibold">警告状态</h3>
                  </div>
                  <p className="text-on-warning-container mb-4">此操作不可撤销，请谨慎操作。</p>
                  <button className="bg-warning text-on-warning rounded px-4 py-2 transition-opacity hover:opacity-90">
                    继续
                  </button>
                </div>

                {/* 信息状态 */}
                <div className="bg-info-container border-info rounded-lg border p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <Info className="text-info" size={24} />
                    <h3 className="text-on-info-container font-semibold">信息提示</h3>
                  </div>
                  <p className="text-on-info-container mb-4">系统将在 5 分钟后进行维护更新。</p>
                  <button className="bg-info text-on-info rounded px-4 py-2 transition-opacity hover:opacity-90">
                    了解详情
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* 组件示例 */}
          {selectedTab === "components" && (
            <section className="space-y-8">
              <h2 className="text-headings border-outline border-b-2 pb-2 text-2xl font-bold">
                常见组件示例
              </h2>

              {/* 卡片组件 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* 用户卡片 */}
                <div className="bg-surface border-outline hover:bg-surface-container overflow-hidden rounded-lg border transition-colors">
                  <div className="bg-primary-container p-4">
                    <User className="text-on-primary-container mx-auto" size={48} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-headings mb-2 font-semibold">张三</h3>
                    <p className="text-content-secondary mb-3 text-sm">前端开发工程师</p>
                    <div className="flex gap-2">
                      <button className="bg-primary text-on-primary rounded px-3 py-1 text-sm hover:opacity-90">
                        关注
                      </button>
                      <button className="bg-surface-container text-content hover:bg-surface-container-high rounded px-3 py-1 text-sm">
                        消息
                      </button>
                    </div>
                  </div>
                </div>

                {/* 文章卡片 */}
                <div className="bg-surface border-outline hover:border-primary overflow-hidden rounded-lg border transition-colors">
                  <div className="p-4">
                    <h3 className="text-headings mb-2 line-clamp-2 font-semibold">
                      React 18 新特性详解
                    </h3>
                    <p className="text-content mb-3 line-clamp-3 text-sm">
                      本文详细介绍了 React 18 中的并发特性、自动批处理、Suspense 改进等重要更新...
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-content-secondary">2024-01-15</span>
                      <div className="text-content-secondary flex gap-3">
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          42
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={14} />8
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 设置卡片 */}
                <div className="bg-surface border-outline rounded-lg border p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <Settings className="text-primary" size={24} />
                    <h3 className="text-headings font-semibold">系统设置</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-content">暗色模式</span>
                      <div className="bg-primary relative h-6 w-12 rounded-full">
                        <div className="bg-on-primary absolute top-0.5 right-0.5 h-5 w-5 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-content">推送通知</span>
                      <div className="bg-outline relative h-6 w-12 rounded-full">
                        <div className="bg-surface absolute top-0.5 left-0.5 h-5 w-5 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 表单示例 */}
              <div className="bg-surface border-outline rounded-lg border p-6">
                <h3 className="text-headings mb-4 text-xl font-semibold">表单组件</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-content mb-2 block font-medium">用户名</label>
                    <input
                      type="text"
                      className="bg-surface-variant border-outline text-content placeholder:text-content-secondary focus:border-primary focus:ring-primary/20 w-full rounded-lg border p-3 transition-colors outline-none focus:ring-2"
                      placeholder="请输入用户名"
                    />
                  </div>
                  <div>
                    <label className="text-content mb-2 block font-medium">邮箱</label>
                    <input
                      type="email"
                      className="bg-surface-variant border-outline text-content placeholder:text-content-secondary focus:border-primary focus:ring-primary/20 w-full rounded-lg border p-3 transition-colors outline-none focus:ring-2"
                      placeholder="请输入邮箱地址"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-primary text-on-primary rounded-lg px-6 py-2 transition-opacity hover:opacity-90"
                    >
                      提交
                    </button>
                    <button
                      type="button"
                      className="bg-surface-container text-content border-outline hover:bg-surface-container-high rounded-lg border px-6 py-2 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* 布局层次 */}
          {selectedTab === "layouts" && (
            <section className="space-y-8">
              <h2 className="text-headings border-outline border-b-2 pb-2 text-2xl font-bold">
                布局层次示例
              </h2>

              {/* 页面布局示例 */}
              <div className="bg-background border-outline overflow-hidden rounded-lg border">
                {/* 顶部导航 */}
                <header className="bg-surface border-outline border-b p-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-headings text-xl font-bold">网站标题</h1>
                    <nav className="flex gap-4">
                      <a href="#" className="text-content hover:text-primary transition-colors">
                        首页
                      </a>
                      <a href="#" className="text-content hover:text-primary transition-colors">
                        关于
                      </a>
                      <a href="#" className="text-content hover:text-primary transition-colors">
                        联系
                      </a>
                    </nav>
                  </div>
                </header>

                {/* 主要内容区 */}
                <div className="flex">
                  {/* 侧边栏 */}
                  <aside className="bg-surface-variant border-outline w-64 border-r p-4">
                    <h2 className="text-headings mb-4 font-semibold">分类</h2>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-content hover:bg-surface-container block rounded p-2 transition-colors"
                        >
                          技术文章
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-content hover:bg-surface-container block rounded p-2 transition-colors"
                        >
                          生活随笔
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-content hover:bg-surface-container block rounded p-2 transition-colors"
                        >
                          项目展示
                        </a>
                      </li>
                    </ul>
                  </aside>

                  {/* 主内容 */}
                  <main className="flex-1 p-6">
                    <article className="bg-surface border-outline rounded-lg border p-6">
                      <h1 className="text-headings mb-4 text-2xl font-bold">文章标题</h1>
                      <div className="text-content-secondary mb-4 text-sm">
                        发布于 2024-01-15 | 作者：张三
                      </div>
                      <div className="text-content space-y-4">
                        <p>这是文章的第一段内容，使用标准的内容文本颜色...</p>
                        <p>这是文章的第二段内容，保持良好的阅读体验...</p>
                      </div>
                      <footer className="border-outline-variant mt-6 border-t pt-4">
                        <div className="text-content-secondary flex gap-4">
                          <button className="hover:text-primary flex items-center gap-2 transition-colors">
                            <Heart size={16} />
                            点赞
                          </button>
                          <button className="hover:text-primary flex items-center gap-2 transition-colors">
                            <Share size={16} />
                            分享
                          </button>
                        </div>
                      </footer>
                    </article>
                  </main>
                </div>

                {/* 底部 */}
                <footer className="bg-surface-variant border-outline border-t p-4 text-center">
                  <p className="text-captions">© 2024 网站名称. 保留所有权利.</p>
                </footer>
              </div>
            </section>
          )}

          {/* 交互元素 */}
          {selectedTab === "interactions" && (
            <section className="space-y-8">
              <h2 className="text-headings border-outline border-b-2 pb-2 text-2xl font-bold">
                交互元素示例
              </h2>

              {/* 按钮组 */}
              <div className="space-y-6">
                <h3 className="text-headings text-xl font-semibold">按钮样式</h3>
                <div className="flex flex-wrap gap-4">
                  {/* 主要按钮 */}
                  <button className="bg-primary text-on-primary rounded-lg px-6 py-3 transition-opacity hover:opacity-90">
                    主要操作
                  </button>

                  {/* 次要按钮 */}
                  <button className="bg-secondary text-on-secondary rounded-lg px-6 py-3 transition-opacity hover:opacity-90">
                    次要操作
                  </button>

                  {/* 轮廓按钮 */}
                  <button className="text-primary border-primary hover:bg-primary hover:text-on-primary rounded-lg border-2 bg-transparent px-6 py-3 transition-colors">
                    轮廓按钮
                  </button>

                  {/* 文本按钮 */}
                  <button className="text-primary hover:bg-primary-container hover:text-on-primary-container rounded-lg bg-transparent px-6 py-3 transition-colors">
                    文本按钮
                  </button>

                  {/* 危险按钮 */}
                  <button className="bg-error text-on-error rounded-lg px-6 py-3 transition-opacity hover:opacity-90">
                    删除
                  </button>
                </div>
              </div>

              {/* 输入框状态 */}
              <div className="space-y-6">
                <h3 className="text-headings text-xl font-semibold">输入框状态</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* 正常状态 */}
                  <div>
                    <label className="text-content mb-2 block font-medium">正常状态</label>
                    <input
                      type="text"
                      className="bg-surface-variant border-outline text-content focus:border-primary focus:ring-primary/20 w-full rounded-lg border p-3 transition-colors outline-none focus:ring-2"
                      placeholder="请输入内容"
                    />
                  </div>

                  {/* 错误状态 */}
                  <div>
                    <label className="text-content mb-2 block font-medium">错误状态</label>
                    <input
                      type="text"
                      className="bg-surface-variant border-error text-content focus:border-error focus:ring-error/20 w-full rounded-lg border p-3 transition-colors outline-none focus:ring-2"
                      placeholder="请输入内容"
                    />
                    <p className="text-error mt-1 text-sm">请输入有效的邮箱地址</p>
                  </div>

                  {/* 成功状态 */}
                  <div>
                    <label className="text-content mb-2 block font-medium">成功状态</label>
                    <input
                      type="text"
                      className="bg-surface-variant border-success text-content focus:border-success focus:ring-success/20 w-full rounded-lg border p-3 transition-colors outline-none focus:ring-2"
                      value="valid@example.com"
                      readOnly
                    />
                    <p className="text-success mt-1 text-sm">邮箱格式正确</p>
                  </div>

                  {/* 禁用状态 */}
                  <div>
                    <label className="text-content-secondary mb-2 block font-medium">
                      禁用状态
                    </label>
                    <input
                      type="text"
                      className="bg-surface border-outline-variant text-content-secondary w-full cursor-not-allowed rounded-lg border p-3"
                      placeholder="不可编辑"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* 操作菜单 */}
              <div className="space-y-6">
                <h3 className="text-headings text-xl font-semibold">操作菜单</h3>
                <div className="bg-surface border-outline w-64 rounded-lg border p-4">
                  <div className="space-y-1">
                    <button className="text-content hover:bg-surface-container flex w-full items-center gap-3 rounded-lg p-3 transition-colors">
                      <Edit size={16} />
                      编辑
                    </button>
                    <button className="text-content hover:bg-surface-container flex w-full items-center gap-3 rounded-lg p-3 transition-colors">
                      <Star size={16} />
                      收藏
                    </button>
                    <button className="text-content hover:bg-surface-container flex w-full items-center gap-3 rounded-lg p-3 transition-colors">
                      <Share size={16} />
                      分享
                    </button>
                    <hr className="border-outline-variant my-2" />
                    <button className="text-error hover:bg-error-container hover:text-on-error-container flex w-full items-center gap-3 rounded-lg p-3 transition-colors">
                      <Trash2 size={16} />
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 主题适配 */}
          {selectedTab === "themes" && (
            <section className="space-y-8">
              <h2 className="text-headings border-outline border-b-2 pb-2 text-2xl font-bold">
                主题适配说明
              </h2>

              <div className="bg-surface border-outline rounded-lg border p-6">
                <h3 className="text-headings mb-4 text-xl font-semibold">自动主题适配</h3>
                <div className="text-content space-y-4">
                  <p>本页面中的所有颜色都使用了语义化的颜色变量，这意味着：</p>
                  <ul className="text-content-secondary list-inside list-disc space-y-2">
                    <li>当切换到暗色模式时，所有颜色会自动适配</li>
                    <li>当切换到酒红主题时，主色调会自动更换</li>
                    <li>对比度和可读性在所有主题下都得到保证</li>
                    <li>开发者无需为不同主题编写额外的样式代码</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-primary-container border-primary rounded-lg border p-6">
                  <h4 className="text-on-primary-container mb-3 font-semibold">主色调容器</h4>
                  <p className="text-on-primary-container">
                    这个容器使用主色调的容器背景色，文字使用对应的前景色，
                    确保在任何主题下都有良好的对比度。
                  </p>
                </div>

                <div className="bg-secondary-container border-secondary rounded-lg border p-6">
                  <h4 className="text-on-secondary-container mb-3 font-semibold">次要色容器</h4>
                  <p className="text-on-secondary-container">
                    次要色容器提供了另一种视觉层次，适合用于不那么重要但仍需要 突出显示的内容。
                  </p>
                </div>
              </div>

              <div className="bg-surface-variant border-outline-variant rounded-lg border p-6">
                <h4 className="text-headings mb-3 font-semibold">最佳实践建议</h4>
                <div className="text-content space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-success mt-0.5" size={16} />
                    <span>使用语义化的颜色名称而不是具体的颜色值</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-success mt-0.5" size={16} />
                    <span>为不同的内容层次选择合适的颜色变量</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-success mt-0.5" size={16} />
                    <span>在设计组件时考虑所有主题下的显示效果</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-success mt-0.5" size={16} />
                    <span>使用对应的前景色确保文字可读性</span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* 页脚 */}
        <footer className="border-outline-variant border-t pt-8 text-center">
          <p className="text-captions">
            这个示例页面展示了语义化颜色系统的各种使用场景，
            帮助开发者更好地理解和应用项目的设计系统。
          </p>
        </footer>
      </div>
    </div>
  )
}

export { SemanticColorExamples }
