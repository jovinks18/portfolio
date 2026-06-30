"use client";

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import BentoCard from "./BentoCard";
import Badge from "./Badge";
import type { Tone } from "@/data/portfolioData";
import { toneSurface } from "@/lib/tones";

type ProjectCardProps = {
  name: string;
  emoji: string;
  description: string;
  impact?: string;
  tools: string[];
  github?: string;
  live?: string;
  tone: Tone;
  delay?: number;
};

export default function ProjectCard({
  name,
  emoji,
  description,
  impact,
  tools,
  github,
  live,
  tone,
  delay = 0,
}: ProjectCardProps) {
  return (
    <BentoCard delay={delay} className="flex flex-col p-6 sm:p-7">
      <div className="mb-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${toneSurface[tone]}`}
          aria-hidden
        >
          {emoji}
        </div>
      </div>

      <h3 className="mb-1.5 font-display text-lg font-semibold text-ink">
        {name}
      </h3>
      <p className="mb-3 text-sm leading-relaxed text-ink-soft">{description}</p>

      {impact && (
        <p className="mb-5 flex items-start gap-2 text-sm font-medium text-ink">
          <span aria-hidden className="text-sage">
            →
          </span>
          {impact}
        </p>
      )}

      <div className="mb-5 flex flex-wrap gap-1.5">
        {tools.map((tool) => (
          <Badge key={tool} tone={tone}>
            {tool}
          </Badge>
        ))}
      </div>

      {/* Always-visible action buttons */}
      <div className="mt-auto flex flex-wrap gap-2">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-ink/20"
          >
            <FaGithub aria-hidden /> Code
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-cream-50 transition-transform hover:-translate-y-0.5"
          >
            <FaExternalLinkAlt aria-hidden /> Live demo
          </a>
        )}
      </div>
    </BentoCard>
  );
}
