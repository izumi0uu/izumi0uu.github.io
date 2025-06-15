"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, MotionConfigContext, LayoutGroup, AnimatePresence } from "framer-motion";

// 创建响应式媒体查询hook
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // 服务器端渲染检查
    if (typeof window === "undefined") return;

    // 创建媒体查询
    const mediaQuery = window.matchMedia(query);

    // 设置初始值
    setMatches(mediaQuery.matches);

    // 定义事件处理函数
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 添加事件监听器 - 使用正确的API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // 旧版浏览器兼容
      mediaQuery.addListener(handleChange);
    }

    // 清理函数
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // 旧版浏览器兼容
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};

// Types
interface CardBlog3dProps {
  title: string; // 只需要标题，不需要描述文本
  variant?: "Default" | "Hover";
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  href?: string;
  onClick?: () => void;
  hideContentBreakpoint?: string; // 隐藏内容的断点，默认为 '(max-width: 640px)'
}

// Transitions
const transition1 = {
  bounce: 0,
  delay: 0,
  duration: 0.4,
  type: "spring" as const,
};

const transition2 = {
  delay: 0,
  duration: 0.4,
  ease: [0.44, 0, 0.56, 1] as [number, number, number, number],
  type: "tween" as const,
};

const titleTransition = {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94],
  type: "tween" as const,
};

const transformTemplate1 = (_: any, t: string) => `translate(-50%, -50%) ${t}`;

// Transition wrapper component
const Transition: React.FC<{ value: any; children: React.ReactNode }> = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(
    () => ({ ...config, transition }),
    [JSON.stringify(transition)]
  );

  return (
    <MotionConfigContext.Provider value={contextValue}>{children}</MotionConfigContext.Provider>
  );
};

const Variants = motion.create(React.Fragment);

const CardBlog3d: React.FC<CardBlog3dProps> = ({
  title,
  variant = "Default",
  className = "",
  style = {},
  width = 600,
  height = 150,
  href,
  onClick,
  hideContentBreakpoint = "(max-width: 640px)",
  ...restProps
}) => {
  const [currentVariant, setCurrentVariant] = useState<"Default" | "Hover">(variant);
  const [gestureState, setGestureState] = useState({ isHovered: false });
  const refBinding = useRef<HTMLDivElement>(null);
  const defaultLayoutId = React.useId();

  // 使用媒体查询检查是否应该隐藏内容
  const shouldHideContent = useMediaQuery(hideContentBreakpoint);

  const isHoverVariant = currentVariant === "Hover";
  const variants = [currentVariant === "Default" ? "GPnJri30y" : "zEwHlJ7zp"];

  const handleMouseEnter = async () => {
    setGestureState({ isHovered: true });
    setCurrentVariant("Hover");
  };

  const handleMouseLeave = async () => {
    setGestureState({ isHovered: false });
    setCurrentVariant("Default");
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  const cubeSliceVariants = {
    zEwHlJ7zp: {
      "--border-color": "var(--color-primary)",
    },
  };

  const sliceCubeVariants = {
    zEwHlJ7zp: {
      rotateX: -28,
      rotateY: -43,
      scale: 1.1,
    },
  };

  const cornerScaleVariants = {
    zEwHlJ7zp: {
      scale: 2.2,
    },
  };

  const bgFillVariants = {
    zEwHlJ7zp: {
      opacity: 1,
    },
  };

  // 动态计算容器宽度
  const containerWidth = shouldHideContent ? 140 : width;

  return (
    <div style={{ width: containerWidth, height, transition: "width 0.3s ease" }}>
      <LayoutGroup id={defaultLayoutId}>
        <Variants animate={variants} initial={false}>
          <Transition value={transition1}>
            <motion.div
              {...restProps}
              className={`icon-hover-3d ${className}`}
              data-framer-name="Default"
              data-highlight={true}
              ref={refBinding}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={currentVariant === "Hover" ? handleMouseLeave : undefined}
              onClick={handleClick}
              style={{
                backgroundColor: "var(--color-surface)",
                alignContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: shouldHideContent ? "0px" : "40px",
                height: "min-content",
                justifyContent: "center",
                overflow: "visible",
                padding: "20px",
                position: "relative",
                width: "min-content",
                borderRadius: "12px",
                border: "2px solid var(--color-outline-variant)",
                boxShadow: isHoverVariant ? "none" : "4px 4px 0 0 var(--color-outline)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease, width 0.3s ease",
                transform: isHoverVariant ? "translate(3px, 3px)" : "translate(0, 0)",
                cursor: "pointer",
                ...style,
              }}
              animate={{
                gap: shouldHideContent ? "0px" : "40px",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon Container */}
              <motion.div
                className="icon-container"
                data-framer-name="Icon"
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flex: "none",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  gap: "10px",
                  height: "100px",
                  justifyContent: "center",
                  overflow: "visible",
                  padding: "0px",
                  position: "relative",
                  width: "100px",
                  border: "1px solid var(--color-outline)",
                  zIndex: 1,
                }}
              >
                {/* BG Container */}
                <motion.div
                  className="bg-container"
                  data-framer-name="BG"
                  style={{
                    flex: "none",
                    height: "348px",
                    overflow: "visible",
                    position: "relative",
                    width: "348px",
                    zIndex: 2,
                    scale: 0.3,
                  }}
                >
                  {/* Slice Cube */}
                  <motion.div
                    className="slice-cube"
                    data-framer-name="Slice Cube"
                    style={{
                      alignContent: "center",
                      alignItems: "center",
                      display: "flex",
                      flex: "none",
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      gap: "28px",
                      height: "min-content",
                      justifyContent: "center",
                      left: "50%",
                      overflow: "visible",
                      padding: "0px",
                      position: "absolute",
                      top: "50%",
                      transformStyle: "preserve-3d",
                      width: "min-content",
                      zIndex: 3,
                      rotate: 49,
                      rotateX: 23,
                      rotateY: 33,
                      scale: 0.7,
                      transformPerspective: 1200,
                    }}
                    transformTemplate={transformTemplate1}
                    variants={sliceCubeVariants}
                    animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                  >
                    {/* Slice 1 */}
                    <Transition value={transition2}>
                      <motion.div
                        className="slice-1"
                        data-framer-name="Slice 1"
                        style={{
                          alignContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flex: "none",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          gap: "10px",
                          height: "min-content",
                          justifyContent: "center",
                          overflow: "visible",
                          padding: "0px",
                          position: "relative",
                          transformStyle: "preserve-3d",
                          width: "min-content",
                        }}
                      >
                        {/* Front */}
                        <motion.div
                          className="slice-1-front"
                          data-framer-name="Front"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flex: "none",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            gap: "10px",
                            height: "34px",
                            justifyContent: "center",
                            overflow: "hidden",
                            padding: "0px",
                            position: "relative",
                            width: "240px",
                            border: "4px solid var(--color-outline)",
                            backgroundColor: "var(--color-surface)",
                            zIndex: 120,
                          }}
                          variants={cubeSliceVariants}
                          animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                        />
                        {/* Back */}
                        <motion.div
                          className="slice-1-back"
                          data-framer-name="Back"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            bottom: "0px",
                            display: "flex",
                            flex: "none",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            gap: "10px",
                            justifyContent: "center",
                            overflow: "hidden",
                            padding: "0px",
                            position: "absolute",
                            right: "0px",
                            top: "0px",
                            width: "240px",
                            zIndex: 1,
                            border: "4px solid var(--color-outline)",
                            backgroundColor: "var(--color-surface)",
                            rotateY: 180,
                          }}
                          variants={cubeSliceVariants}
                          animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                        />
                        {/* Right */}
                        <motion.div
                          className="slice-1-right"
                          data-framer-name="Right"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            bottom: "0px",
                            display: "flex",
                            flex: "none",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            gap: "10px",
                            justifyContent: "center",
                            left: "120px",
                            overflow: "hidden",
                            padding: "0px",
                            position: "absolute",
                            top: "0px",
                            width: "240px",
                            zIndex: 1,
                            border: "4px solid var(--color-outline)",
                            backgroundColor: "var(--color-surface)",
                            rotateY: 90,
                          }}
                          variants={cubeSliceVariants}
                          animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                        />
                        {/* Left */}
                        <motion.div
                          className="slice-1-left"
                          data-framer-name="Left"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            bottom: "0px",
                            display: "flex",
                            flex: "none",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            gap: "10px",
                            justifyContent: "center",
                            overflow: "hidden",
                            padding: "0px",
                            position: "absolute",
                            right: "120px",
                            top: "0px",
                            width: "240px",
                            zIndex: 1,
                            border: "4px solid var(--color-outline)",
                            backgroundColor: "var(--color-surface)",
                            rotateY: -90,
                          }}
                          variants={cubeSliceVariants}
                          animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                        />
                        {/* Top */}
                        <motion.div
                          className="slice-1-top"
                          data-framer-name="Top"
                          style={{
                            flex: "none",
                            height: "240px",
                            left: "0px",
                            overflow: "hidden",
                            position: "absolute",
                            right: "0px",
                            top: "-120px",
                            zIndex: 1,
                            border: "4px solid var(--color-outline)",
                            backgroundColor: "var(--color-surface)",
                            rotateX: 90,
                          }}
                          variants={cubeSliceVariants}
                          animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                        />
                        {/* Bottom */}
                        <motion.div
                          className="slice-1-bottom"
                          data-framer-name="Bottom"
                          style={{
                            flex: "none",
                            height: "240px",
                            left: "0px",
                            overflow: "hidden",
                            position: "absolute",
                            right: "0px",
                            top: "-86px",
                            zIndex: 1,
                            border: "4px solid var(--color-outline)",
                            backgroundColor: "var(--color-surface)",
                            rotateX: 90,
                          }}
                          variants={cubeSliceVariants}
                          animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                        />
                      </motion.div>
                    </Transition>

                    {/* Slice 2 */}
                    <Transition value={transition2}>
                      <motion.div
                        className="slice-2"
                        data-framer-name="Slice 2"
                        style={{
                          alignContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flex: "none",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          gap: "10px",
                          height: "min-content",
                          justifyContent: "center",
                          overflow: "visible",
                          padding: "0px",
                          position: "relative",
                          transformStyle: "preserve-3d",
                          width: "min-content",
                        }}
                      >
                        {/* 简化了Slice 2的内部结构，保留了相同的样式 */}
                        <motion.div
                          className="slice-2-front"
                          data-framer-name="Front"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flex: "none",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            gap: "10px",
                            height: "34px",
                            justifyContent: "center",
                            overflow: "hidden",
                            padding: "0px",
                            position: "relative",
                            width: "240px",
                            border: "4px solid var(--color-outline)",
                            backgroundColor: "var(--color-surface)",
                            zIndex: 120,
                          }}
                          variants={cubeSliceVariants}
                          animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                        />
                      </motion.div>
                    </Transition>

                    {/* Slice 3 */}
                    <Transition value={transition2}>
                      <motion.div
                        className="slice-3"
                        data-framer-name="Slice 3"
                        style={{
                          alignContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flex: "none",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          gap: "10px",
                          height: "min-content",
                          justifyContent: "center",
                          overflow: "visible",
                          padding: "0px",
                          position: "relative",
                          transformStyle: "preserve-3d",
                          width: "min-content",
                        }}
                      >
                        {/* 简化了Slice 3的内部结构，保留了相同的样式 */}
                        <motion.div
                          className="slice-3-front"
                          data-framer-name="Front"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flex: "none",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            gap: "10px",
                            height: "34px",
                            justifyContent: "center",
                            overflow: "hidden",
                            padding: "0px",
                            position: "relative",
                            width: "240px",
                            border: "4px solid var(--color-outline)",
                            backgroundColor: "var(--color-surface)",
                            zIndex: 120,
                          }}
                          variants={cubeSliceVariants}
                          animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                        />
                      </motion.div>
                    </Transition>
                  </motion.div>

                  {/* Corner elements */}
                  <motion.div
                    style={{
                      flex: "none",
                      height: "24px",
                      left: isHoverVariant ? "-6px" : "14px",
                      overflow: "hidden",
                      position: "absolute",
                      top: isHoverVariant ? "-6px" : "14px",
                      width: "24px",
                      zIndex: 2,
                      borderLeft: "4px solid var(--color-outline)",
                      borderTop: "4px solid var(--color-outline)",
                      scale: 1,
                    }}
                    variants={cornerScaleVariants}
                    animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                  />
                  <motion.div
                    style={{
                      flex: "none",
                      height: "24px",
                      left: isHoverVariant ? "-6px" : "14px",
                      overflow: "hidden",
                      position: "absolute",
                      top: isHoverVariant ? "330px" : "310px",
                      width: "24px",
                      zIndex: 2,
                      borderLeft: "4px solid var(--color-outline)",
                      borderBottom: "4px solid var(--color-outline)",
                      scale: 1,
                    }}
                    variants={cornerScaleVariants}
                    animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                  />
                  <motion.div
                    style={{
                      bottom: isHoverVariant ? "-6px" : "14px",
                      flex: "none",
                      height: "24px",
                      overflow: "hidden",
                      position: "absolute",
                      right: isHoverVariant ? "-6px" : "14px",
                      width: "24px",
                      zIndex: 2,
                      borderRight: "4px solid var(--color-outline)",
                      borderBottom: "4px solid var(--color-outline)",
                      scale: 1,
                    }}
                    variants={cornerScaleVariants}
                    animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                  />
                  <motion.div
                    style={{
                      flex: "none",
                      height: "24px",
                      overflow: "hidden",
                      position: "absolute",
                      right: isHoverVariant ? "-6px" : "14px",
                      top: isHoverVariant ? "-6px" : "14px",
                      width: "24px",
                      zIndex: 2,
                      borderRight: "4px solid var(--color-outline)",
                      borderTop: "4px solid var(--color-outline)",
                      scale: 1,
                    }}
                    variants={cornerScaleVariants}
                    animate={isHoverVariant ? "zEwHlJ7zp" : "default"}
                  />
                </motion.div>
              </motion.div>

              {/* Content - 只在非窄屏幕上显示标题部分 */}
              <AnimatePresence>
                {!shouldHideContent && (
                  <motion.div
                    className="content"
                    data-framer-name="Content"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      alignContent: "flex-start",
                      alignItems: "flex-start",
                      display: "flex",
                      flex: "none",
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      gap: "12px",
                      height: "min-content",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: "0px",
                      position: "relative",
                    }}
                  >
                    {/* 只保留标题部分，移除描述文本 */}
                    <motion.div
                      className="text-container"
                      data-framer-name="Text"
                      style={{
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flex: "none",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        gap: "10px",
                        height: "32px",
                        justifyContent: "center",
                        overflow: "visible",
                        padding: "0px",
                        position: "relative",
                      }}
                    >
                      {/* BG Fill - Hidden for clean black/white effect */}
                      <motion.div
                        className="bg-fill"
                        data-framer-name="BG Fill"
                        style={{
                          flex: "none",
                          height: "32px",
                          left: "0px",
                          overflow: "hidden",
                          position: "absolute",
                          top: "calc(50% - 16px)",
                          width: "1px",
                          zIndex: 0,
                          backgroundColor: "transparent",
                          opacity: 0,
                        }}
                      />

                      {/* 标题文本带悬停效果 */}
                      <motion.div
                        style={{
                          flex: "none",
                          height: "32px",
                          position: "relative",
                          whiteSpace: "pre",
                          width: "auto",
                          fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "var(--color-headings)",
                          userSelect: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          overflow: "hidden",
                        }}
                      >
                        {/* 背景文本 */}
                        <span
                          className="mx-1 text-center"
                          style={{ position: "relative", zIndex: 1 }}
                        >
                          {title}
                        </span>

                        {/* 动画覆盖文本 */}
                        <motion.span
                          className="mx-1 mt-0.5 text-center"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            color: "var(--color-surface)",
                            clipPath: `inset(0 ${isHoverVariant ? "0%" : "100%"} 0 0)`,
                            zIndex: 2,
                          }}
                          animate={{
                            clipPath: `inset(0 ${isHoverVariant ? "0%" : "100%"} 0 0)`,
                          }}
                          transition={titleTransition}
                        >
                          {title}
                        </motion.span>

                        {/* 白色背景填充，从左向右移动 */}
                        <motion.div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "var(--color-primary)",
                            transformOrigin: "left center",
                            scaleX: 0,
                            zIndex: 1,
                          }}
                          animate={{
                            scaleX: isHoverVariant ? 1 : 0,
                          }}
                          transition={titleTransition}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Transition>
        </Variants>
      </LayoutGroup>
    </div>
  );
};

export { CardBlog3d };
