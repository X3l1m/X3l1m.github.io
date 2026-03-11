import FloatNav from "@/components/SideNav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <FloatNav />
      <main>
        <Hero />
        <Divider />
        <Projects />
        <Divider />
        {/* Alternating subtle background */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-card/30" />
          <Skills />
        </div>
        <Divider />
        <About />
        <Divider />
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-card/30" />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
