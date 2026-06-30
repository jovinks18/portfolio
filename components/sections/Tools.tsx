"use client";

import BentoCard from "@/components/BentoCard";
import SectionHeader from "@/components/SectionHeader";
import Badge from "@/components/Badge";
import { tools } from "@/data/portfolioData";
import { toneSurface } from "@/lib/tones";

export default function Tools() {
  return (
    <section id="tools">
      <SectionHeader
        kicker={tools.kicker}
        title={tools.title}
        blurb={tools.blurb}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.groups.map((group, i) => (
          <BentoCard
            key={group.label}
            delay={i * 0.07}
            className={`p-6 ${i === tools.groups.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${toneSurface[group.tone]}`}
                aria-hidden
              >
                {group.emoji}
              </div>
              <h3 className="font-display text-base font-semibold text-ink">
                {group.label}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge key={item} tone={group.tone} interactive>
                  {item}
                </Badge>
              ))}
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
