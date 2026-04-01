"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import Section from "./Section";
import { useT } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useT();

  return (
    <Section
      id="hero"
      withContainer={false}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Gradient orb background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-linear-to-br from-accent-from/25 to-accent-to/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-75 w-75 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-sm font-medium tracking-widest text-muted uppercase"
        >
          {t.hero_role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl"
        >
          Hi, I&apos;m{" "}
          <span className="bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            {personalInfo.name.split(" ")[0]}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mb-10 max-w-lg text-lg text-muted"
        >
          {t.hero_tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-linear-to-r from-accent-from to-accent-to px-6 py-3 text-sm font-medium text-white shadow-[0_4px_24px_rgba(99,102,241,0.4)] transition-all hover:shadow-[0_4px_32px_rgba(99,102,241,0.55)] hover:brightness-110"
          >
            {t.hero_cta_projects}
          </a>
          <a
            href="#contact"
            className="glass rounded-full px-6 py-3 text-sm font-medium text-muted transition-all duration-300 hover:text-foreground hover:border-white/20"
          >
            {t.hero_cta_contact}
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
