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
      className="relative pl-6"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-accent-from/50 via-border to-transparent" />
      {/* Glowing dot */}
      <div className="absolute -left-1.25 top-2 h-2.5 w-2.5 rounded-full border-2 border-accent-from bg-background shadow-[0_0_8px_rgba(34,211,238,0.5)]" />

      <div className="glass rounded-xl p-4">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <span className="shrink-0 rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted">
            {period}
          </span>
        </div>
        <p className="mb-2 text-xs font-medium text-accent-from/80">{subtitle}</p>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { t } = useT();

  return (
    <Section id="about">
      <SectionHeading>{t.section_about}</SectionHeading>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
        className="mb-12 grid grid-cols-3 gap-4"
      >
        {[
          { value: "1+", label: "Years Industry Exp." },
          { value: "5+", label: "Projects Shipped" },
          { value: "42", label: "Network Alumni" },
        ].map((stat) => (
          <div key={stat.label} className="glass glow-cyan rounded-2xl p-5 text-center">
            <p className="bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-3xl font-bold text-transparent tabular-nums">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        {/* Left: bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p className="mb-7 max-w-xl text-base leading-relaxed text-foreground/70">
            {t.about_bio}
          </p>
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
              className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent-from/70"
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
              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 pl-6">
                {experienceTech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border/60 px-2.5 py-0.5 font-mono text-xs text-muted transition-colors hover:border-accent-from/30 hover:text-accent-from"
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
              className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent-from/70"
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
