"use client";

import { useEffect, useRef, useState, type SyntheticEvent, type ReactNode } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaInstagram, FaRegFileLines } from "react-icons/fa6";

/** Brand icon for each Connect link, keyed by its label. */
const contactIcon: Record<string, ReactNode> = {
  Email: <FaEnvelope aria-hidden />,
  LinkedIn: <FaLinkedinIn aria-hidden />,
  GitHub: <FaGithub aria-hidden />,
  Instagram: <FaInstagram aria-hidden />,
  Resume: <FaRegFileLines aria-hidden />,
};

/**
 * Quiet "someone opened my resume" ping. Anonymous — just a heads-up with a
 * timestamp, where they came from, and their device.
 *
 * SETUP (one step): go to https://web3forms.com, enter your email to get a
 * free Access Key, and paste it below. Until you do, this does nothing and
 * the resume still opens normally.
 */
const RESUME_NOTIFY_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // EDIT
function pingResumeOpen() {
  if (!RESUME_NOTIFY_KEY || RESUME_NOTIFY_KEY.startsWith("YOUR_")) return;
  try {
    const fd = new FormData();
    fd.append("access_key", RESUME_NOTIFY_KEY);
    fd.append("subject", "👀 Someone opened your resume");
    fd.append("from_name", "Portfolio");
    fd.append(
      "message",
      `Resume opened: ${new Date().toLocaleString()}\n` +
        `Came from: ${document.referrer || "direct / unknown"}\n` +
        `Device: ${navigator.userAgent}`
    );
    navigator.sendBeacon?.("https://api.web3forms.com/submit", fd);
  } catch {
    /* never block the resume from opening */
  }
}
import { profile, experience, projects, contact, educationCards } from "@/data/portfolioData";
import ToolMarquee from "./ToolMarquee";

/**
 * Image sources — chiaroscuro: dark Baroque paintings (public domain, Wikimedia).
 * Each has a grayscale fallback so a panel is never blank. Swap any `src` for
 * your own image later (local /public path or a URL).
 */
const wm = (file: string, w: number) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;

const IMAGES = {
  city: {
    // Caravaggio — The Calling of Saint Matthew (wide, dramatic)
    src: wm("The Calling of Saint Matthew-Caravaggo (1599-1600).jpg", 2000),
    fallback: "https://picsum.photos/seed/jovin-entry/1920/1080?grayscale",
  },
  about: {
    // Caravaggio — Saint Jerome Writing (the scholar)
    src: wm("Saint Jerome Writing-Caravaggio (1605-6).jpg", 1100),
    fallback: "https://picsum.photos/seed/jovin-jerome/800/1000?grayscale",
  },
  work: {
    // Georges de La Tour — The Magdalen with the Smoking Flame (candlelight)
    src: wm(
      "Georges de La Tour - The Magdalen with the Smoking Flame - Google Art Project.jpg",
      1000
    ),
    fallback: "https://picsum.photos/seed/jovin-magdalen/800/1000?grayscale",
  },
  built: {
    // Caravaggio — Narcissus (reflection)
    src: wm("Narcissus-Caravaggio (1594-96).jpg", 1000),
    fallback: "https://picsum.photos/seed/jovin-narcissus/800/1000?grayscale",
  },
};

/** On load error, switch to the fallback once (guards against a loop). */
const withFallback =
  (fallback: string) => (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fellBack) return;
    img.dataset.fellBack = "1";
    img.src = fallback;
  };

/** If a university logo fails to load, reveal the school-name text instead. */
const logoError = (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  img.style.display = "none";
  const fallback = img.nextElementSibling as HTMLElement | null;
  if (fallback) fallback.style.display = "block";
};

/**
 * Cinematic scroll experience.
 *  - Effect A: a centered cityscape frame expands to fill the screen as you
 *    enter (GSAP Flip + ScrollTrigger), handing off to the content.
 *  - Effect B: content panels rotate in and pin-stack on top of each other.
 *
 * Drop these images in /public:  city.jpg, portrait-1.jpg, portrait-2.jpg,
 * portrait-3.jpg  (see README). Missing images fall back to solid colors.
 */
export default function CityPortfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [openFolder, setOpenFolder] = useState<number | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any;
    let tickerFn: ((t: number) => void) | undefined;
    let detachRefresh = () => {};
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { Flip } = await import("gsap/Flip");
      const Lenis = (await import("lenis")).default;
      if (cancelled || !root.current) return;

      const gsap = gsapMod.default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger, Flip);

      try {
      // Smooth scrolling
      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      ctx = gsap.context(() => {
        const scope = root.current!;
        const frame = scope.querySelector<HTMLElement>(".intro-frame");
        const nav = scope.querySelector<HTMLElement>(".intro-nav");
        const links = scope.querySelectorAll<HTMLElement>(".intro-links");
        const logo = scope.querySelector<HTMLElement>(".intro-logo");
        const introLayer = scope.querySelectorAll<HTMLElement>(".intro-layer");
        const isDesktop = window.innerWidth >= 720;

        // ---- Effect A: frame expand + logo flip ----
        if (frame && nav && logo && isDesktop) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const initialW = frame.offsetWidth;
          const initialH = frame.offsetHeight;
          const linkW = Array.from(links).map((l) => l.offsetWidth);
          const langs = logo.querySelector<HTMLElement>(".intro-langs");

          const state = Flip.getState(logo);
          logo.classList.add("pinned");
          gsap.set(logo, { width: 250 });
          const flip = Flip.from(state, { duration: 1, ease: "none", paused: true });

          ScrollTrigger.create({
            trigger: scope.querySelector(".intro-spacer"),
            start: "top top",
            end: `+=${vh}px`,
            scrub: 1,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set([frame, nav], {
                width: gsap.utils.interpolate(initialW, vw, p),
                height: gsap.utils.interpolate(initialH, vh, p),
              });
              links.forEach((l, i) => {
                gsap.set(l, {
                  width: gsap.utils.interpolate(l.offsetWidth, linkW[i], p),
                });
              });
              flip.progress(p);
              if (langs) gsap.set(langs, { autoAlpha: 1 - p });
            },
          });
        } else if (logo) {
          logo.classList.add("pinned");
          gsap.set(logo, { width: 220 });
          gsap.set([frame, nav], { width: "100%", height: "100vh" });
        }

        // ---- Hand-off: fade the intro layer out as the first panel rises ----
        const firstPanel = scope.querySelector(".panel");
        if (firstPanel) {
          gsap.to(introLayer, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: firstPanel,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
            onComplete: () => gsap.set(introLayer, { pointerEvents: "none" }),
          });
        }

        // ---- Effect B: rotate-in + pin-stack panels ----
        const panels = scope.querySelectorAll<HTMLElement>(".panel");
        panels.forEach((panel, index) => {
          const container = panel.querySelector(".stage");
          if (index === 0) {
            // First panel sits flat — it rises cleanly out of the intro
            // instead of tilting in (which exposed the dark backdrop).
            gsap.set(container, { rotate: 0 });
          } else {
            gsap.to(container, {
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "top center",
                scrub: true,
              },
            });
          }
          if (index !== panels.length - 1) {
            ScrollTrigger.create({
              trigger: panel,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
            });
          }
        });

        // Pins capture panel size on creation. Re-measure after the page,
        // web fonts, and smooth-scroll have all settled so pinned panels
        // get their true full-viewport size (otherwise they come up short).
        const refresh = () => {
          if (!cancelled) ScrollTrigger.refresh();
        };
        refresh();
        window.addEventListener("load", refresh);
        if (document.fonts?.ready) document.fonts.ready.then(refresh);
        const t1 = window.setTimeout(refresh, 400);
        const t2 = window.setTimeout(refresh, 1200);
        detachRefresh = () => {
          window.removeEventListener("load", refresh);
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }, root);
      } catch (err) {
        // If the scroll engine fails to start, don't leave the page frozen
        // at the tilted state — flatten the panels and scroll natively.
        // eslint-disable-next-line no-console
        console.error("Cinematic scroll setup failed:", err);
        lenis?.destroy?.();
        root.current
          ?.querySelectorAll<HTMLElement>(".stage")
          .forEach((s) => {
            s.style.transform = "none";
          });
      }
    })();

    return () => {
      cancelled = true;
      detachRefresh();
      ctx?.revert();
      if (tickerFn) {
        // best-effort ticker cleanup
        import("gsap").then((m) => (m.default ?? m).ticker.remove(tickerFn!));
      }
      lenis?.destroy();
    };
  }, []);

  return (
    <div ref={root} className="cine">
      {/* ── Effect A: entry frame ───────────────────────────────── */}
      <div className="intro-backdrop intro-layer">
        <div className="intro-img">
          <img src={IMAGES.city.src} alt="" onError={withFallback(IMAGES.city.fallback)} />
        </div>
      </div>
      <div className="intro-frame intro-layer" />
      <div className="intro-nav intro-layer">
        <div className="intro-links">
          <a href="#education">Education</a>
          <a href="#work">Work</a>
        </div>
        <div className="intro-links">
          <a href="#built">Projects</a>
          <a href="#contact">Connect</a>
        </div>
        <div className="intro-logo">
          <a href="#">{profile.name.split(" ")[0]}</a>
          <div className="intro-langs" aria-hidden>
            <span>조빈</span>
            <span>जोविन</span>
          </div>
        </div>
      </div>
      <div className="intro-scroll-hint intro-layer">scroll to enter ↓</div>
      <div className="intro-spacer" />

      {/* ── Effect B: stacked content panels ────────────────────── */}
      <div className="panels">
        {/* Panel 1 — statement */}
        <section className="panel ink" id="top">
          <div className="bg" />
          <div className="stage hero-stage">
            <div className="col text">
              <p className="meta">About me</p>
              <h1>{profile.headline}</h1>
              <p>
                {"I'm a recent Berkeley Haas graduate based in Berkeley, California, looking to break into solving customer issues and working closely with product and ops."}
              </p>
              <p className="hero-interests">
                {"Outside of work, I enjoy cooking, watching Real Madrid, and exploring perfumery."}
              </p>
            </div>
            <div className="col center hero-right">
              <p className="marquee-label">{"Things I'm building & dabbling with"}</p>
              <ToolMarquee />
              <div className="claude-buddy" aria-hidden>
                <svg viewBox="0 0 100 100" width="38" height="38">
                  <g fill="#D97757">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <rect
                        key={i}
                        x="47.5"
                        y="6"
                        width="5"
                        height="40"
                        rx="2.5"
                        transform={`rotate(${i * 30} 50 50)`}
                      />
                    ))}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 2 — Education (image left, content right) */}
        <section className="panel sage" id="education">
          <div className="bg" />
          <div className="stage">
            <div className="col center">
              <div className="img">
                <img src={IMAGES.about.src} alt="Caravaggio — Saint Jerome Writing" onError={withFallback(IMAGES.about.fallback)} />
              </div>
            </div>
            <div className="col text">
              <p className="meta">education</p>
              <p className="edu-lead">
                {"I spent the last three years on a triple-degree Master in Management — Global Economic Transformation & Technology — that took me across three schools and three continents: EDHEC in Paris, SKK GSB in Seoul, and UC Berkeley Haas. I dug into how technology reshapes business — product, customer experience, data, and AI — and finished on the Dean's List."}
              </p>
              <div className="edu-list">
                {educationCards.map((e) => (
                  <div className="edu-row" key={e.school}>
                    <div className="edu-logo">
                      <img src={e.logo} alt={e.school} onError={logoError} />
                      <span className="edu-fallback">{e.school}</span>
                    </div>
                    <span className="edu-when">{e.classYear}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Panel 3 — Experience */}
        <section className="panel violet" id="work">
          <div className="bg" />
          <div className="stage">
            <div className="col text">
              <p className="meta">{experience.kicker}</p>
              <h1>{experience.title}</h1>
              <ul className="list">
                {experience.items.map((item) => (
                  <li key={item.company}>
                    <span className="xp-left">
                      <span className="xp-logo">
                        {item.logo ? (
                          <>
                            <img src={item.logo} alt="" onError={logoError} />
                            <span className="xp-logo-fallback">
                              {item.company.charAt(0)}
                            </span>
                          </>
                        ) : (
                          <span className="xp-logo-fallback solo">
                            {item.company.charAt(0)}
                          </span>
                        )}
                      </span>
                      <span className="role">
                        {item.company} — {item.role}
                      </span>
                    </span>
                    <Link
                      className="deep-dive"
                      href={`/work/${item.slug}`}
                      aria-label={`Open ${item.company} details`}
                    >
                      <span aria-hidden>↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col center">
              <div className="img">
                <img src={IMAGES.work.src} alt="Georges de La Tour — The Magdalen with the Smoking Flame" onError={withFallback(IMAGES.work.fallback)} />
              </div>
            </div>
          </div>
        </section>

        {/* Panel 4 — Projects (image left, content right) */}
        <section className="panel amber" id="built">
          <div className="bg" />
          <div className="stage">
            <div className="col center">
              <div className="img">
                <img src={IMAGES.built.src} alt="Caravaggio — Narcissus" onError={withFallback(IMAGES.built.fallback)} />
              </div>
            </div>
            <div className="col text">
              <p className="meta">{projects.kicker}</p>
              <h1>{projects.title}</h1>
              <div className="folders">
                {projects.items.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    className={`folder${openFolder === i ? " open" : ""}`}
                    onClick={() => setOpenFolder(openFolder === i ? null : i)}
                  >
                    <span className="folder-ico" aria-hidden />
                    <span className="folder-name">{p.name}</span>
                  </button>
                ))}
              </div>
              {openFolder !== null && (
                <div className="folder-detail">
                  <h2>{projects.items[openFolder].name}</h2>
                  <p>{projects.items[openFolder].description}</p>
                  {projects.items[openFolder].impact && (
                    <p className="impact">→ {projects.items[openFolder].impact}</p>
                  )}
                  <div className="folder-actions">
                    {projects.items[openFolder].github ? (
                      <a
                        href={projects.items[openFolder].github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View code on GitHub ↗
                      </a>
                    ) : projects.items[openFolder].live ? (
                      <a
                        href={projects.items[openFolder].live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View case study ↗
                      </a>
                    ) : null}
                    <button type="button" className="folder-close" onClick={() => setOpenFolder(null)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Panel 5 — Contact (last, not pinned) */}
        <section className="panel ink contact" id="contact">
          <div className="bg" />
          <div className="stage column">
            <p className="meta">{contact.kicker}</p>
            <h1>{contact.title}</h1>
            <p>{contact.message}</p>
            <div className="actions">
              {contact.links.map((l) => {
                const newTab = l.href.startsWith("http") || l.label === "Resume";
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target={newTab ? "_blank" : undefined}
                    rel={newTab ? "noopener noreferrer" : undefined}
                    onClick={l.label === "Resume" ? pingResumeOpen : undefined}
                  >
                    <span className="ico">{contactIcon[l.label]}</span>
                    {l.label}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
