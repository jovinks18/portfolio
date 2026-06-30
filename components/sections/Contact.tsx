"use client";

import BentoCard from "@/components/BentoCard";
import ContactCard from "@/components/ContactCard";
import { contact, profile } from "@/data/portfolioData";

export default function Contact() {
  return (
    <section id="contact">
      <BentoCard still className="p-8 sm:p-10">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">
          {contact.kicker}
        </p>
        <h2 className="mb-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {contact.title} 👋
        </h2>
        <p className="mb-7 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
          {contact.message}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contact.links.map((link, i) => (
            <ContactCard key={link.label} {...link} delay={i * 0.07} />
          ))}
        </div>
      </BentoCard>
      <footer className="mt-10 pb-4 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} {profile.name} · built with Next.js,
        Tailwind & a soft spot for bento grids 🍱
      </footer>
    </section>
  );
}
