import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FloatNav from "@/components/FloatNav";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LanguageSwitcher />
        <FloatNav />
        <ThemeToggle />
        <main id="snap-root" className="h-screen overflow-y-auto">
          <Hero />
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
