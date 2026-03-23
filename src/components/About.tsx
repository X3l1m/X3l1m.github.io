"use client";

import { motion } from "framer-motion";
import { aboutText, experience, education } from "@/lib/data";
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
      <p className="mt-0.5 text-xs text-muted">
        {subtitle} · {period}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionHeading>About Me</SectionHeading>

      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        {/* Left: bio + status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
            {aboutText}
          </p>
        </motion.div>

        {/* Right: experience + education */}
        <div className="space-y-9">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="mb-5 text-xs font-medium uppercase tracking-widest text-muted"
            >
              Experience
            </motion.h3>
            <div className="space-y-6">
              {experience.map((item, i) => (
                <TimelineEntry
                  key={item.company}
                  title={item.role}
                  subtitle={`${item.company}, ${item.location}`}
                  period={item.period}
                  description={item.description}
                  index={i}
                />
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false, amount: 0.5 }}
              className="mb-5 text-xs font-medium uppercase tracking-widest text-muted"
            >
              Education
            </motion.h3>
            <div className="space-y-6">
              {education.map((item, i) => (
                <TimelineEntry
                  key={item.institution}
                  title={item.degree}
                  subtitle={`${item.institution} · ${item.network}`}
                  period={item.period}
                  description={item.description}
                  index={experience.length + i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
