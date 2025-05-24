import React, { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { StagewiseToolbar } from "@stagewise/toolbar-react";
import * as themeConstants from "@/constants/theme";

// Stagewise 工具栏的基本配置
const stagewiseConfig = {
  plugins: [],
};

// 提取常量以便使用
const { MODES, THEMES, THEME_CONFIG, DEFAULT_THEMES, WINE_THEMES } = themeConstants;
const { CHANGE_EVENT, DATA_ATTRIBUTE, LOCAL_STORAGE_KEY } = THEME_CONFIG;

// 主题名称映射表，用于显示更友好的名称
const THEME_NAME_MAP: Record<string, string> = {
  "default-light": "默认亮色",
  "default-dark": "默认暗色",
  "wine-light": "酒红亮色",
  "wine-dark": "酒红暗色",
};

// 主题组件，用于在开发工具栏中显示和切换主题
const ThemeControls: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<{ name: string; mode: string } | null>(null);

  // 初始化和监听主题变化
  useEffect(() => {
    // 获取当前主题
    const getCurrentTheme = () => {
      const isDark = document.documentElement.classList.contains(MODES.dark);
      const themeName = document.documentElement.getAttribute(DATA_ATTRIBUTE) || "default";

      // 查找匹配的主题对象
      const theme = THEMES.find(
        (t) => t.name.startsWith(themeName) && t.mode === (isDark ? MODES.dark : MODES.light)
      );

      return (
        theme || {
          name: themeName,
          mode: isDark ? MODES.dark : MODES.light,
        }
      );
    };

    // 设置初始状态
    setCurrentTheme(getCurrentTheme());

    // 创建一个观察器来监听 HTML 根元素的属性变化
    const observer = new MutationObserver(() => {
      setCurrentTheme(getCurrentTheme());
    });

    // 开始观察 data-theme 和 class 属性的变化
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [DATA_ATTRIBUTE, "class"],
    });

    return () => observer.disconnect();
  }, []);

  // 切换到特定主题
  const changeTheme = (theme: (typeof THEMES)[number]) => {
    // 创建并分发主题变更事件
    const event = new CustomEvent(CHANGE_EVENT, {
      detail: { theme },
    });
    document.dispatchEvent(event);
  };

  // 切换主题
  const switchTheme = (themeName: "default" | "wine") => {
    const isDark = currentTheme?.mode === MODES.dark;
    const targetTheme =
      themeName === "default"
        ? isDark
          ? DEFAULT_THEMES.dark
          : DEFAULT_THEMES.light
        : isDark
          ? WINE_THEMES.dark
          : WINE_THEMES.light;

    changeTheme(targetTheme);
  };

  // 切换模式（亮/暗）
  const toggleMode = () => {
    const isDark = currentTheme?.mode === MODES.dark;
    const themeName = currentTheme?.name || "";

    // 确定当前是哪个主题系列
    const isWineTheme = themeName.startsWith("wine");

    // 根据当前主题系列和目标模式选择正确的主题
    const targetTheme = isWineTheme
      ? isDark
        ? WINE_THEMES.light
        : WINE_THEMES.dark
      : isDark
        ? DEFAULT_THEMES.light
        : DEFAULT_THEMES.dark;

    changeTheme(targetTheme);
  };

  if (!currentTheme) return null;

  // 获取友好的主题名称
  const friendlyThemeName = THEME_NAME_MAP[currentTheme.name] || currentTheme.name;

  return (
    <div className="bg-surface border-outline flex flex-col gap-3 rounded-md border p-3 shadow-md">
      <div className="text-headings mb-1 text-sm font-medium">
        当前主题: <span className="font-bold">{friendlyThemeName}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => switchTheme("default")}
          className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
            currentTheme.name.startsWith("default")
              ? "bg-primary text-on-primary"
              : "bg-surface-container text-content hover:bg-surface-container-high"
          }`}
        >
          默认主题
        </button>
        <button
          onClick={() => switchTheme("wine")}
          className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
            currentTheme.name.startsWith("wine")
              ? "bg-primary text-on-primary"
              : "bg-surface-container text-content hover:bg-surface-container-high"
          }`}
        >
          酒红主题
        </button>
        <button
          onClick={toggleMode}
          className="bg-secondary text-on-secondary col-span-2 rounded-md px-3 py-1.5 text-xs transition-opacity hover:opacity-90"
        >
          {currentTheme.mode === MODES.dark ? "切换到亮色模式" : "切换到暗色模式"}
        </button>
      </div>
    </div>
  );
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
          <div
            style={{
              position: "fixed",
              bottom: "80px",
              right: "20px",
              zIndex: "99999",
              width: "220px",
              transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
            }}
          >
            <ThemeControls />
          </div>
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
        toolbarRootDivRef.current.parentNode.removeChild(toolbarRootDivRef.current);
        toolbarRootDivRef.current = null;
      }
    };
  }, []); // 空依赖数组确保此 effect 仅在组件挂载和卸载时运行一次

  // 此组件本身不渲染任何可见的 UI，它通过副作用管理工具栏
  return null;
};

export default StagewiseDevToolbar;
