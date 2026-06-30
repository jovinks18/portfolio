"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons";

// ── Nav rows ────────────────────────────────────────────────────────

const navItems: { index: string; label: string; sub: string; href: string }[] = [
  { index: "01", label: "Education", sub: "3 schools · 3 continents", href: "#education" },
  { index: "02", label: "Experience", sub: "SaaS · BI · product ops", href: "#experience" },
  { index: "03", label: "Projects", sub: "things I've shipped", href: "#projects" },
  { index: "04", label: "My Thoughts", sub: "field notes", href: "#notes" },
  { index: "05", label: "Socials", sub: "let's talk", href: "#contact" },
];

// ── Floating previews ────────────────────────────────────────────────
// Each is its own small floating piece, tagged with the nav row it lights
// up with (`row`). Several can share a row, floating independently nearby.
// Drop your own image in /public/nav and point `src` at it.

type FloatContent =
  | { kind: "image"; src: string; fit?: "cover" | "contain" }
  | { kind: "portrait"; src: string; text: string; author: string }
  | { kind: "logo"; src: string; label: string }
  | { kind: "icon"; Icon: IconType; label: string; color: string };

type FloatItem = {
  row: number;
  content: FloatContent;
  className: string;
  rotate: number;
  duration: number;
};

const floatItems: FloatItem[] = [
  {
    row: 0, // Education
    content: { kind: "image", src: "/nav/education.jpg", fit: "contain" },
    className: "left-[4%] top-[8%]",
    rotate: -4,
    duration: 7,
  },
  {
    row: 1, // Experience — Maki
    content: { kind: "logo", src: "/nav/maki-logo.svg", label: "Maki People" },
    className: "right-[4%] top-[8%]",
    rotate: 3,
    duration: 8,
  },
  {
    row: 1, // Experience — AB InBev
    content: { kind: "logo", src: "/nav/abinbev-logo.svg", label: "AB InBev Europe" },
    className: "right-[13%] top-[21%]",
    rotate: -2,
    duration: 8.6,
  },
  {
    row: 2, // Projects — code
    content: { kind: "image", src: "/nav/project-code.jpg" },
    className: "left-[4%] bottom-[28%]",
    rotate: 5,
    duration: 9,
  },
  {
    row: 2, // Projects — metrics
    content: { kind: "image", src: "/nav/project-metrics.jpg" },
    className: "left-[14%] bottom-[12%]",
    rotate: -3,
    duration: 7.8,
  },
  {
    row: 3, // My Thoughts
    content: {
      kind: "portrait",
      src: "/nav/marcus-aurelius.jpg",
      text: "You have power over your mind, not outside events.",
      author: "Marcus Aurelius",
    },
    className: "left-[2%] top-[46%]",
    rotate: -3,
    duration: 7.5,
  },
  {
    row: 4, // Socials — Instagram
    content: { kind: "icon", Icon: FaInstagram, label: "Instagram", color: "#E1306C" },
    className: "right-[3%] bottom-[10%]",
    rotate: 2,
    duration: 8.2,
  },
  {
    row: 4, // Socials — LinkedIn
    content: { kind: "icon", Icon: FaLinkedin, label: "LinkedIn", color: "#0A66C2" },
    className: "right-[12%] bottom-[23%]",
    rotate: -4,
    duration: 9.2,
  },
  {
    row: 4, // Socials — GitHub
    content: { kind: "icon", Icon: FaGithub, label: "GitHub", color: "#ffffff" },
    className: "right-[20%] bottom-[6%]",
    rotate: 4,
    duration: 7.2,
  },
];

function FloatContentView({ content }: { content: FloatContent }) {
  if (content.kind === "image") {
    return (
      <div className="flex h-24 w-36 items-center justify-center bg-[#1A1A1A]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.src}
          alt=""
          className={
            content.fit === "contain"
              ? "max-h-full max-w-full object-contain"
              : "h-full w-full object-cover"
          }
          draggable={false}
        />
      </div>
    );
  }

  if (content.kind === "portrait") {
    return (
      <div className="flex h-28 w-48 overflow-hidden bg-[#1A1A1A]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.src}
          alt=""
          className="h-full w-16 shrink-0 object-cover"
          draggable={false}
        />
        <div className="flex flex-col justify-center gap-1 px-3">
          <p className="font-display text-[11px] italic leading-snug text-white/85">
            “{content.text}”
          </p>
          <p className="text-[9px] uppercase tracking-[0.15em] text-white/40">
            — {content.author}
          </p>
        </div>
      </div>
    );
  }

  if (content.kind === "logo") {
    return (
      <div className="flex h-12 items-center gap-2 rounded-xl bg-[#1A1A1A] px-3 py-2">
        <div className="flex h-6 items-center rounded-md bg-white px-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.src} alt="" className="h-3.5 object-contain" draggable={false} />
        </div>
        <span className="whitespace-nowrap text-[11px] font-medium text-white/85">
          {content.label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-12 items-center gap-2 rounded-xl bg-[#1A1A1A] px-3 py-2">
      <content.Icon className="text-base" style={{ color: content.color }} />
      <span className="whitespace-nowrap text-[11px] font-medium text-white/85">
        {content.label}
      </span>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────

export default function NavIndex() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex h-screen flex-col items-center justify-center bg-neutral-950"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Ambient floating previews — always visible around the card on
          desktop, gently bobbing; the ones matching a hovered row light up */}
      {floatItems.map((item, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute z-0 hidden overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] lg:block ${item.className}`}
          animate={{
            opacity: hoveredIndex === item.row ? 1 : 0.55,
            scale: hoveredIndex === item.row ? 1.08 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [item.rotate, item.rotate + 3, item.rotate],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FloatContentView content={item.content} />
          </motion.div>
        </motion.div>
      ))}

      {/* Charcoal card */}
      <div className="relative z-10 mx-5 w-full max-w-3xl rounded-3xl border border-white/[0.07] bg-[#1A1A1A] px-8 py-10 shadow-2xl sm:px-12 sm:py-12">

        {/* Top label */}
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.22em] text-white/30">
          Jovin Sivakumar · Portfolio
        </p>

        {/* Nav rows */}
        <nav>
          {navItems.map((item, i) => {
            const active = hoveredIndex === i;
            return (
              <motion.button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                onMouseEnter={() => setHoveredIndex(i)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative flex w-full items-center justify-between border-t border-white/[0.08] py-6 text-left sm:py-7"
              >
                {active && (
                  <motion.div
                    layoutId="nav-row-highlight"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    className="absolute inset-0 -mx-2 rounded-xl bg-white/[0.04]"
                  />
                )}

                <div className="relative flex items-baseline gap-5 sm:gap-7">
                  <motion.span
                    animate={{
                      color: active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
                      scale: active ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-5 shrink-0 text-xs font-medium tabular-nums"
                  >
                    {item.index}
                  </motion.span>
                  <motion.span
                    animate={{ x: active ? -8 : 0 }}
                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="font-display text-3xl font-medium text-white/90 sm:text-[2.75rem] sm:leading-tight"
                  >
                    {item.label}
                  </motion.span>
                </div>

                <div className="relative flex items-center gap-3">
                  <motion.span
                    animate={{ x: active ? 5 : 0, opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="hidden text-sm text-white/40 sm:block"
                  >
                    {item.sub}
                  </motion.span>
                  <motion.span
                    animate={{ x: active ? 4 : 0, rotate: active ? 0 : -8, opacity: active ? 1 : 0.6 }}
                    transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="text-sm text-white/30"
                  >
                    →
                  </motion.span>
                </div>
              </motion.button>
            );
          })}
          <div className="border-t border-white/[0.08]" />
        </nav>
      </div>

      {/* Full view button */}
      <button
        onClick={() => scrollTo("#hero")}
        className="absolute bottom-8 right-8 z-10 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/40 transition-all hover:border-white/30 hover:text-white/70 sm:right-12"
      >
        full view ↓
      </button>

    </section>
  );
}
