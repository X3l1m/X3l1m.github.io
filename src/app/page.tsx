import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FloatNav from "@/components/FloatNav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <FloatNav />
      <main
        id="snap-root"
        className="h-screen snap-y snap-mandatory overflow-y-auto"
      >
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </LanguageProvider>
  );
}
