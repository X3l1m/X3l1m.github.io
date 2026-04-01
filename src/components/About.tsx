"use client";

import { motion } from "framer-motion";
import { experienceTech } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import SectionHeading from "./SectionHeading";
import Section from "./Section";

type TimelineEntry = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  index: number;
};

function TimelineEntry({
  title,
  subtitle,
  period,
  description,
  index,
}: TimelineEntry) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: false, amount: 0.3 }}
      className="relative pl-5 border-l border-border"
    >
      <span className="absolute -left-1.25 top-1.75 block h-2.5 w-2.5 rounded-full border-2 border-accent-from bg-background" />
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
      <p className="mt-0.5 text-xs text-muted opacity-60">{period}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
      {children}
    </span>
  );
}

export default function About() {
  const { t } = useT();

  return (
    <Section id="about">
      <SectionHeading>{t.section_about}</SectionHeading>

      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        {/* Left: bio + highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p className="mb-7 max-w-xl text-base leading-relaxed text-muted">
            {t.about_bio}
          </p>

          {/* Highlight chips */}
          <div className="mb-7 flex flex-wrap gap-2">
            <Chip>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              {t.about_highlight_stack}
            </Chip>
            <Chip>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {t.about_highlight_years}
            </Chip>
          </div>

        </motion.div>

        {/* Right: experience + education timeline */}
        <div className="space-y-9">
          {/* Experience */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="mb-5 text-xs font-medium uppercase tracking-widest text-muted"
            >
              {t.about_exp_label}
            </motion.h3>
            <div className="space-y-6">
              <TimelineEntry
                title={t.about_exp_role}
                subtitle={t.about_exp_company}
                period={t.about_exp_period}
                description={t.about_exp_desc}
                index={0}
              />
              {/* Tech tags for experience */}
              <div className="flex flex-wrap gap-1.5 pl-5">
                {experienceTech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="mb-5 text-xs font-medium uppercase tracking-widest text-muted"
            >
              {t.about_edu_label}
            </motion.h3>
            <div className="space-y-6">
              <TimelineEntry
                title={t.about_edu_degree}
                subtitle={t.about_edu_institution}
                period={t.about_edu_period}
                description={t.about_edu_desc}
                index={1}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
