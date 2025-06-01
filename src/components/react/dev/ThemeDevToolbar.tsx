import React, { useEffect, useState } from "react";
import * as themeConstants from "@/constants/theme";

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

// 主题控制组件的属性接口
export interface ThemeControlsProps {
  className?: string;
  showTitle?: boolean;
  compact?: boolean;
}

// 主题控制组件
const ThemeDevToolbar: React.FC<ThemeControlsProps> = ({
  className = "",
  showTitle = true,
  compact = false,
}) => {
  const [currentTheme, setCurrentTheme] = useState<{ name: string; mode: string } | null>(null);

  // 初始化和监听主题变化
  useEffect(() => {
    // 获取当前主题
    const getCurrentTheme = () => {
      const isDark = document.documentElement.classList.contains(MODES.dark);
      const themeName = document.documentElement.getAttribute(DATA_ATTRIBUTE) || "default";

      // 查找匹配的主题对象 - 使用精确匹配
      const theme = THEMES.find(
        (t) =>
          t.name === themeName ||
          (themeName === "default" && t.name === (isDark ? "default-dark" : "default-light"))
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
      <div
        className={`bg-surface border-outline flex flex-col gap-3 rounded-md border p-3 shadow-md ${className}`}
      >
        {showTitle && (
          <div className="text-headings mb-1 text-sm font-medium">
            当前主题: <span className="font-bold">{friendlyThemeName}</span>
          </div>
        )}

        <div className={`grid ${compact ? "grid-cols-1 gap-1" : "grid-cols-2 gap-2"}`}>
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
            className={`bg-secondary text-on-secondary rounded-md px-3 py-1.5 text-xs transition-opacity hover:opacity-90 ${
              compact ? "" : "col-span-2"
            }`}
          >
            {currentTheme.mode === MODES.dark ? "切换到亮色模式" : "切换到暗色模式"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeDevToolbar;
