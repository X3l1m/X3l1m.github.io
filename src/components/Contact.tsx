"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import Section from "./Section";
import glass from "./Glass.module.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: false, amount: 0.3 },
});

function SocialLink({
  href,
  icon,
  platform,
  handle,
}: {
  href: string;
  icon: React.ReactNode;
  platform: string;
  handle: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${glass.surface} group flex items-center gap-3 rounded-2xl p-4`}
      data-light-reactive
    >
      <span
        className={`${glass.chip} flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-accent-from transition-all duration-300 group-hover:scale-110`}
        data-light-reactive
        data-light-depth="0.22"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted">{platform}</p>
        <p className="truncate text-sm font-semibold text-foreground">{handle}</p>
      </div>
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="shrink-0 transition-all duration-300 group-hover:translate-x-1"
        style={{ transition: "transform 0.3s ease, color 0.3s ease" }}
      >
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    </a>
  );
}

export default function Contact() {
  const { t } = useT();

  return (
    <Section id="contact">
      <div className="flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h2
          {...fadeUp(0.06)}
          className={`${glass.text} mb-5 font-bold tracking-tight`}
          data-light-reactive
          data-light-depth="0.4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <span className="text-gradient">{t.contact_headline}</span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.12)}
          className={`${glass.copy} mb-12 max-w-md text-base leading-relaxed text-muted`}
          data-light-reactive
        >
          {t.contact_subtext}
        </motion.p>

        {/* Email CTA */}
        <motion.a
          {...fadeUp(0.18)}
          href={`mailto:${personalInfo.email}`}
          className={`${glass.surface} group mb-10 flex w-full max-w-lg items-center justify-between rounded-2xl p-5`}
          data-light-reactive
        >
          <div className="flex items-center gap-4">
            <span
              className={`${glass.chip} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-accent-from transition-all duration-300 group-hover:scale-110`}
              data-light-reactive
              data-light-depth="0.22"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <div className="text-left">
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm font-semibold text-foreground">{personalInfo.email}</p>
            </div>
          </div>
          <span
            className="rounded-lg px-3 py-1.5 text-xs font-semibold"
            style={{ background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))", color: "var(--accent-foreground)" }}
          >
            Say hi →
          </span>
        </motion.a>

        {/* Social links */}
        <motion.div
          {...fadeUp(0.24)}
          className="grid w-full max-w-lg grid-cols-2 gap-3"
        >
          <SocialLink
            href={personalInfo.github}
            platform="GitHub"
            handle="@X3l1m"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            }
          />
          <SocialLink
            href={personalInfo.linkedin}
            platform="LinkedIn"
            handle="selim-yildirim"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
          />
        </motion.div>
      </div>
    </Section>
  );
}
