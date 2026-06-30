"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  kicker: string;
  title: string;
  blurb?: string;
};

export default function SectionHeader({
  kicker,
  title,
  blurb,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">
        {kicker}
      </p>
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {title}
      </h2>
      {blurb && <p className="mt-2 max-w-xl text-sm text-ink-soft">{blurb}</p>}
    </motion.div>
  );
}
