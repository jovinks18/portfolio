"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  /** Disable the hover lift (e.g. for purely decorative cards). */
  still?: boolean;
  /** Stagger delay in seconds for the entrance animation. */
  delay?: number;
};

/**
 * The base bento tile: rounded, soft border, light shadow,
 * fade/slide entrance, gentle hover lift.
 */
export default function BentoCard({
  children,
  className = "",
  still = false,
  delay = 0,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={
        still ? undefined : { y: -4, transition: { duration: 0.2 } }
      }
      className={`rounded-bento border border-ink/[0.06] bg-white shadow-bento transition-shadow duration-300 hover:shadow-bento-hover ${className}`}
    >
      {children}
    </motion.div>
  );
}
