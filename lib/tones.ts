import type { Tone } from "@/data/portfolioData";

/** Soft pastel surface + accent text per tone. */
export const toneSurface: Record<Tone, string> = {
  clay: "bg-clay-soft/60",
  sage: "bg-sage-soft/60",
  butter: "bg-butter-soft/60",
  dusk: "bg-dusk-soft/60",
  blush: "bg-blush-soft/60",
  neutral: "bg-white",
};

export const toneAccent: Record<Tone, string> = {
  clay: "text-clay",
  sage: "text-sage",
  butter: "text-butter",
  dusk: "text-dusk",
  blush: "text-blush",
  neutral: "text-ink-soft",
};

export const toneChip: Record<Tone, string> = {
  clay: "bg-clay-soft text-ink",
  sage: "bg-sage-soft text-ink",
  butter: "bg-butter-soft text-ink",
  dusk: "bg-dusk-soft text-ink",
  blush: "bg-blush-soft text-ink",
  neutral: "bg-cream-100 text-ink-soft",
};
