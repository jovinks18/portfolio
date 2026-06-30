"use client";

import BentoCard from "@/components/BentoCard";
import Badge from "@/components/Badge";
import { profile } from "@/data/portfolioData";

const buttons = [
  { label: "Resume", href: profile.links.resume, primary: true },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Email", href: profile.links.email },
];

export default function Hero() {
  return (
    <section id="hero" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Big intro card */}
      <BentoCard className="p-7 sm:col-span-2 sm:p-9 lg:col-span-3 lg:row-span-2">
        <p className="mb-4 text-sm text-ink-faint">
          hi, I&apos;m{" "}
          <span className="font-medium text-ink">{profile.name}</span> 👋
        </p>
        <h1 className="mb-4 max-w-2xl font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
          {profile.headline}
        </h1>
        <p className="mb-7 max-w-xl text-base leading-relaxed text-ink-soft">
          {profile.subheadline}
        </p>
        <div className="mb-7 flex flex-wrap gap-2">
          {profile.statusChips.map((chip, i) => (
            <Badge
              key={chip.label}
              emoji={chip.emoji}
              interactive
              tone={(["clay", "sage", "butter", "dusk", "blush"] as const)[i % 5]}
            >
              {chip.label}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {buttons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target={btn.href.startsWith("http") ? "_blank" : undefined}
              rel={
                btn.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className={
                btn.primary
                  ? "rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream-50 transition-transform hover:-translate-y-0.5"
                  : "rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-ink/20"
              }
            >
              {btn.label}
            </a>
          ))}
        </div>
      </BentoCard>

      {/* Status card */}
      <BentoCard delay={0.1} className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-faint">
            status
          </p>
        </div>
        <p className="font-display text-base font-semibold text-ink">
          Open to startup roles
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          CS, ops, BI & AI workflows · San Francisco
        </p>
      </BentoCard>

      {/* Currently exploring */}
      <BentoCard delay={0.18} className="p-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-ink-faint">
          currently exploring
        </p>
        <ul className="space-y-2">
          {profile.currentlyExploring.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-ink-soft"
            >
              <span className="text-clay" aria-hidden>
                ↳
              </span>
              {item}
            </li>
          ))}
        </ul>
      </BentoCard>

      {/* Small playful cards */}
      <BentoCard delay={0.24} className="bg-butter-soft/50 p-6 lg:col-span-1">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-ink-faint">
          off duty
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">
          Usually found with {profile.nowPlaying}. 🎧
        </p>
      </BentoCard>

      <BentoCard delay={0.3} className="bg-dusk-soft/50 p-6 lg:col-span-2">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-ink-faint">
          cities on my passport
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.cities.map((city) => (
            <Badge key={city} interactive>
              {city}
            </Badge>
          ))}
        </div>
      </BentoCard>

      <BentoCard delay={0.36} className="bg-sage-soft/50 p-6 lg:col-span-1">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-ink-faint">
          operating principle
        </p>
        <p className="font-display text-sm leading-relaxed text-ink">
          Ambiguity in, structure out.
        </p>
      </BentoCard>
    </section>
  );
}
