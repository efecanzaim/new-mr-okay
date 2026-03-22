"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { clsx } from "clsx";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: MagneticButtonProps) {
  const baseStyles =
    "relative overflow-hidden font-sans uppercase transition-all duration-500";

  const variants = {
    primary:
      "bg-black text-white font-bold border border-black hover:bg-white hover:text-black",
    secondary:
      "bg-gray-100 text-black border border-black/20 hover:border-black/40",
    outline:
      "bg-transparent text-black border border-black/30 hover:border-black/60",
  };

  const sizes = {
    sm: "px-6 py-2 text-[10px]",
    md: "px-10 py-3 text-xs",
    lg: "px-14 py-4 text-xs",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
