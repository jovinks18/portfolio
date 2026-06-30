"use client";

import { motion } from "framer-motion";
import type { Tone } from "@/data/portfolioData";
import { toneChip } from "@/lib/tones";

type BadgeProps = {
  children: React.ReactNode;
  tone?: Tone;
  emoji?: string;
  /** Adds a playful wiggle/scale on hover. */
  interactive?: boolean;
};

export default function Badge({
  children,
  tone = "neutral",
  emoji,
  interactive = false,
}: BadgeProps) {
  return (
    <motion.span
      whileHover={interactive ? { scale: 1.06, rotate: -1.5 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`inline-flex cursor-default items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${toneChip[tone]}`}
    >
      {emoji && <span aria-hidden>{emoji}</span>}
      {children}
    </motion.span>
  );
}
