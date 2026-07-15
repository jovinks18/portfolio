/**
 * portfolioData.ts
 * ----------------
 * Single source of truth for all site content.
 * Edit anything here — the components just render it.
 */

export type Tone = "clay" | "sage" | "butter" | "dusk" | "blush" | "neutral";

/** Landing page (the interactive ring intro at "/") */
export const intro = {
  title: "JOVIN",
  tagline: "drag · scroll · spin",
  enterLabel: "come on in →",
  skipLabel: "skip intro",
  /**
   * Images on the rings. Leave empty to auto-load warm-toned
   * placeholders; replace with your own paths later, e.g.
   * ["/ring/paris.jpg", "/ring/run.jpg", ...] (put files in /public/ring).
   * The scene uses up to 72 images (12 + 24 + 36 per ring).
   */
  images: [] as string[],
};

export const profile = {
  name: "Jovin Sivakumar",
  headline: "I work where customer problems, data, and product decisions meet.",
  subheadline:
    "CS engineer turned business graduate, now focused on customer success, product operations, BI, and AI-native workflows for early-stage teams.",
  statusChips: [
    { label: "Based in San Francisco", emoji: "📍" },
    { label: "UC Berkeley Haas", emoji: "🎓" },
    { label: "Customer Success + Ops", emoji: "🧭" },
    { label: "AI workflows", emoji: "✨" },
    { label: "Open to startup roles", emoji: "🚀" },
  ],
  links: {
    resume: "/resume.pdf", // drop your resume in /public
    linkedin: "https://www.linkedin.com/in/jovinks",
    github: "https://github.com/jovinks",
    email: "mailto:jovin.sivakumar@berkeley.edu",
  },
  currentlyExploring: [
    "AI-native CS workflows",
    "Voice-of-customer pipelines",
    "Product ops at seed-stage",
  ],
  nowPlaying: "house sets & long runs along the Embarcadero",
  cities: ["Paris", "Seoul", "Berkeley", "San Francisco"],
};

export const about = {
  title: "Personal OS",
  kicker: "about",
  intro:
    "Grew up in code, then got curious about how companies actually work. Studied across Paris, Seoul, and Berkeley. Now I'm interested in the messy middle between users, data, product, and operations.",
  cards: [
    {
      emoji: "👾",
      title: "grew up in code",
      body: "CS engineering first. I still think in systems, schemas, and edge cases.",
      tone: "dusk" as Tone,
    },
    {
      emoji: "🏢",
      title: "got curious about companies",
      body: "Why do good products still frustrate customers? Followed that question into business school.",
      tone: "butter" as Tone,
    },
    {
      emoji: "🌍",
      title: "studied across three continents",
      body: "Paris, Seoul, and Berkeley — different markets, same human problems.",
      tone: "sage" as Tone,
    },
    {
      emoji: "🔁",
      title: "now: the messy middle",
      body: "Building around customer signals, product feedback, and AI workflows.",
      tone: "clay" as Tone,
    },
  ],
};

export const experience = {
  title: "Where I've worked",
  kicker: "experience",
  items: [
    {
      company: "Legali AI",
      role: "Product & GTM",
      emoji: "⚖️",
      tone: "clay" as Tone,
      slug: "legali-ai",
      logo: "", // no logo file yet — shows a monogram. Drop one in /public/nav and set the path.
      period: "Jun 2026 – Present · Berkeley, CA",
      // `about` = what the company is + the role (shown first on the detail page)
      about:
        "Legali AI is a Berkeley SkyDeck legaltech startup building AI-powered legal support for survivors. As Product & GTM and a founder's-office partner, I own product, go-to-market, and operations across the company's AI pilots.",
      description:
        "Own product, GTM, and ops for Legali AI's AI pilots — driving onboarding and adoption, automating cross-functional handoffs, and giving the founding team a single decision surface.",
      tags: ["Product", "GTM", "Founder's Office", "Onboarding", "Automation", "AI", "Legaltech"],
      // `details` = what I did (left column on the detail page)
      details: [
        "Drove two AI pilots from first users to steady adoption — owning onboarding, activation, and the escalation path into product.",
        "Redesigned two cross-functional workflows and automated recurring handoffs in Make and n8n, routing blockers to a named internal owner instead of stalling.",
        "Ran a weekly operating review that consolidated pilot adoption, user feedback, and open risks into one decision surface for the founding team.",
        "Introduced sprint planning, ownership tracking, and automated blocker reporting across 10+ contributors.",
      ],
      // `impact` = the results (right column on the detail page)
      impact: [
        "Turned recurring customer issues into a prioritized product backlog and enablement material, giving the team a clear signal on what to build next.",
        "Cut unresolved follow-up delays 30% by redesigning handoffs so blockers routed to named owners instead of stalling.",
        "Reclaimed 15 hours/week of status chasing across 10+ contributors by automating recurring handoffs and blocker reporting with AI tooling in Make and n8n.",
        "Gave the founding team a single weekly decision surface — pilot adoption, feedback, and open risks with explicit owners — to steer where to focus next.",
      ],
    },
    {
      company: "AB InBev Europe",
      role: "Data Analyst",
      emoji: "📊",
      tone: "dusk" as Tone,
      slug: "ab-inbev",
      logo: "/nav/abinbev-logo.svg",
      period: "Feb 2025 – May 2025 · Prague, Czechia",
      about:
        "AB InBev is the world's largest brewer. As a Data Analyst on its European logistics and inventory teams in Prague, I owned the reporting that 8 teams across 6 markets relied on.",
      description:
        "Built dashboards and automated data pipelines for logistics and inventory teams across 6 European markets, replacing fragmented reporting with shared KPI visibility.",
      tags: ["Power BI", "SQL", "Python", "Excel", "KPI Dashboards", "Logistics"],
      details: [
        "Owned the Stock Age Index dashboard end to end — requirements from 8 teams, data modeling, Power BI build, and adoption across markets.",
        "Built and maintained the recurring KPI dashboards 30+ people relied on for weekly decisions.",
        "Automated the Python extraction and validation pipelines feeding those dashboards, replacing manual spreadsheet work.",
        "Interviewed 8 teams to surface reporting bottlenecks and prioritize the build roadmap.",
        "Translated stock-age risk into leadership-ready updates for the Zone Director across 6 markets.",
      ],
      impact: [
        "Cut 20+ hours of manual reporting per month across 8 teams.",
        "Reduced manual data fixes 50% via automated extraction and validation.",
        "Improved on-time delivery 35% by targeting the highest-impact bottlenecks.",
        "Delivered shared KPI visibility to 30+ users across 6 markets.",
      ],
    },
    {
      company: "Maki People",
      role: "Customer Success",
      emoji: "🤝",
      tone: "sage" as Tone,
      slug: "maki-people",
      logo: "/nav/maki-logo.svg",
      period: "Jul 2024 – Jan 2025 · Paris, France",
      about:
        "Maki People is a pre–Series A HR-tech SaaS that helps companies assess and hire talent. As a Customer Success Intern in Paris, I owned the full post-sale lifecycle for 7 enterprise accounts, partnering directly with HR and Talent leaders.",
      description:
        "Owned the full post-sale lifecycle — onboarding, activation, retention, expansion — for 7 enterprise accounts at a pre–Series A HR-tech SaaS.",
      tags: ["Customer Success", "Onboarding", "Activation", "Retention", "Voice of Customer", "HR Tech"],
      details: [
        "Owned onboarding, activation, retention, and expansion for 7 enterprise accounts through go-live.",
        "Mapped the activation flow to pinpoint where new customers dropped off in the onboarding handoff.",
        "Ran a weekly Product & Engineering cadence to unblock customers and trained 20+ end users.",
        "Ran weekly Voice-of-Customer reviews as first point of contact for urgent product issues.",
        "Built onboarding playbooks, FAQ libraries, and account case studies adopted as company standard.",
      ],
      impact: [
        "Raised NPS 25% by diagnosing a 30% onboarding drop-off and driving prioritized fixes.",
        "Held 95% on-time go-live across accounts.",
        "Trained 20+ end users to accelerate activation.",
        "Cut repeat coordination company-wide with playbooks adopted as standard.",
      ],
    },
    {
      company: "Zolostays",
      role: "Product Intern",
      emoji: "🏠",
      tone: "blush" as Tone,
      slug: "zolostays",
      logo: "", // no logo file yet — shows a monogram. Drop one in /public/nav and set the path.
      period: "Oct 2021 – Mar 2022 · Bengaluru, India",
      about:
        "Zolostays is one of India's largest managed co-living marketplaces. As a Product Intern in Bengaluru, I worked on product discovery across the discovery-to-booking journey.",
      description:
        "Mapped the discovery-to-booking journey across users, properties, and cities at a managed co-living marketplace, focusing on conversion friction and resident feedback.",
      tags: ["Product Discovery", "Marketplace Ops", "User Research", "Journey Mapping"],
      details: [
        "Mapped the discovery-to-booking journey across users, properties, and cities.",
        "Investigated conversion friction at each step of the funnel, from search to booking.",
        "Synthesized resident feedback into actionable product-discovery insights.",
      ],
      impact: [
        "Audited the full discovery-to-booking funnel and flagged the top 3 conversion blockers, giving the product team a prioritized fix list.",
        "Synthesized 20+ pieces of resident feedback into a ranked discovery backlog the team could act on.",
      ],
    },
  ],
};

/* PROJECT STRUCTURE — each card reads as: what it is (description) →
   the outcome (impact) → the stack (tools) → links (github / live).
   `impact` is the one line recruiters scan for. `github` is the repo;
   leave `live` empty if there's no deployed demo. */
export const projects = {
  title: "Things I've built",
  kicker: "projects",
  // NOTE: github URLs are best-guess slugs under your username — verify each
  // links to the right repo (search "EDIT" / fix the username if it's not
  // "jovinsivakumar"). Add `live:` if a project has a deployed demo.
  items: [
    {
      name: "Linea",
      emoji: "🛰️",
      tone: "dusk" as Tone,
      description:
        "An open-source AI post-sales command center that turns customer conversations into support cases, onboarding tasks, product signals, and account-health updates.",
      impact: "Safe-by-design: models only propose validated, structured plans; deterministic code executes via a transaction-safe action log.",
      tools: ["Next.js", "TypeScript", "PostgreSQL", "Ollama", "n8n"],
      github: "https://github.com/jovinks/linea", // EDIT
      live: "",
    },
    {
      name: "RavenStack CS Analysis",
      emoji: "📊",
      tone: "clay" as Tone,
      description:
        "A Customer Success operating framework on synthetic B2B SaaS churn data — exec summary, health framework, a real QBR deck, and a CS operating-model recommendation.",
      impact: "Found 85% of churned ARR was product/pricing-driven and a 79% reactivation rate was the most underused signal.",
      tools: ["Python", "pandas", "Jupyter"],
      github: "https://github.com/jovinks/ravenstack-cs", // EDIT
      live: "",
    },
    {
      name: "LocalOps Agent Swarm",
      emoji: "🤖",
      tone: "sage" as Tone,
      description:
        "An offline, fully-local autonomous agent engine that turns plain-English goals into native OS commands and Python, run in a sandboxed subprocess with a guardrail timeout.",
      impact: "Planner/executor multi-agent split with type-safe execution plans and runtime safety boundaries — no cloud, no token cost.",
      tools: ["FastAPI", "Streamlit", "Ollama", "Qwen 2.5", "Llama 3.2"],
      github: "https://github.com/jovinks/localops-agent-swarm", // EDIT
      live: "",
    },
    {
      name: "vocal-pantry",
      emoji: "🍽️",
      tone: "butter" as Tone,
      description:
        "A voice-forward conversational AI for restaurant discovery and table booking in SF, with a full Whisper-in / OpenAI-TTS-out voice loop and a live agent-trace panel.",
      impact: "Two-pass function-calling pipeline with anti-hallucination guardrails, framed around conversion and time-to-book.",
      tools: ["GPT-4o", "FastAPI", "Streamlit", "Whisper"],
      github: "https://github.com/jovinks/vocal-pantry", // EDIT
      live: "",
    },
    {
      name: "VisionAudit AI",
      emoji: "🔍",
      tone: "dusk" as Tone,
      description:
        "An automated industrial visual QA system using GPT-4o Vision to detect product defects, score confidence, categorize risk, and output structured JSON reports for ERP use.",
      impact: "Replaces fatigue-prone manual inspection with objective analysis and confidence thresholds that decide when a human is needed.",
      tools: ["GPT-4o Vision", "Python", "Streamlit"],
      github: "https://github.com/jovinks/visionaudit-ai", // EDIT
      live: "",
    },
    {
      name: "UniMeet",
      emoji: "🎓",
      tone: "blush" as Tone,
      description:
        "A campus social app with 'free to hang out' status, live presence, bidirectional friendships, AI-generated event descriptions, squads, and events.",
      impact: "Bridges 'I'm free' and 'let's hang out' — built on Supabase auth + row-level security and real-time presence.",
      tools: ["React", "TypeScript", "Vite", "Supabase", "OpenAI"],
      github: "https://github.com/jovinks/unimeet", // EDIT
      live: "",
    },
    {
      name: "minify-context (mcx)",
      emoji: "🗜️",
      tone: "sage" as Tone,
      description:
        "A zero-dependency Node.js CLI that compresses JSON, logs, and code before pasting into LLM context windows — ~60%+ token savings while preserving schema shape.",
      impact: "Structure-preserving compression (custom JSON walker, comment stripping) to cut token cost and prevent context dilution.",
      tools: ["Node.js", "ES Modules"],
      github: "https://github.com/jovinks/minify-context", // EDIT
      live: "",
    },
    {
      name: "local-schema-compiler",
      emoji: "🧩",
      tone: "clay" as Tone,
      description:
        "An offline structured-data extraction engine that turns messy text — chat logs, resumes, emails — into schema-validated JSON, entirely locally.",
      impact: "Schema-validated outputs with Instructor + Pydantic and 100% data privacy, with zero cloud token cost.",
      tools: ["FastAPI", "Streamlit", "Instructor", "Pydantic", "Ollama"],
      github: "https://github.com/jovinks/local-schema-compiler", // EDIT
      live: "",
    },
    {
      name: "vocal-mind",
      emoji: "🎙️",
      tone: "butter" as Tone,
      description:
        "A voice-memo app that turns raw audio into structured intelligence — categorizing, summarizing, and assessing the urgency of spoken notes.",
      impact: "Web Audio capture + OpenAI JSON mode for reliable structured output.",
      tools: ["Next.js", "GPT-4o-mini", "Web Audio API", "Tailwind"],
      github: "https://github.com/jovinks/vocal-mind", // EDIT
      live: "",
    },
    {
      name: "my-dash",
      emoji: "🪟",
      tone: "dusk" as Tone,
      description:
        "A minimalist personal productivity dashboard that centralizes key metrics and quick-actions to reduce tab clutter.",
      impact: "A single high-focus control center with a glassmorphism aesthetic.",
      tools: ["Next.js", "React", "CSS Modules"],
      github: "https://github.com/jovinks/my-dash", // EDIT
      live: "",
    },
  ],
};

/* Cinematic Education panel. Logos load from Clearbit's logo service by
   domain; if a logo fails to load, the school name shows instead. To use
   your own logo, drop a file in /public and point `logo` at it (e.g.
   "/logos/berkeley.png"). */
export const educationCards = [
  {
    school: "UC Berkeley Haas",
    classYear: "Class of '26",
    logo: "/nav/Berkeley_Haas_wordmark.svg.png",
  },
  {
    school: "Sungkyunkwan GSB",
    classYear: "Class of '25",
    logo: "/nav/skku.jpeg",
  },
  {
    school: "EDHEC Business School",
    classYear: "Class of '26",
    logo: "/nav/Logo-EDHEC-1.png",
  },
];

export const tools = {
  title: "The toolbox",
  kicker: "tools & stack",
  blurb: "The stuff open in my tabs on any given Tuesday.",
  groups: [
    {
      label: "Data & BI",
      emoji: "📈",
      tone: "dusk" as Tone,
      items: ["SQL", "Python", "Power BI", "Tableau", "Excel", "Looker Studio"],
    },
    {
      label: "Customer & Ops",
      emoji: "🧭",
      tone: "clay" as Tone,
      items: ["Intercom", "HubSpot", "Notion", "Jira", "Linear"],
    },
    {
      label: "AI & Automation",
      emoji: "✨",
      tone: "butter" as Tone,
      items: [
        "Claude",
        "ChatGPT",
        "n8n",
        "Zapier",
        "Power Automate",
        "Cursor",
        "LLM workflows",
      ],
    },
    {
      label: "Product & Design",
      emoji: "🖍️",
      tone: "blush" as Tone,
      items: ["Figma", "Miro", "Canva", "Gamma", "Framer"],
    },
    {
      label: "Engineering-lite",
      emoji: "🔧",
      tone: "sage" as Tone,
      items: ["GitHub", "REST APIs", "JSON", "FastAPI", "Docker"],
    },
  ],
};

export const notes = {
  title: "Notes to self",
  kicker: "learnings",
  items: [
    {
      text: "Customer feedback is only useful when it becomes a product or process decision.",
      tone: "clay" as Tone,
    },
    {
      text: "Good operations are invisible when they work.",
      tone: "sage" as Tone,
    },
    {
      text: "The best dashboards reduce follow-up, not just reporting time.",
      tone: "dusk" as Tone,
    },
    {
      text: "AI tools are most useful when they remove repeated coordination work.",
      tone: "butter" as Tone,
    },
    {
      text: "I like roles where ambiguity turns into structure.",
      tone: "blush" as Tone,
    },
  ],
};

export const personal = {
  title: "Away from the dashboard",
  kicker: "offline",
  items: [
    { emoji: "🏃", label: "Running", note: "long & slow, ideally near water" },
    { emoji: "🌸", label: "Perfumery", note: "amber accords, niche houses" },
    { emoji: "⚪", label: "Real Madrid", note: "hala madrid, no notes" },
    { emoji: "🍳", label: "Cooking", note: "mise en place is just ops" },
    { emoji: "🎧", label: "House music", note: "deep, melodic, 122 bpm" },
    { emoji: "🗺️", label: "System design", note: "I diagram for fun, sorry" },
  ],
  citiesCard: {
    title: "Cities I've lived & studied in",
    cities: [
      { name: "Paris", flag: "🇫🇷", note: "EDHEC" },
      { name: "Seoul", flag: "🇰🇷", note: "SKKU" },
      { name: "Berkeley", flag: "🇺🇸", note: "Haas" },
      { name: "San Francisco", flag: "🌉", note: "now" },
    ],
  },
};

export const education = {
  title: "Education",
  kicker: "the study map",
  items: [
    {
      school: "UC Berkeley Haas",
      degree: "Master's, Global Economic Transformation & Technology",
      location: "Berkeley, USA",
      flag: "🇺🇸",
      tone: "butter" as Tone,
    },
    {
      school: "EDHEC Business School",
      degree: "Master in Management",
      location: "Paris, France",
      flag: "🇫🇷",
      tone: "dusk" as Tone,
    },
    {
      school: "SKKU GSB",
      degree: "Global Business",
      location: "Seoul, South Korea",
      flag: "🇰🇷",
      tone: "blush" as Tone,
    },
    {
      school: "B.E. Computer Science",
      degree: "Bachelor's in Computer Science Engineering",
      location: "India",
      flag: "🇮🇳",
      tone: "sage" as Tone,
    },
  ],
};

export const contact = {
  title: "Say hi",
  kicker: "contact",
  message:
    "Currently exploring customer success, operations, and AI startup roles in San Francisco. Happy to chat about customer problems, workflows, product ops, and early-stage teams.",
  links: [
    { label: "Email", href: "mailto:jovin.sivakumar@berkeley.edu", emoji: "✉️" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jovinks",
      emoji: "💼",
    },
    { label: "GitHub", href: "https://github.com/jovinks", emoji: "🐙" },
    { label: "Instagram", href: "https://www.instagram.com/jooficiel18/", emoji: "📷" },
    { label: "Resume", href: "/resume.pdf", emoji: "📄" },
  ],
};
