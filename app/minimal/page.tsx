import TopNav from "@/components/sections/TopNav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

/**
 * The clean, recruiter-focused single page.
 * Read top-to-bottom in under a minute, then act.
 */
export default function MinimalPage() {
  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-6xl space-y-20 px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
