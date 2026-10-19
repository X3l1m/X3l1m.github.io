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
import PointerLight from "@/components/PointerLight";
import { projectsEnabled } from "@/lib/data";
import styles from "./page.module.css";

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LanguageSwitcher />
        <FloatNav />
        <ThemeToggle />
        <main id="snap-root" className={`${styles.canvas} h-screen overflow-y-auto`}>
          <PointerLight />
          <Hero />
          {projectsEnabled && <Projects />}
          <Skills />
          <About />
          <Contact />
          <Footer />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}
