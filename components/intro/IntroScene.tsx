"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { intro } from "@/data/portfolioData";
import type { RingSketchHandle } from "@/lib/ringSketch";

/**
 * Landing page intro: warm-toned interactive ring scene.
 * Drag or scroll to spin; "enter" wipes back to cream and
 * routes to the bento homepage at /home.
 */
export default function IntroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<RingSketchHandle | null>(null);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/home");
    let cancelled = false;
    let handle: RingSketchHandle | null = null;

    (async () => {
      const { createRingSketch } = await import("@/lib/ringSketch");
      if (cancelled || !containerRef.current) return;
      handle = createRingSketch(containerRef.current, {
        images: intro.images,
        onReady: () => setReady(true),
      });
      handleRef.current = handle;
    })();

    return () => {
      cancelled = true;
      handle?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enter = async () => {
    if (leaving) return;
    setLeaving(true);
    await handleRef.current?.exit();
    router.push("/home");
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* WebGL canvas mounts here */}
      <div ref={containerRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

      {/* Loader */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black transition-opacity duration-500 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="intro-loading font-display text-2xl tracking-[0.3em] text-white/40">
          {"LOADING".split("").map((ch, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Centerpiece text */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-1000 ${
          ready && !leaving ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="font-display text-6xl font-semibold tracking-[0.18em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] sm:text-8xl">
            {intro.title}
          </h1>
          <p className="text-xs tracking-[0.3em] text-white/35 uppercase">
            {intro.tagline}
          </p>
          <button
            onClick={enter}
            className="pointer-events-auto mt-6 rounded-full border border-white/20 bg-white/[0.06] px-6 py-2.5 text-sm font-medium text-white/80 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.12] hover:text-white"
          >
            {intro.enterLabel}
          </button>
        </div>
      </div>

      {/* Skip link (always available, even while loading) */}
      <button
        onClick={enter}
        className={`absolute bottom-6 right-6 z-30 rounded-full px-4 py-2 text-xs text-white/30 transition-all hover:bg-white/8 hover:text-white/60 ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
      >
        {intro.skipLabel} →
      </button>
    </div>
  );
}
