"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  SiReact,
  SiPython,
  SiTypescript,
  SiOpenai,
  SiFastapi,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiSupabase,
  SiFigma,
  SiPandas,
  SiStreamlit,
} from "react-icons/si";

type Tool = { icon: ReactNode; color: string; label: string };

/**
 * The tools I build with, orbiting like electrons around a nucleus.
 * Concentric rings spin at different speeds/directions; each icon
 * counter-rotates so it always stays upright. Real brand colors.
 * Edit the rings below to add/remove tools.
 */
const RINGS: { radius: number; duration: number; reverse?: boolean; tools: Tool[] }[] = [
  {
    radius: 60,
    duration: 24,
    tools: [
      { icon: <SiReact />, color: "#61DAFB", label: "React" },
      { icon: <SiPython />, color: "#3776AB", label: "Python" },
      { icon: <SiTypescript />, color: "#3178C6", label: "TypeScript" },
    ],
  },
  {
    radius: 110,
    duration: 40,
    reverse: true,
    tools: [
      { icon: <SiOpenai />, color: "#412991", label: "OpenAI" },
      { icon: <SiFastapi />, color: "#009688", label: "FastAPI" },
      { icon: <SiPostgresql />, color: "#4169E1", label: "PostgreSQL" },
      { icon: <SiTailwindcss />, color: "#06B6D4", label: "Tailwind" },
    ],
  },
  {
    radius: 162,
    duration: 56,
    tools: [
      { icon: <SiNextdotjs />, color: "#141414", label: "Next.js" },
      { icon: <SiSupabase />, color: "#3FCF8E", label: "Supabase" },
      { icon: <SiFigma />, color: "#F24E1E", label: "Figma" },
      { icon: <SiPandas />, color: "#150458", label: "pandas" },
      { icon: <SiStreamlit />, color: "#FF4B4B", label: "Streamlit" },
    ],
  },
];

export default function ToolAtoms() {
  return (
    <div className="atom" aria-hidden>
      <span className="nucleus" />
      {RINGS.map((ring, ri) => (
        <div
          key={ri}
          className={`ring${ring.reverse ? " rev" : ""}`}
          style={
            {
              width: ring.radius * 2,
              height: ring.radius * 2,
              "--dur": `${ring.duration}s`,
            } as CSSProperties
          }
        >
          {ring.tools.map((t, i) => {
            const angle = (360 / ring.tools.length) * i;
            return (
              <div
                key={t.label}
                className="spoke"
                style={{ transform: `rotate(${angle}deg) translateY(-${ring.radius}px)` }}
              >
                <div className="upright">
                  <div className="tilt" style={{ transform: `rotate(${-angle}deg)` }}>
                    <span className="tool" style={{ color: t.color }} title={t.label}>
                      {t.icon}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
