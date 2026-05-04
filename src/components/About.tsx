"use client";

import { motion } from "framer-motion";
import { useT } from "@/contexts/LanguageContext";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

function TimelineDot() {
  return (
    <span className="relative flex shrink-0 items-center justify-center">
      <span
        className="absolute inset-0 -m-1.5 rounded-full"
        style={{ background: "var(--acc-soft)" }}
      />
      <span
        className="relative inline-block h-2.5 w-2.5 rounded-full"
        style={{
          background: "linear-gradient(135deg, var(--acc-1), var(--acc-2))",
          boxShadow: "0 0 10px var(--acc-glow)",
        }}
      />
    </span>
  );
}

function TimelineEntry({
  title, subtitle, period, description, delay,
}: {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="relative grid grid-cols-[auto_1fr] gap-5 pb-10 last:pb-0"
    >
      <div className="flex flex-col items-center">
        <TimelineDot />
        <span
          className="mt-2 w-px flex-1"
          style={{ background: "var(--line)" }}
        />
      </div>

      <div>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "var(--fg-4)" }}>
          {period}
        </p>
        <h4 className="text-lg font-bold mb-1" style={{ color: "var(--fg)" }}>
          {title}
        </h4>
        <p className="text-sm font-medium mb-3" style={{ color: "var(--acc-1)" }}>
          {subtitle}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-3)" }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { t } = useT();

  return (
    <Section id="about">
      <SectionHeading index="03" kicker="About Me">
        Building things <br />
        <span className="text-gradient">that last</span>.
      </SectionHeading>

      <div className="grid gap-16 lg:grid-cols-12">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="text-xl md:text-2xl leading-relaxed" style={{ color: "var(--fg-2)" }}>
            {t.about_bio}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="lg:col-span-5 lg:pl-8 lg:border-l" style={{ borderColor: "var(--line)" }}>
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6" style={{ color: "var(--fg-4)" }}>
              ─ {t.about_exp_label}
            </p>
            <TimelineEntry
              title={t.about_exp_role}
              subtitle={t.about_exp_company}
              period={t.about_exp_period}
              description={t.about_exp_desc}
              delay={0.1}
            />
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6" style={{ color: "var(--fg-4)" }}>
              ─ {t.about_edu_label}
            </p>
            <TimelineEntry
              title={t.about_edu_degree}
              subtitle={t.about_edu_institution}
              period={t.about_edu_period}
              description={t.about_edu_desc}
              delay={0.2}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
