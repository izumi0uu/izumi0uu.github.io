import React, { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { StagewiseToolbar } from "@stagewise/toolbar-react";

// Stagewise 工具栏的基本配置
const stagewiseConfig = {
  plugins: [],
};

const StagewiseDevToolbar: React.FC = () => {
  const toolbarRootDivRef = useRef<HTMLDivElement | null>(null);
  const reactRootRef = useRef<Root | null>(null);

  useEffect(() => {
    // 仅在开发模式下运行
    if (import.meta.env.MODE === "development") {
      if (!toolbarRootDivRef.current) {
        // 1. 创建一个专用的 div 用于挂载工具栏
        const div = document.createElement("div");
        div.id = "stagewise-toolbar-root";
        // 确保该 div 不会影响页面布局，可以根据需要调整样式
        div.style.position = "fixed";
        div.style.zIndex = "99999"; //确保在顶层
        document.body.appendChild(div);
        toolbarRootDivRef.current = div;

        // 2. 在此专用 div 中创建一个新的 React 根
        reactRootRef.current = createRoot(div);
      }

      // 3. 渲染 StagewiseToolbar 组件
      // 使用 React.StrictMode 来帮助发现潜在问题
      reactRootRef.current?.render(
        <React.StrictMode>
          <StagewiseToolbar config={stagewiseConfig} />
        </React.StrictMode>
      );
    }

    // 清理函数：当组件卸载时（例如，如果开发模式切换或页面完全替换）
    return () => {
      if (reactRootRef.current) {
        reactRootRef.current.unmount(); // 卸载 React 组件树
        reactRootRef.current = null;
      }
      if (toolbarRootDivRef.current && toolbarRootDivRef.current.parentNode) {
        // 从 DOM 中移除之前创建的 div
        toolbarRootDivRef.current.parentNode.removeChild(
          toolbarRootDivRef.current
        );
        toolbarRootDivRef.current = null;
      }
    };
  }, []); // 空依赖数组确保此 effect 仅在组件挂载和卸载时运行一次

  // 此组件本身不渲染任何可见的 UI，它通过副作用管理工具栏
  return null;
};

export default StagewiseDevToolbar;
