"use client";

import { motion } from "framer-motion";
import type { Tone } from "@/data/portfolioData";

const noteSurface: Record<Tone, string> = {
  clay: "bg-clay-soft",
  sage: "bg-sage-soft",
  butter: "bg-butter-soft",
  dusk: "bg-dusk-soft",
  blush: "bg-blush-soft",
  neutral: "bg-cream-100",
};

type NoteCardProps = {
  text: string;
  tone: Tone;
  index?: number;
};

/** Sticky-note style quote tile with a slight resting tilt. */
export default function NoteCard({ text, tone, index = 0 }: NoteCardProps) {
  const tilt = index % 2 === 0 ? -1.2 : 1.4;
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.2 } }}
      className={`rounded-2xl p-5 shadow-bento ${noteSurface[tone]}`}
    >
      <blockquote className="font-display text-[0.95rem] leading-relaxed text-ink">
        “{text}”
      </blockquote>
    </motion.figure>
  );
}
