"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import { useMagnetic, useSpotlight } from "@/lib/hooks";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import GlassPanel from "./GlassPanel";

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MagneticEmailCTA() {
  const ref  = useMagnetic<HTMLAnchorElement>(0.15);
  const sref = useSpotlight<HTMLAnchorElement>();

  // Combine magnetic + spotlight onto one element
  const setRef = (el: HTMLAnchorElement | null) => {
    if (ref) (ref as { current: HTMLAnchorElement | null }).current = el;
    if (sref) (sref as { current: HTMLAnchorElement | null }).current = el;
  };

  return (
    <GlassPanel
      as={motion.a}
      radius="3xl"
      opaque
      ref={setRef}
      href={`mailto:${personalInfo.email}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="spotlight block w-full p-12 md:p-20 text-center"
      style={{ willChange: "transform" }}
      data-cursor="view"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--acc-soft) 0%, transparent 70%)",
        }}
      />

      <p
        className="relative mb-6 font-mono text-xs uppercase tracking-[0.3em]"
        style={{ color: "var(--fg-3)" }}
      >
        Let&apos;s build something
      </p>

      <h3
        className="relative mb-8 text-3xl md:text-5xl font-bold tracking-tight"
        style={{ color: "var(--fg)" }}
      >
        <span className="block">{personalInfo.email}</span>
      </h3>

      <span
        className="relative inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium"
        style={{
          background: "var(--fg)",
          color: "var(--bg)",
        }}
      >
        <span>Send a message</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </span>
    </GlassPanel>
  );
}

function SocialCard({
  href, platform, handle, icon, delay,
}: {
  href: string;
  platform: string;
  handle: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const ref = useSpotlight<HTMLAnchorElement>();
  return (
    <GlassPanel
      as={motion.a}
      radius="3xl"
      opaque
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="group spotlight lift flex items-center gap-5 p-6"
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--line)",
          color: "var(--fg)",
        }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: "var(--fg-4)" }}>
          {platform}
        </p>
        <p className="text-base font-semibold truncate" style={{ color: "var(--fg)" }}>
          {handle}
        </p>
      </div>
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          color: "var(--fg-2)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </span>
    </GlassPanel>
  );
}

export default function Contact() {
  const { t } = useT();

  return (
    <Section id="contact">
      <SectionHeading index="04" kicker="Get in Touch">
        <span className="text-gradient">{t.contact_headline}</span>
      </SectionHeading>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-16 max-w-2xl text-lg md:text-xl leading-relaxed"
        style={{ color: "var(--fg-3)" }}
      >
        {t.contact_subtext}
      </motion.p>

      <MagneticEmailCTA />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <SocialCard
          href={personalInfo.github}
          platform="GitHub"
          handle="@X3l1m"
          icon={<GitHubIcon />}
          delay={0.1}
        />
        <SocialCard
          href={personalInfo.linkedin}
          platform="LinkedIn"
          handle="selim-yildirim"
          icon={<LinkedInIcon />}
          delay={0.2}
        />
      </div>
    </Section>
  );
}
