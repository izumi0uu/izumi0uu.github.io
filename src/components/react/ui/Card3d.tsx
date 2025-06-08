"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, MotionConfigContext, LayoutGroup } from "framer-motion";

// Types
interface Props {
  heading?: string;
  text?: string;
  variant?: "Default" | "Hover";
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  href?: string;
  onClick?: () => void;
  primaryColor?: string;
  children?: React.ReactNode;
  scale?: number;
  responsive?: boolean;
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

const Card3d: React.FC<Props> = ({
  heading = "Library",
  text = "A comprehensive collection of digital books and resources for learning and research. ",
  variant = "Default",
  className = "",
  style = {},
  width = 600,
  height = 150,
  href,
  onClick,
  primaryColor,
  children,
  scale = 1,
  responsive = true,
  ...restProps
}) => {
  const [currentVariant, setCurrentVariant] = useState<"Default" | "Hover">(variant);
  const [gestureState, setGestureState] = useState({ isHovered: false });
  const [isMobile, setIsMobile] = useState(false);
  const [screenScale, setScreenScale] = useState(1);
  const refBinding = useRef<HTMLDivElement>(null);
  const defaultLayoutId = React.useId();

  useEffect(() => {
    if (!responsive) return;

    const calculateScale = () => {
      const screenWidth = window.innerWidth;
      let newScale = 1;

      if (screenWidth < 640) {
        newScale = 0.6;
      } else if (screenWidth < 768) {
        newScale = 0.75;
      } else if (screenWidth < 1024) {
        newScale = 0.9;
      } else if (screenWidth < 1280) {
        newScale = 1;
      } else if (screenWidth < 1536) {
        newScale = 1.1;
      } else {
        newScale = 1.2;
      }

      setScreenScale(newScale);
      setIsMobile(screenWidth < 768);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);

    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, [responsive]);

  const finalScale = scale * screenScale;

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

  const borderColor = primaryColor || "var(--color-primary)";

  const cubeSliceVariants = {
    zEwHlJ7zp: {
      "--border-color": borderColor,
    },
  };

  const titleVariants = {
    default: {
      "--fill-width": "0%",
    },
    hovered: {
      "--fill-width": "100%",
    },
  };

  // Add this new transition for the title
  const titleTransition = {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94], // Smoother easing curve
    type: "tween" as const,
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* 渲染所有children，使得可以在卡片外部添加元素 */}
      {children}

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
                flexDirection: isMobile ? "column" : "row",
                flexWrap: "nowrap",
                gap: `${16 * finalScale}px`,
                justifyContent: "center",
                overflow: "visible",
                padding: `${16 * finalScale}px`,
                position: "relative",
                borderRadius: `${12 * finalScale}px`,
                border: `${1 * finalScale}px solid var(--color-outline-variant)`,
                boxShadow: isHoverVariant
                  ? `0 ${10 * finalScale}px ${15 * finalScale}px -${3 * finalScale}px rgba(0, 0, 0, 0.1), 0 ${4 * finalScale}px ${6 * finalScale}px -${2 * finalScale}px rgba(0, 0, 0, 0.05)`
                  : `0 ${4 * finalScale}px ${6 * finalScale}px -${1 * finalScale}px rgba(0, 0, 0, 0.1), 0 ${2 * finalScale}px ${4 * finalScale}px -${1 * finalScale}px rgba(0, 0, 0, 0.06)`,
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                transform: isHoverVariant ? `translateY(-${4 * finalScale}px)` : "translateY(0)",
                cursor: "pointer",
                width: width ? width * finalScale : "auto",
                height: height ? height * finalScale : "auto",
                maxWidth: "100%",
                ...style,
              }}
            >
              <motion.div
                className="content"
                data-framer-name="Content"
                style={{
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                  flex: "1",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  gap: `${12 * finalScale}px`,
                  height: "auto",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "0px",
                  position: "relative",
                  width: "100%",
                  minWidth: isMobile ? "auto" : `${200 * finalScale}px`,
                  maxWidth: isMobile
                    ? "100%"
                    : width
                      ? `calc(${width * finalScale}px - ${160 * finalScale}px)`
                      : `${400 * finalScale}px`,
                  order: isMobile ? 2 : 1,
                }}
              >
                <motion.div
                  className="text-container"
                  data-framer-name="Text"
                  style={{
                    alignContent: "flex-start",
                    alignItems: "flex-start",
                    display: "flex",
                    flex: "none",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    gap: `${10 * finalScale}px`,
                    height: "auto",
                    minHeight: `${32 * finalScale}px`,
                    justifyContent: "flex-start",
                    overflow: "visible",
                    padding: "0px",
                    position: "relative",
                    width: "100%",
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  <motion.div
                    style={{
                      flex: "none",
                      height: "auto",
                      position: "relative",
                      whiteSpace: "normal",
                      width: "100%",
                      fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                      fontWeight: "600",
                      fontSize: isMobile ? `${18 * finalScale}px` : `${20 * finalScale}px`,
                      lineHeight: "1.4",
                      color: "var(--color-headings)",
                      userSelect: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: isMobile ? "center" : "flex-start",
                      overflow: "hidden",
                    }}
                  >
                    {/* 背景文本 */}
                    <span
                      className={isMobile ? "text-center" : "text-left"}
                      style={{ position: "relative", zIndex: 1, width: "100%" }}
                    >
                      {heading}
                    </span>

                    {/* 悬停效果背景 */}
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
                        zIndex: 0,
                        opacity: 0.1,
                      }}
                      animate={{
                        scaleX: isHoverVariant ? 1 : 0,
                      }}
                      transition={titleTransition}
                    />
                  </motion.div>
                </motion.div>

                {/* 描述文本 */}
                <motion.div
                  style={{
                    flex: "none",
                    height: "auto",
                    position: "relative",
                    whiteSpace: "pre-wrap",
                    width: "100%",
                    wordBreak: "break-word",
                    wordWrap: "break-word",
                    fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                    fontWeight: "400",
                    fontSize: isMobile ? `${14 * finalScale}px` : `${16 * finalScale}px`,
                    lineHeight: "1.5em",
                    color: "var(--color-content-secondary)",
                    userSelect: "none",
                    marginTop: `${8 * finalScale}px`,
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  {text}
                </motion.div>
              </motion.div>

              {/* 右侧图标部分 - 在移动设备上排在第一位 */}
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
                  gap: `${8 * finalScale}px`,
                  height: isMobile ? `${60 * finalScale}px` : `${80 * finalScale}px`,
                  width: isMobile ? `${60 * finalScale}px` : `${80 * finalScale}px`,
                  justifyContent: "center",
                  overflow: "visible",
                  padding: "0px",
                  position: "relative",
                  border: `${1 * finalScale}px solid ${isHoverVariant ? "var(--color-primary)" : "var(--color-outline)"}`,
                  transition: "border-color 0.3s ease",
                  borderRadius: `${8 * finalScale}px`,
                  order: isMobile ? 1 : 2,
                  transform: `scale(${finalScale})`,
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
                    scale: 0.25,
                  }}
                >
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
                      gap: `${28 * finalScale}px`,
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
                      scale: 0.7 * finalScale,
                      transformPerspective: 1200 * finalScale,
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

                    {/* Slice 2 - Similar structure */}
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

                    {/* Slice 3 - Similar structure */}
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
            </motion.div>
          </Transition>
        </Variants>
      </LayoutGroup>
    </div>
  );
};

export { Card3d };
