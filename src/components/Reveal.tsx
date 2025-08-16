"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface RevealProps {
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

export function Reveal({ children, delay = 0.05, y = 24, duration = 0.5, className }: PropsWithChildren<RevealProps>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
