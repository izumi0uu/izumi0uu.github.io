import { useState, useEffect } from "react";
import { useSpinDelay } from "spin-delay";
import { motion, AnimatePresence } from "framer-motion";

import { NotificationMessage } from "./NotificationMessage";
import { TeamCircle } from "./TeamCircle";

const LOADER_WORDS = ["加载中...", "正在连接...", "编译内容...", "即将呈现..."];

interface AstroNavigationEvent extends Event {
  from?: string;
  to?: string;
  direction?: "forward" | "back";
  navigationType?: "push" | "replace";
  sourceElement?: HTMLElement;
}

const PageLoadingIndicator = () => {
  // isLoading 状态用于跟踪 Astro 是否正在进行页面导航
  const [isLoading, setIsLoading] = useState(false);
  // words 状态用于存储当前轮播的文字列表
  const [words, setWords] = useState<Array<string>>(LOADER_WORDS);
  // pendingPath 状态用于存储即将导航到的路径
  const [pendingPath, setPendingPath] = useState("");

  // useSpinDelay Hook：只有当 isLoading 状态持续超过 400ms 时，
  // showLoader 才会变为 true，避免在快速导航时出现不必要的闪烁。
  const showLoader = useSpinDelay(isLoading, {
    delay: 400,
    minDuration: 1000,
  });

  //  监听 Astro 的页面导航事件
  useEffect(() => {
    const handlePageLoadStart = (event: Event) => {
      // 直接访问事件对象的属性
      const navEvent = event as AstroNavigationEvent;

      // 提取目标URL
      const targetUrl = navEvent.to || "";

      const displayPath = targetUrl ? new URL(targetUrl).pathname : "即将跳转...";

      console.log("Navigation started:", {
        from: navEvent.from,
        to: navEvent.to,
        direction: navEvent.direction,
        navigationType: navEvent.navigationType,
      });

      setPendingPath(displayPath);
      setIsLoading(true);
    };

    const handlePageLoadEnd = () => {
      setIsLoading(false);
      console.log("Navigation ended:", {
        currentPath: window.location.pathname,
      });
    };

    // 监听Astro视图过渡事件
    document.addEventListener("astro:before-preparation", handlePageLoadStart);
    document.addEventListener("astro:page-load", handlePageLoadEnd);

    // 兼容性处理，同时监听旧版事件
    document.addEventListener("astro:after-swap", handlePageLoadEnd);

    return () => {
      document.removeEventListener("astro:before-preparation", handlePageLoadStart);
      document.removeEventListener("astro:page-load", handlePageLoadEnd);
      document.removeEventListener("astro:after-swap", handlePageLoadEnd);
    };
  }, []);

  useEffect(() => {
    if (!showLoader) return;

    const interval = setInterval(() => {
      // 将数组的第一个元素移动到末尾，实现轮播
      setWords(([first, ...rest]) => [...rest, first]);
    }, 2000);

    return () => clearInterval(interval);
  }, [showLoader]);

  const action = words[0];

  return (
    <NotificationMessage visible={showLoader}>
      <div className="flex w-56 items-center">
        <motion.div
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          animate={{ rotate: 360 }}
        >
          <TeamCircle size={40} team="UNKNOWN" />
        </motion.div>
        <div className="ml-4 inline-grid">
          <AnimatePresence>
            <div className="col-start-1 row-start-1 flex overflow-hidden">
              <motion.span
                key={action}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-none text-sm font-semibold text-content"
              >
                {action}
              </motion.span>
            </div>
          </AnimatePresence>
          <span className="truncate text-xs text-content-secondary">路径: {pendingPath}</span>
        </div>
      </div>
    </NotificationMessage>
  );
};

export { PageLoadingIndicator };
