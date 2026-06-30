import NavIndex from "@/components/sections/NavIndex";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Tools from "@/components/sections/Tools";
import Notes from "@/components/sections/Notes";
import Personal from "@/components/sections/Personal";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <NavIndex />
      <main className="mx-auto max-w-6xl space-y-20 px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Tools />
      <Notes />
      <Personal />
      <Education />
      <Contact />
    </main>
    </>
  );
}
