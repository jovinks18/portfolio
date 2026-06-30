"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolioData";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/**
 * Slim sticky top nav. Replaces the old full-screen menu gate so
 * visitors see content immediately and can jump anywhere in one click.
 */
export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-ink/[0.06] bg-cream-50/80 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#hero"
          className="font-display text-base font-semibold text-ink"
        >
          {profile.name}
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={profile.links.resume}
          className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-cream-50 transition-transform hover:-translate-y-0.5"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
