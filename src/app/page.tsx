import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import Aurora from "@/components/Aurora";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import FloatNav from "@/components/FloatNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Background layers */}
        <Aurora />

        {/* Floating UI */}
        <Cursor />
        <ScrollProgress />
        <FloatNav />
        <LanguageSwitcher />
        <ThemeToggle />

        {/* Content */}
        <main className="relative z-10">
          <Hero />
          <Marquee />
          <Projects />
          <Skills />
          <About />
          <Contact />
          <Footer />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}
