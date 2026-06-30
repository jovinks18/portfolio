"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  SiPython,
  SiPostgresql,
  SiMysql,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFastapi,
  SiSupabase,
  SiTailwindcss,
  SiPandas,
  SiJupyter,
  SiStreamlit,
  SiOpenai,
  SiDocker,
  SiGithub,
  SiVercel,
  SiFigma,
  SiNotion,
  SiLinear,
  SiJira,
  SiZapier,
} from "react-icons/si";

type Tool = { icon: ReactNode; color: string; label: string };

/**
 * The tools I build with — three rows of logos drifting in alternating
 * directions, looping forever. Greyscale by default, full brand color on
 * hover; hovering a row pauses it so you can read the logos.
 * Add/remove tools in ROWS below (any Simple Icons logo works).
 */
const ROWS: { duration: number; reverse?: boolean; tools: Tool[] }[] = [
  {
    duration: 38,
    tools: [
      { icon: <SiPython />, color: "#3776AB", label: "Python" },
      { icon: <SiPostgresql />, color: "#4169E1", label: "PostgreSQL / SQL" },
      { icon: <SiMysql />, color: "#4479A1", label: "MySQL" },
      { icon: <SiTypescript />, color: "#3178C6", label: "TypeScript" },
      { icon: <SiJavascript />, color: "#E8C100", label: "JavaScript" },
      { icon: <SiReact />, color: "#3Fb6D3", label: "React" },
      { icon: <SiNextdotjs />, color: "#141414", label: "Next.js" },
      { icon: <SiNodedotjs />, color: "#5FA04E", label: "Node.js" },
    ],
  },
  {
    duration: 46,
    reverse: true,
    tools: [
      { icon: <SiFastapi />, color: "#009688", label: "FastAPI" },
      { icon: <SiSupabase />, color: "#3FCF8E", label: "Supabase" },
      { icon: <SiTailwindcss />, color: "#06B6D4", label: "Tailwind CSS" },
      { icon: <SiPandas />, color: "#150458", label: "pandas" },
      { icon: <SiJupyter />, color: "#F37626", label: "Jupyter" },
      { icon: <SiStreamlit />, color: "#FF4B4B", label: "Streamlit" },
      { icon: <SiOpenai />, color: "#412991", label: "OpenAI" },
      { icon: <SiDocker />, color: "#2496ED", label: "Docker" },
    ],
  },
  {
    duration: 42,
    tools: [
      { icon: <SiGithub />, color: "#181717", label: "GitHub" },
      { icon: <SiVercel />, color: "#141414", label: "Vercel" },
      { icon: <SiFigma />, color: "#F24E1E", label: "Figma" },
      { icon: <SiNotion />, color: "#141414", label: "Notion" },
      { icon: <SiLinear />, color: "#5E6AD2", label: "Linear" },
      { icon: <SiJira />, color: "#0052CC", label: "Jira" },
      { icon: <SiZapier />, color: "#FF4F00", label: "Zapier" },
    ],
  },
];

export default function ToolMarquee() {
  return (
    <div className="marquee" aria-hidden>
      {ROWS.map((row, ri) => (
        <div key={ri} className={`mq-row${row.reverse ? " rev" : ""}`}>
          <div
            className="mq-track"
            style={{ "--dur": `${row.duration}s` } as CSSProperties}
          >
            {[...row.tools, ...row.tools].map((t, i) => (
              <span
                key={i}
                className="mq-item"
                style={{ color: t.color }}
                title={t.label}
              >
                {t.icon}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
