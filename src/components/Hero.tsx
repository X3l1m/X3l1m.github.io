"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import { useMagnetic } from "@/lib/hooks";

/* ──────────────────────────────────────────────────────────────────
 *  Animated word-by-word reveal
 * ────────────────────────────────────────────────────────────────── */
function RevealText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.05,
            }}
            style={{ display: "inline-block", paddingRight: "0.25em" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Magnetic CTA button
 * ────────────────────────────────────────────────────────────────── */
function MagneticLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);
  return (
    <a
      ref={ref}
      href={href}
      className="group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium transition-colors"
      style={{
        background: primary ? "var(--fg)" : "transparent",
        color: primary ? "var(--bg)" : "var(--fg)",
        border: primary ? "none" : "1px solid var(--line-2)",
        willChange: "transform",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s",
      }}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45"
        style={{
          background: primary ? "var(--bg)" : "var(--fg)",
          color:      primary ? "var(--fg)" : "var(--bg)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </span>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────────
 *  Hero
 * ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { t } = useT();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6 pt-32"
    >
      {/* Dot grid pattern bottom */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--fg-3)" }}
        >
          <span
            className="relative flex h-2 w-2"
            aria-hidden
          >
            <span
              className="absolute inset-0 rounded-full pulse-ring"
              style={{ background: "#10b981", boxShadow: "0 0 0 0 rgba(16,185,129,0.6)" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#10b981" }} />
          </span>
          {t.hero_role}
        </motion.div>

        {/* Display heading */}
        <h1 className="text-fluid-display font-bold mb-8" style={{ color: "var(--fg)" }}>
          <span className="block">
            <RevealText text="Hi, I'm" delay={0.05} />
          </span>
          <span className="block text-gradient">
            <RevealText text={personalInfo.name.split(" ")[0]} delay={0.25} />
          </span>
        </h1>

        {/* Description grid */}
        <div className="grid gap-12 md:grid-cols-12 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="md:col-span-6 md:col-start-7 text-lg leading-relaxed"
            style={{ color: "var(--fg-2)" }}
          >
            {t.hero_tagline}
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticLink href="#projects" primary>
            {t.hero_cta_projects}
          </MagneticLink>
          <MagneticLink href="#contact">
            {t.hero_cta_contact}
          </MagneticLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "var(--fg-4)" }}
        >
          Scroll
        </span>
        <span
          className="relative block h-10 w-px overflow-hidden"
          style={{ background: "var(--line-2)" }}
        >
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 block"
            style={{ background: "linear-gradient(180deg, transparent, var(--acc-1), transparent)" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
