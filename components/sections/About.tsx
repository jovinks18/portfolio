"use client";

import BentoCard from "@/components/BentoCard";
import SectionHeader from "@/components/SectionHeader";
import { about } from "@/data/portfolioData";
import { toneSurface } from "@/lib/tones";

export default function About() {
  return (
    <section id="about">
      <SectionHeader
        kicker={about.kicker}
        title={about.title}
        blurb={about.intro}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.cards.map((card, i) => (
          <BentoCard key={card.title} delay={i * 0.08} className="p-6">
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${toneSurface[card.tone]}`}
              aria-hidden
            >
              {card.emoji}
            </div>
            <h3 className="mb-1.5 font-display text-base font-semibold text-ink">
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-soft">{card.body}</p>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
