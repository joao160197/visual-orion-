"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface RevealProps {
  delay?: number;
  duration?: number;
  distance?: number; // deslocamento inicial
  direction?: "none" | "up" | "down" | "left" | "right";
  once?: boolean;
  amount?: number; // quanta parte do elemento precisa estar visível
  className?: string;
  initialScale?: number;
  hoverScale?: number;
  tapScale?: number;
}

export function Reveal({
  children,
  delay = 0.05,
  duration = 0.5,
  distance = 24,
  direction = "up",
  once = true,
  amount = 0.2,
  className,
  initialScale = 1,
  hoverScale,
  tapScale,
}: PropsWithChildren<RevealProps>) {
  const getOffsets = () => {
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offsets = getOffsets();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offsets.x, y: offsets.y, scale: initialScale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      whileHover={hoverScale ? { scale: hoverScale } : undefined}
      whileTap={tapScale ? { scale: tapScale } : undefined}
      viewport={{ once, amount }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
