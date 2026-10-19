"use client";

import { motion } from "framer-motion";
import { useT } from "@/contexts/LanguageContext";
import SectionHeading from "./SectionHeading";
import Section from "./Section";

type TimelineEntryProps = {
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
}: TimelineEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      className="relative pl-6"
      style={{ borderLeft: "2px solid var(--border-2)" }}
    >
      <span
        className="absolute -left-1.75 top-1.5 block h-3 w-3 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
          boxShadow: "0 0 10px var(--glow-strong)",
        }}
      />
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <p className="text-sm font-bold text-foreground">{title}</p>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-2)",
            color: "var(--muted)",
          }}
        >
          {period}
        </span>
      </div>
      <p className="text-xs font-medium text-accent-from mb-1.5">{subtitle}</p>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}

export default function About() {
  const { t } = useT();

  return (
    <Section id="about">
      <SectionHeading>{t.section_about}</SectionHeading>

      <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Left: bio + stats */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-base leading-relaxed text-muted"
          >
            {t.about_bio}
          </motion.p>
        </div>

        {/* Right: timeline */}
        <div className="space-y-8">
          {/* Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="mb-5 flex items-center gap-2"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md text-accent-from"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-2)",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                {t.about_exp_label}
              </h3>
            </motion.div>
            <TimelineEntry
              title={t.about_exp_role}
              subtitle={t.about_exp_company}
              period={t.about_exp_period}
              description={t.about_exp_desc}
              index={0}
            />
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="mb-5 flex items-center gap-2"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md text-accent-from"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-2)",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                {t.about_edu_label}
              </h3>
            </motion.div>
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
    </Section>
  );
}
