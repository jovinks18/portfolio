"use client";

import Link from "next/link";
import BentoCard from "./BentoCard";
import type { Tone } from "@/data/portfolioData";
import { toneSurface } from "@/lib/tones";

type ExperienceCardProps = {
  company: string;
  role: string;
  emoji: string;
  dates: string;
  summary: string;
  slug: string;
  tone: Tone;
  delay?: number;
};

export default function ExperienceCard({
  company,
  role,
  emoji,
  dates,
  summary,
  slug,
  tone,
  delay = 0,
}: ExperienceCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      aria-label={`View ${company} — ${role} experience details`}
      className="block h-full rounded-bento"
    >
      <BentoCard delay={delay} className="flex h-full flex-col p-6 sm:p-7">
        <div className="mb-4 flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-2xl ${toneSurface[tone]}`}
            aria-hidden
          >
            {emoji}
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-snug text-ink">
              {company}
            </h3>
            <p className="text-sm font-medium text-ink-soft">{role}</p>
            <p className="mt-1 text-xs tabular-nums text-ink-faint">{dates}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink-soft">{summary}</p>
        <div className="mt-auto flex items-center justify-end pt-5 text-xs font-medium text-ink-faint">
          View details <span aria-hidden className="ml-1">→</span>
        </div>
      </BentoCard>
    </Link>
  );
}
