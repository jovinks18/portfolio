"use client";

import { motion } from "framer-motion";

type ContactCardProps = {
  label: string;
  href: string;
  emoji: string;
  delay?: number;
};

export default function ContactCard({
  label,
  href,
  emoji,
  delay = 0,
}: ContactCardProps) {
  const external = href.startsWith("http");
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white px-5 py-4 shadow-bento transition-shadow hover:shadow-bento-hover"
    >
      <span className="text-xl" aria-hidden>
        {emoji}
      </span>
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="ml-auto text-ink-faint" aria-hidden>
        →
      </span>
    </motion.a>
  );
}
