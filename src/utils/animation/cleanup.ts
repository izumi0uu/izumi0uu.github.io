/**
 * GSAP动画清理工具
 * 用于在路由切换或组件卸载时彻底清理GSAP动画实例
 */

// 导入GSAP库 - 修改导入路径以解决模块问题
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// 确保插件在浏览器环境中被注册
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 清理所有GSAP动画和ScrollTrigger实例
 * 在路由切换前调用此函数可以防止内存泄漏
 */
export const cleanupGSAP = () => {
  // 确保只在浏览器环境中执行
  if (typeof window === "undefined") return;

  try {
    // 1. 杀死所有ScrollTrigger实例
    if (ScrollTrigger) {
      const triggers = ScrollTrigger.getAll();
      console.log("[GSAP Cleanup] Found ScrollTriggers:", triggers.length);
      triggers.forEach((trigger) => {
        trigger.kill(true); // true参数确保完全移除
      });

      // 清除所有ScrollTrigger相关的DOM监听器
      ScrollTrigger.clearMatchMedia();
    }

    // 2. 杀死所有GSAP动画
    gsap.killTweensOf("*");

    // 3. 清理GSAP内部缓存
    const context = gsap.context(() => {});
    context.kill();

    // 4. 手动触发垃圾回收
    if (window.gc) {
      try {
        // @ts-ignore - gc只在某些环境可用
        window.gc();
      } catch (e) {
        // 忽略错误
      }
    }

    console.debug("[GSAP Cleanup] All animations and ScrollTriggers cleared");
  } catch (err) {
    console.error("[GSAP Cleanup] Error cleaning up GSAP resources:", err);
  }
};

/**
 * 创建一个MutationObserver来监控DOM变化
 * 当特定元素被移除时自动清理GSAP资源
 * @param selector 要监视的元素选择器
 */
export const createGSAPCleanupObserver = (selector: string) => {
  if (typeof window === "undefined") return null;

  try {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.removedNodes.length > 0) {
          // 检查是否移除了我们关心的元素
          const wasRemoved = Array.from(mutation.removedNodes).some((node) => {
            if (node instanceof HTMLElement) {
              return node.matches(selector) || node.querySelector(selector);
            }
            return false;
          });

          if (wasRemoved) {
            cleanupGSAP();
          }
        }
      }
    });

    // 开始观察document.body的变化
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return observer;
  } catch (err) {
    console.error("[GSAP Observer] Error creating cleanup observer:", err);
    return null;
  }
};

/**
 * 在组件中使用的清理钩子
 * 应在React组件的useEffect中调用
 */
export const useGSAPCleanup = () => {
  // 此函数应在React组件中使用
  if (typeof window === "undefined") return () => {};

  // 返回清理函数
  return () => {
    cleanupGSAP();
  };
};
