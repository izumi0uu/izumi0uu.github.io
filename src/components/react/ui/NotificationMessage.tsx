import { useSearchParams } from "@remix-run/react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "lucide-react";

const NotificationMessage = ({
  queryStringKey,
  visibleMs = 8000,
  visible: controlledVisible,
  autoClose,
  children,
  position = "bottom-right",
  onDismiss,
  /* how long to wait before the message is shown, after mount 0 to 1 */
  delay = typeof controlledVisible === "undefined" ? 1 : 0,
}: {
  queryStringKey?: string;
  children?: React.ReactNode | React.ReactNode[];
  position?: "bottom-right" | "top-center";
  // make the visibility controlled
  visible?: boolean;
  delay?: number;
  onDismiss?: () => void;
} & ({ autoClose: false; visibleMs?: never } | { visibleMs?: number; autoClose?: never })) {
  const [searchParams] = useSearchParams();
  const hasQueryStringValue = queryStringKey ? searchParams.has(queryStringKey) : false;
  const [isVisible, setIsVisible] = useState(!queryStringKey || hasQueryStringValue);
  const messageFromQuery = queryStringKey && searchParams.get(queryStringKey);
  // Eslint is wrong here, params.get can return an empty string

  const message = messageFromQuery || children;
  const latestMessageRef =useRef(message);

  useEffect(() => {
    if (!message) setIsVisible(false);
  }, [message]);

  // if the query gets a message after the initial mount then we want to toggle visibility
  useEffect(() => {
    if (hasQueryStringValue) setIsVisible(true);
  }, [hasQueryStringValue]);

  useEffect(() => {
    latestMessageRef.current = message;
  }, [message]);

  useEffect(() => {
    if (!latestMessageRef.current) return;
    if (autoClose === false) return;
    if (controlledVisible === false) return;

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, visibleMs + delay);

    return () => clearTimeout(timeout);
  }, [queryStringKey, delay, autoClose, controlledVisible, visibleMs]);

  useEffect(() => {
    if (!latestMessageRef.current) return;
    if (queryStringKey && searchParams.has(queryStringKey)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete(queryStringKey);

      // use setSearchParams from useSearchParams resulted in redirecting the
      // user to the homepage (wut?) and left a `?` at the end of the URL even
      // if there aren't any other search params. This doesn't have either of
      // those issues.
      window.history.replaceState(
        null,
        "",
        [window.location.pathname, newSearchParams.toString()].filter(Boolean).join("?")
      );
    }
  }, [queryStringKey, searchParams]);

  const initialY = position.includes("bottom") ? 50 : -50;
  const show = message && typeof controlledVisible === "boolean" ? controlledVisible : isVisible;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: initialY, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay } }}
          exit={{ y: initialY, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={clsx("text-inverse px-5vw pointer-events-none fixed right-0 left-0 z-50", {
            "bottom-8": position === "bottom-right",
            "top-8": position === "top-center",
          })}
        >
          <div
            className={clsx("max-w-8xl mx-auto flex w-full", {
              "justify-end": position === "bottom-right",
              "justify-center": position === "top-center",
            })}
          >
            <div className="bg-inverse text-inverse pointer-events-auto relative max-w-xl rounded-lg p-8 pr-14 shadow-md">
              {typeof controlledVisible === "undefined" || onDismiss ? (
                <button
                  aria-label="dismiss message"
                  onClick={() => {
                    setIsVisible(false);
                    onDismiss?.();
                  }}
                  className="hover:text-inverse focus:text-inverse absolute top-8 right-4 rotate-45 transform text-secondary"
                >
                  <PlusIcon />
                </button>
              ) : null}
              {message}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export { NotificationMessage };
