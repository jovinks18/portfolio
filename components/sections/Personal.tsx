"use client";

import BentoCard from "@/components/BentoCard";
import SectionHeader from "@/components/SectionHeader";
import { personal } from "@/data/portfolioData";

export default function Personal() {
  return (
    <section id="personal">
      <SectionHeader kicker={personal.kicker} title={personal.title} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {personal.items.map((item, i) => (
          <BentoCard key={item.label} delay={i * 0.06} className="p-6">
            <span className="mb-2 block text-2xl" aria-hidden>
              {item.emoji}
            </span>
            <h3 className="font-display text-sm font-semibold text-ink">
              {item.label}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-faint">
              {item.note}
            </p>
          </BentoCard>
        ))}

        {/* Cities card spans wider — a little study-map */}
        <BentoCard
          delay={0.4}
          className="col-span-2 p-6 sm:col-span-3 lg:col-span-2"
        >
          <h3 className="mb-4 font-display text-sm font-semibold text-ink">
            {personal.citiesCard.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {personal.citiesCard.cities.map((city, i) => (
              <span key={city.name} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-bento">
                  <span aria-hidden>{city.flag}</span>
                  {city.name}
                  <span className="text-ink-faint">· {city.note}</span>
                </span>
                {i < personal.citiesCard.cities.length - 1 && (
                  <span className="text-ink-faint" aria-hidden>
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
