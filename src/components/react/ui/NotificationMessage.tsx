import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface NotificationMessageProps {
  children?: React.ReactNode;
  position?: "bottom-right" | "top-center";
  visible: boolean;
  onDismiss?: () => void;
  className?: string;
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  children,
  position = "bottom-right",
  visible,
  onDismiss,
  className,
}) => {
  const initialY = position.includes("bottom") ? 50 : -50;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: initialY, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: initialY, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={clsx(
            "pointer-events-none fixed right-0 left-0 z-50",
            {
              "bottom-8": position === "bottom-right",
              "top-8": position === "top-center",
            },
            className
          )}
        >
          <div
            className={clsx("mx-auto flex w-full max-w-md", {
              // 调整了 max-w 和一些布局
              "justify-end pr-4": position === "bottom-right",
              "justify-center": position === "top-center",
            })}
          >
            <div className="pointer-events-auto relative rounded-lg bg-[var(--color-surface-container-high)] p-4 pr-10 text-[var(--color-on-surface)] shadow-lg">
              {" "}
              {/* 使用了你的 CSS 变量 */}
              {onDismiss && (
                <button
                  aria-label="dismiss message"
                  onClick={onDismiss}
                  className="absolute top-2 right-2 rotate-45 transform hover:text-[var(--color-primary)] focus:text-[var(--color-primary)]"
                >
                  <PlusIcon className="size-5" />
                </button>
              )}
              {children}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { NotificationMessage };
