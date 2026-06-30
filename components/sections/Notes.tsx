"use client";

import SectionHeader from "@/components/SectionHeader";
import NoteCard from "@/components/NoteCard";
import { notes } from "@/data/portfolioData";

export default function Notes() {
  return (
    <section id="notes">
      <SectionHeader kicker={notes.kicker} title={notes.title} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.items.map((note, i) => (
          <NoteCard key={note.text} text={note.text} tone={note.tone} index={i} />
        ))}
      </div>
    </section>
  );
}
