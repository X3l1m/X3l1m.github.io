"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import Section from "./Section";
import { useT } from "@/contexts/LanguageContext";

function TerminalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
      className="glass glow-cyan w-full rounded-2xl p-5 font-mono text-xs"
    >
      {/* Terminal header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <div className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[10px] text-muted">~/selim</span>
      </div>
      {/* Terminal content */}
      <div className="space-y-1.5 text-[11px] leading-5">
        <p>
          <span className="text-accent-from">❯</span>{" "}
          <span className="text-foreground/60">git log --oneline -3</span>
        </p>
        <p className="text-muted pl-3">
          <span className="text-accent-amber">a3f1c2e</span> feat: add WebSocket real-time sync
        </p>
        <p className="text-muted pl-3">
          <span className="text-accent-amber">9d82b1a</span> fix: docker compose health checks
        </p>
        <p className="text-muted pl-3">
          <span className="text-accent-amber">c7e4f09</span> refactor: NestJS auth guards
        </p>
        <p className="mt-3">
          <span className="text-accent-from">❯</span>{" "}
          <span className="text-foreground/60">{"docker ps --format \"table {{.Names}}\""}</span>
        </p>
        <p className="text-muted pl-3">api &nbsp;&nbsp; Up 3 hours</p>
        <p className="text-muted pl-3">db &nbsp;&nbsp;&nbsp; Up 3 hours</p>
        <p className="text-muted pl-3">redis &nbsp; Up 3 hours</p>
        <p className="mt-3 flex items-center gap-1">
          <span className="text-accent-from">❯</span>{" "}
          <span className="text-foreground/40 animate-pulse">█</span>
        </p>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useT();

  return (
    <Section
      id="hero"
      withContainer={false}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 sm:px-8"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-125 w-125 rounded-full bg-accent-from/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-100 w-100 rounded-full bg-accent-to/6 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-62.5 w-62.5 -translate-x-1/2 rounded-full bg-accent-amber/4 blur-[80px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text content */}
          <div>
            {/* Role chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-from/20 bg-accent-from/8 px-3 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)] animate-pulse" />
              <span className="text-xs font-medium text-accent-from">{t.hero_role}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl"
            >
              Hi, I&apos;m{" "}
              <span className="bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
                {personalInfo.name.split(" ")[0]}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10 max-w-md text-base text-muted"
            >
              {t.hero_tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="rounded-lg bg-accent-from px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-accent-from/90 shadow-[0_0_24px_rgba(34,211,238,0.2)]"
              >
                {t.hero_cta_projects}
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-border bg-card/50 px-5 py-2.5 text-sm font-semibold text-muted transition-all hover:border-accent-from/40 hover:text-foreground"
              >
                {t.hero_cta_contact}
              </a>
            </motion.div>
          </div>

          {/* Right: terminal card (desktop only) */}
          <div className="hidden lg:block">
            <TerminalCard />
          </div>
        </div>
      </div>
    </Section>
  );
}
