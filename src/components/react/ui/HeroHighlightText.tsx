"use client";
import { cn } from "@/utils/ui/styles";
import { motion } from "motion/react";
import React from "react";

const Highlight = ({
  children,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}) => {
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-primary/20 to-primary-container/50 text-on-primary-container border-b-2 border-primary/30",
    secondary:
      "bg-gradient-to-r from-secondary/20 to-secondary-container/50 text-on-secondary-container border-b-2 border-secondary/30",
    tertiary:
      "bg-gradient-to-r from-tertiary/20 to-tertiary-container/50 text-on-tertiary-container border-b-2 border-tertiary/30",
  };

  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
        opacity: 0.8,
      }}
      animate={{
        backgroundSize: "100% 100%",
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg px-2 py-1 font-medium transition-all duration-300 hover:scale-105`,
        variantStyles[variant],
        className
      )}
    >
      <span
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-surface-bright/10 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );
};

export { Highlight };
