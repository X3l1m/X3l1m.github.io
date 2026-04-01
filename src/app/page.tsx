import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FloatNav from "@/components/FloatNav";
import AnimatedBackground from "@/components/AnimatedBackground";
import GlassDroplets from "@/components/GlassDroplets";
import LiquidGlassFilter from "@/components/LiquidGlassFilter";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <LiquidGlassFilter />
      <AnimatedBackground />
      <GlassDroplets />
      <LanguageSwitcher />
      <FloatNav />
      <main id="snap-root" className="relative h-screen overflow-y-auto" style={{ zIndex: 1 }}>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
