import React, { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCAL_STORAGE_KEY,
  BROWSER_LANG_REDIRECT_DONE_KEY,
} from "@/config/i18n";

// 语言标签映射
const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  zh: "中文",
};

// i18n 开发工具的主要组件
const I18nControls: React.FC = () => {
  const [currentLocale, setCurrentLocale] = useState<string>(DEFAULT_LOCALE);
  const [storedLocale, setStoredLocale] = useState<string | null>(null);
  const [redirectAttempted, setRedirectAttempted] = useState<boolean>(false);
  const [browserLanguage, setBrowserLanguage] = useState<string>("");
  const [currentPath, setCurrentPath] = useState<string>("");

  // 从 URL 中提取当前语言
  const extractLocaleFromUrl = (url: string): string => {
    const urlObj = new URL(url, window.location.origin);
    const pathSegments = urlObj.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0 && SUPPORTED_LOCALES.includes(pathSegments[0] as any)) {
      return pathSegments[0];
    }
    return DEFAULT_LOCALE;
  };

  // 生成本地化的 URL
  const localizeUrl = (locale: string, path?: string): string => {
    const targetPath = path || window.location.pathname;
    const urlObj = new URL(targetPath, window.location.origin);
    const pathSegments = urlObj.pathname.split("/").filter(Boolean);

    // 移除现有的语言前缀
    if (pathSegments.length > 0 && SUPPORTED_LOCALES.includes(pathSegments[0] as any)) {
      pathSegments.shift();
    }

    // 添加新的语言前缀（因为 PREFIX_DEFAULT_LOCALE 为 true，所有语言都需要前缀）
    pathSegments.unshift(locale);

    urlObj.pathname = "/" + pathSegments.join("/");
    return urlObj.pathname + urlObj.search + urlObj.hash;
  };

  // 初始化状态
  useEffect(() => {
    const updateState = () => {
      // 获取当前语言
      const locale = extractLocaleFromUrl(window.location.href);
      setCurrentLocale(locale);

      // 获取存储的语言偏好
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        setStoredLocale(stored);
      } catch (e) {
        console.warn("无法访问 localStorage:", e);
      }

      // 检查是否已尝试重定向
      try {
        const attempted = !!sessionStorage.getItem(BROWSER_LANG_REDIRECT_DONE_KEY);
        setRedirectAttempted(attempted);
      } catch (e) {
        console.warn("无法访问 sessionStorage:", e);
      }

      // 获取浏览器语言
      setBrowserLanguage(navigator.language || "unknown");

      // 获取当前路径
      setCurrentPath(window.location.pathname);
    };

    updateState();

    // 监听 URL 变化
    const handlePopState = () => updateState();
    window.addEventListener("popstate", handlePopState);

    // 监听存储变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY) {
        setStoredLocale(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 切换语言
  const switchLocale = (locale: string) => {
    const newUrl = localizeUrl(locale);
    window.location.href = newUrl;
  };

  // 设置语言偏好
  const setLanguagePreference = (locale: string | null) => {
    try {
      if (locale) {
        localStorage.setItem(LOCAL_STORAGE_KEY, locale);
        setStoredLocale(locale);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setStoredLocale(null);
      }
    } catch (e) {
      console.error("无法设置语言偏好:", e);
    }
  };

  // 清除重定向标记
  const clearRedirectFlag = () => {
    try {
      sessionStorage.removeItem(BROWSER_LANG_REDIRECT_DONE_KEY);
      setRedirectAttempted(false);
    } catch (e) {
      console.error("无法清除重定向标记:", e);
    }
  };

  // 测试重定向逻辑
  const testRedirect = () => {
    clearRedirectFlag();
    window.location.reload();
  };

  // 模拟不同的浏览器语言
  const simulateBrowserLanguage = (lang: string) => {
    // 这只是一个演示，实际上无法修改 navigator.language
    alert(`模拟浏览器语言: ${lang}\n请在浏览器开发者工具中手动修改语言设置来测试`);
  };

  return (
    <div className="bg-surface border-outline flex flex-col gap-4 rounded-lg border p-4 shadow-lg">
      <div className="text-headings mb-2 text-lg font-bold">🌐 i18n 开发工具</div>

      {/* 当前状态 */}
      <div className="bg-surface-container rounded-md p-3">
        <h3 className="text-headings mb-2 text-sm font-semibold">当前状态</h3>
        <div className="text-content space-y-1 text-xs">
          <div>
            <strong>当前语言:</strong> {currentLocale} ({LOCALE_LABELS[currentLocale]})
          </div>
          <div>
            <strong>当前路径:</strong> {currentPath}
          </div>
          <div>
            <strong>浏览器语言:</strong> {browserLanguage}
          </div>
          <div>
            <strong>存储的偏好:</strong> {storedLocale || "无"}
          </div>
          <div>
            <strong>重定向已尝试:</strong> {redirectAttempted ? "是" : "否"}
          </div>
        </div>
      </div>

      {/* 语言切换 */}
      <div className="bg-surface-container rounded-md p-3">
        <h3 className="text-headings mb-2 text-sm font-semibold">语言切换</h3>
        <div className="grid grid-cols-2 gap-2">
          {SUPPORTED_LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`rounded-md px-3 py-2 text-xs transition-colors ${
                currentLocale === locale
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-content hover:bg-surface-container-highest"
              }`}
            >
              {LOCALE_LABELS[locale]} ({locale})
            </button>
          ))}
        </div>
      </div>

      {/* 语言偏好管理 */}
      <div className="bg-surface-container rounded-md p-3">
        <h3 className="text-headings mb-2 text-sm font-semibold">语言偏好</h3>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {SUPPORTED_LOCALES.map((locale) => (
              <button
                key={locale}
                onClick={() => setLanguagePreference(locale)}
                className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                  storedLocale === locale
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-high text-content hover:bg-surface-container-highest"
                }`}
              >
                设为 {LOCALE_LABELS[locale]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setLanguagePreference(null)}
            className="bg-error text-on-error w-full rounded-md px-3 py-1.5 text-xs transition-opacity hover:opacity-90"
          >
            清除偏好
          </button>
        </div>
      </div>

      {/* 重定向测试 */}
      <div className="bg-surface-container rounded-md p-3">
        <h3 className="text-headings mb-2 text-sm font-semibold">重定向测试</h3>
        <div className="space-y-2">
          <button
            onClick={testRedirect}
            className="bg-tertiary text-on-tertiary w-full rounded-md px-3 py-2 text-xs transition-opacity hover:opacity-90"
          >
            🔄 测试自动重定向
          </button>
          <button
            onClick={clearRedirectFlag}
            className="bg-surface-container-high text-content hover:bg-surface-container-highest w-full rounded-md px-3 py-1.5 text-xs transition-colors"
          >
            清除重定向标记
          </button>
        </div>
      </div>

      {/* URL 预览 */}
      <div className="bg-surface-container rounded-md p-3">
        <h3 className="text-headings mb-2 text-sm font-semibold">URL 预览</h3>
        <div className="space-y-1">
          {SUPPORTED_LOCALES.map((locale) => (
            <div key={locale} className="text-content text-xs">
              <strong>{LOCALE_LABELS[locale]}:</strong>{" "}
              <code className="bg-surface-container-high rounded px-1">
                {window.location.origin}
                {localizeUrl(locale)}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* 调试信息 */}
      <div className="bg-surface-container rounded-md p-3">
        <h3 className="text-headings mb-2 text-sm font-semibold">调试信息</h3>
        <div className="text-content space-y-1 text-xs">
          <div>
            <strong>默认语言:</strong> {DEFAULT_LOCALE}
          </div>
          <div>
            <strong>支持的语言:</strong> {SUPPORTED_LOCALES.join(", ")}
          </div>
          <div>
            <strong>存储键:</strong> {LOCAL_STORAGE_KEY}
          </div>
          <div>
            <strong>会话键:</strong> {BROWSER_LANG_REDIRECT_DONE_KEY}
          </div>
        </div>
      </div>
    </div>
  );
};

// 主工具栏组件
const I18nDevToolbar: React.FC = () => {
  const toolbarRootDivRef = useRef<HTMLDivElement | null>(null);
  const reactRootRef = useRef<Root | null>(null);

  useEffect(() => {
    // 仅在开发模式下运行
    if (import.meta.env.MODE === "development") {
      if (!toolbarRootDivRef.current) {
        // 创建专用的 div 用于挂载工具栏
        const div = document.createElement("div");
        div.id = "i18n-dev-toolbar-root";
        div.style.position = "fixed";
        div.style.top = "20px";
        div.style.left = "20px";
        div.style.zIndex = "99998";
        div.style.maxHeight = "80vh";
        div.style.overflowY = "auto";
        div.style.width = "300px";
        document.body.appendChild(div);
        toolbarRootDivRef.current = div;

        // 创建 React 根
        reactRootRef.current = createRoot(div);
      }

      // 渲染组件
      reactRootRef.current?.render(
        <React.StrictMode>
          <I18nControls />
        </React.StrictMode>
      );
    }

    // 清理函数
    return () => {
      if (reactRootRef.current) {
        reactRootRef.current.unmount();
        reactRootRef.current = null;
      }
      if (toolbarRootDivRef.current && toolbarRootDivRef.current.parentNode) {
        toolbarRootDivRef.current.parentNode.removeChild(toolbarRootDivRef.current);
        toolbarRootDivRef.current = null;
      }
    };
  }, []);

  return null;
};

export default I18nDevToolbar;
