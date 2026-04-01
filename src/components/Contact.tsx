"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import Section from "./Section";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: false, amount: 0.3 },
});

export default function Contact() {
  const { t } = useT();

  return (
    <Section id="contact">
      <div className="flex flex-col items-center text-center">
        {/* Availability badge */}
        <motion.div
          {...fadeUp(0)}
          className="glass-subtle mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-muted"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.55)]" />
          {t.contact_availability}
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fadeUp(0.05)}
          className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <span className="bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
            {t.contact_headline}
          </span>
        </motion.h2>

        <motion.p {...fadeUp(0.1)} className="mb-14 max-w-lg text-base leading-relaxed text-muted">
          {t.contact_subtext}
        </motion.p>

        {/* Email CTA */}
        <motion.a
          {...fadeUp(0.15)}
          href={`mailto:${personalInfo.email}`}
          className="glass group mb-12 flex w-full max-w-xl items-center justify-between rounded-2xl px-7 py-5 transition-all duration-300 hover:border-accent-from/40"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-from/10 text-accent-from transition-colors group-hover:bg-accent-from/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <div className="text-left">
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm font-medium text-foreground">
                {personalInfo.email}
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-from"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.a>

        {/* Social links */}
        <motion.div
          {...fadeUp(0.2)}
          className="mb-14 grid w-full max-w-xl grid-cols-2 gap-4"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-300 hover:border-accent-from/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-from/10 text-accent-from transition-colors group-hover:bg-accent-from/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </span>
              <div className="text-left">
                <p className="text-xs text-muted">GitHub</p>
                <p className="text-sm font-medium text-foreground">@X3l1m</p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-from"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-300 hover:border-accent-from/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-from/10 text-accent-from transition-colors group-hover:bg-accent-from/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </span>
              <div className="text-left">
                <p className="text-xs text-muted">LinkedIn</p>
                <p className="text-sm font-medium text-foreground">
                  selim-yildirim
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-from"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Meta info */}
        <motion.div
          {...fadeUp(0.25)}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted"
        >
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {t.contact_availability}
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
