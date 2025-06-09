import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useRef, useCallback } from "react";

interface NotificationMessageProps {
  children?: React.ReactNode;
  visible: boolean;
  onDismiss?: () => void;
  className?: string;
  id?: string;
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  children,
  visible,
  onDismiss,
  className,
  id = "notification",
}) => {
  const animatedDivRef = useRef<HTMLDivElement | null>(null);

  const handleDismiss = useCallback(() => {
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

  useEffect(() => {
    return () => {
      if (animatedDivRef.current) {
        const element = animatedDivRef.current as any;

        if (element.__reactProps$) {
          element.__reactProps$ = undefined;
        }
        if (element.__reactFiber$) {
          element.__reactFiber$ = undefined;
        }

        animatedDivRef.current = null;
      }
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.div
          key={`${id}-notification`}
          ref={animatedDivRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={clsx("pointer-events-none fixed right-0 bottom-8 left-0 z-50", className)}
        >
          <div className="mx-auto flex w-full justify-end pr-4">
            <div className="text-content-primary pointer-events-auto relative rounded-lg bg-surface-container-high p-4 pr-10 shadow-lg">
              {onDismiss && (
                <button
                  aria-label="dismiss message"
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 rotate-45 transform hover:text-primary focus:text-primary"
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
