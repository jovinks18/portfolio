"use client";

import SectionHeader from "@/components/SectionHeader";
import ExperienceCard from "@/components/ExperienceCard";
import { experience } from "@/data/portfolioData";

export default function Experience() {
  return (
    <section id="experience">
      <SectionHeader kicker={experience.kicker} title={experience.title} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {experience.items.map((item, i) => (
          <ExperienceCard key={item.company} {...item} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
