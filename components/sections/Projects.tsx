"use client";

import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/portfolioData";

export default function Projects() {
  return (
    <section id="projects">
      <SectionHeader kicker={projects.kicker} title={projects.title} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.items.map((item, i) => (
          <ProjectCard key={item.name} {...item} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
