"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import type { Strings } from "@/lib/strings";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import glass from "./Glass.module.css";

const CAT_KEY: Record<string, keyof Strings> = {
  Frontend: "skillcat_Frontend",
  Backend: "skillcat_Backend",
  Systems: "skillcat_Systems",
  "DevOps & Tools": "skillcat_DevOps & Tools",
};

const CAT_ICONS: Record<string, React.ReactNode> = {
  Frontend: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Backend: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Systems: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  "DevOps & Tools": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  ),
};

const skillIcons: Record<string, React.ReactNode> = {
  TypeScript: (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
      <rect width="20" height="20" rx="3" fill="#3178c6" />
      <text x="2" y="14.5" fill="white" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif">TS</text>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <ellipse cx="10" cy="10" rx="8.5" ry="3.2" stroke="#61dafb" strokeWidth="1.3" />
      <ellipse cx="10" cy="10" rx="8.5" ry="3.2" stroke="#61dafb" strokeWidth="1.3" transform="rotate(60 10 10)" />
      <ellipse cx="10" cy="10" rx="8.5" ry="3.2" stroke="#61dafb" strokeWidth="1.3" transform="rotate(120 10 10)" />
      <circle cx="10" cy="10" r="1.7" fill="#61dafb" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#1a1a1a" stroke="#444" strokeWidth="0.5" />
      <path d="M5.5 14.5V5.5l9 9M14.5 5.5v5.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  "HTML/CSS": (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <path d="M6 4L2.5 10l3.5 6" stroke="#e44d26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4l3.5 6-3.5 6" stroke="#264de4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12.5" y1="3.5" x2="7.5" y2="16.5" stroke="rgba(200,200,220,0.5)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
      <rect width="20" height="20" rx="3" fill="#c8a800" />
      <text x="1.5" y="14.5" fill="white" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif">JS</text>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
      <polygon points="10,1.5 18.2,6 18.2,15 10,19.5 1.8,15 1.8,6" fill="none" stroke="#68a063" strokeWidth="1.3" />
      <path d="M8.5 13V7.5l3 3.5-3 2z" fill="#68a063" />
    </svg>
  ),
  NestJS: (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
      <rect width="20" height="20" rx="3" fill="#e0234e" />
      <path d="M6 13.5c1.5-3 5-7 8-8-2 1.5-4.5 5.5-4 8H6z" fill="rgba(255,255,255,0.9)" />
      <path d="M10 14c.5-2.5 2.5-5.5 5-7-1.5 2-2.5 5-2 7h-3z" fill="rgba(255,255,255,0.6)" />
    </svg>
  ),
  "Express.js": (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
      <rect width="20" height="20" rx="3" fill="#404040" />
      <text x="2.5" y="14.5" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="600" fontFamily="Arial,sans-serif">Ex</text>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <ellipse cx="10" cy="5.5" rx="6.5" ry="3" stroke="#5b9bd5" strokeWidth="1.3" />
      <path d="M3.5 5.5v8c0 1.7 3 3 6.5 3s6.5-1.3 6.5-3v-8" stroke="#5b9bd5" strokeWidth="1.3" />
      <line x1="10" y1="8.5" x2="10" y2="16.5" stroke="#5b9bd5" strokeWidth="1" opacity="0.6" />
    </svg>
  ),
  Redis: (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <ellipse cx="10" cy="5" rx="7" ry="2.4" stroke="#ff4438" strokeWidth="1.3" />
      <ellipse cx="10" cy="10" rx="7" ry="2.4" stroke="#ff4438" strokeWidth="1.3" />
      <ellipse cx="10" cy="15" rx="7" ry="2.4" stroke="#ff4438" strokeWidth="1.3" />
      <line x1="3" y1="5" x2="3" y2="15" stroke="#ff4438" strokeWidth="1.3" />
      <line x1="17" y1="5" x2="17" y2="15" stroke="#ff4438" strokeWidth="1.3" />
    </svg>
  ),
  C: (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <path d="M15 5.5a7.5 7.5 0 1 0 0 9" stroke="#7eb8f7" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  "C++": (
    <svg viewBox="0 0 24 20" width="16" height="13" fill="none" aria-hidden>
      <path d="M10 5.5a6 6 0 1 0 0 9" stroke="#7eb8f7" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.5 7.5v5M16 10h-2.5" stroke="#7eb8f7" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 7.5v5M20.5 10H18" stroke="#7eb8f7" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <path d="M10 2c-3 0-4.5 1.2-4.5 3v2.5H10v.8H5.2C3.4 8.3 2 9.8 2 12s1.4 3.7 3.2 3.7H7V13c0-1.8.8-2.7 3-2.7s3 .9 3 2.7v2.7h1.8c1.8 0 3.2-1.5 3.2-3.7s-1.4-3.7-3.2-3.7H14V5c0-1.8-1.5-3-4-3z" stroke="#5ba8e0" strokeWidth="1.1" />
      <path d="M10 18c3 0 4.5-1.2 4.5-3v-2.5H10v-.8h4.8c1.8 0 3.2-1.5 3.2-3.7" stroke="#ffd43b" strokeWidth="1.1" />
      <circle cx="7.5" cy="4.5" r="1" fill="#5ba8e0" />
      <circle cx="12.5" cy="15.5" r="1" fill="#ffd43b" />
    </svg>
  ),
  "Linux/Unix": (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <rect x="1.5" y="2.5" width="17" height="12" rx="2" stroke="#b0b8d0" strokeWidth="1.3" />
      <path d="M1.5 17h17" stroke="#7080a0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.5 9l2.5 2.5-2.5 2.5" stroke="#d0d8f0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9.5" y1="14" x2="14" y2="14" stroke="#b0b8d0" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <rect x="2.5" y="7" width="2.2" height="2" rx="0.4" stroke="#2496ed" strokeWidth="1.1" />
      <rect x="5.4" y="7" width="2.2" height="2" rx="0.4" stroke="#2496ed" strokeWidth="1.1" />
      <rect x="8.3" y="7" width="2.2" height="2" rx="0.4" stroke="#2496ed" strokeWidth="1.1" />
      <rect x="5.4" y="4.5" width="2.2" height="2" rx="0.4" stroke="#2496ed" strokeWidth="1.1" />
      <path d="M13 8c1-.2 3 .4 3 2.2 0 2-1.5 3-3 3H3c-1.5 0-2.5-1-2.5-2.5" stroke="#2496ed" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M13.5 8c.5-1 2.5-1 3 .5" stroke="#2496ed" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <circle cx="4.5" cy="15" r="2" stroke="#f05133" strokeWidth="1.3" />
      <circle cx="15.5" cy="5" r="2" stroke="#f05133" strokeWidth="1.3" />
      <circle cx="15.5" cy="15" r="2" stroke="#f05133" strokeWidth="1.3" />
      <path d="M4.5 13V9a4 4 0 0 1 4-4h5" stroke="#f05133" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="15.5" y1="7" x2="15.5" y2="13" stroke="#f05133" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  "CI/CD": (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden>
      <path d="M16 10a6 6 0 0 1-10.4 4" stroke="var(--accent-to)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 10a6 6 0 0 1 10.4-4" stroke="var(--accent-to)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 6l-.5-2.5-2 1.5" stroke="var(--accent-to)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 14l.5 2.5 2-1.5" stroke="var(--accent-to)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Azure DevOps": (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
      <path d="M2 13.5L6.5 5l4 5L14.5 3 18 5.5l-3.5 5-2.5-2.5L9.5 13H2z" fill="#1e9de0" />
      <path d="M2 13.5l1.5 3h10.5l1-4L13 15H9.5L8 13 2 13.5z" fill="#0f78c8" />
    </svg>
  ),
  "New Relic": (
    <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
      <rect width="20" height="20" rx="3" fill="#00bf8a" />
      <text x="1.5" y="14.5" fill="white" fontSize="8.5" fontWeight="700" fontFamily="Arial,sans-serif">NR</text>
    </svg>
  ),
};

export default function Skills() {
  const { t } = useT();

  return (
    <Section id="skills">
      <SectionHeading>{t.section_skills}</SectionHeading>

      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: catIndex * 0.08 }}
            viewport={{ once: false, amount: 0.2 }}
            className={`${glass.surface} rounded-2xl p-5`}
          >
            {/* Category header */}
            <div className="mb-4 flex items-center gap-2.5">
              <span
                className={`${glass.chip} flex h-7 w-7 items-center justify-center rounded-lg text-accent-from`}
              >
                {CAT_ICONS[category.name]}
              </span>
              <h3 className="text-xs font-semibold tracking-widest text-muted uppercase">
                {t[CAT_KEY[category.name]] ?? category.name}
              </h3>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.28, delay: catIndex * 0.06 + skillIndex * 0.04 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className={`${glass.chip} inline-flex cursor-default items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground`}
                >
                  {skillIcons[skill] && (
                    <span className="inline-flex shrink-0 items-center">{skillIcons[skill]}</span>
                  )}
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
