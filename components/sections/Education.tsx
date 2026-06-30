"use client";

import BentoCard from "@/components/BentoCard";
import SectionHeader from "@/components/SectionHeader";
import { education } from "@/data/portfolioData";
import { toneSurface } from "@/lib/tones";

export default function Education() {
  return (
    <section id="education">
      <SectionHeader kicker={education.kicker} title={education.title} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {education.items.map((item, i) => (
          <BentoCard key={item.school} delay={i * 0.07} className="p-6">
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-lg ${toneSurface[item.tone]}`}
              aria-hidden
            >
              {item.flag}
            </div>
            <h3 className="font-display text-sm font-semibold text-ink">
              {item.school}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {item.degree}
            </p>
            <p className="mt-2 text-xs text-ink-faint">{item.location}</p>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
