"use client";

import BentoCard from "./BentoCard";
import Badge from "./Badge";
import type { Tone } from "@/data/portfolioData";
import { toneSurface } from "@/lib/tones";

type ExperienceCardProps = {
  company: string;
  role: string;
  emoji: string;
  description: string;
  tags: string[];
  tone: Tone;
  delay?: number;
};

export default function ExperienceCard({
  company,
  role,
  emoji,
  description,
  tags,
  tone,
  delay = 0,
}: ExperienceCardProps) {
  return (
    <BentoCard delay={delay} className="flex flex-col p-6 sm:p-7">
      <div className="mb-4 flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-2xl ${toneSurface[tone]}`}
          aria-hidden
        >
          {emoji}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug text-ink">
            {company}
          </h3>
          <p className="text-sm text-ink-soft">{role}</p>
        </div>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-ink-soft">
        {description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} tone={tone}>
            {tag}
          </Badge>
        ))}
      </div>
    </BentoCard>
  );
}
