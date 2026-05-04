"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { useT } from "@/contexts/LanguageContext";
import type { Strings } from "@/lib/strings";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

const CAT_KEY: Record<string, keyof Strings> = {
  Frontend:           "skillcat_Frontend",
  Backend:            "skillcat_Backend",
  Systems:            "skillcat_Systems",
  "DevOps & Tools":   "skillcat_DevOps & Tools",
};

const CAT_NUMBER: Record<string, string> = {
  Frontend:         "001",
  Backend:          "002",
  Systems:          "003",
  "DevOps & Tools": "004",
};

function SkillRow({
  category,
  index,
  label,
}: {
  category: (typeof skillCategories)[number];
  index: number;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group grid grid-cols-12 gap-4 md:gap-8 py-8 border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="col-span-12 md:col-span-3 flex items-baseline gap-3">
        <span className="font-mono text-xs" style={{ color: "var(--fg-4)" }}>
          {CAT_NUMBER[category.name]}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          {label}
        </h3>
      </div>

      <div className="col-span-12 md:col-span-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.08 + i * 0.05 }}
            className="text-base md:text-lg transition-colors"
            style={{ color: "var(--fg-2)" }}
          >
            {skill}
            {i < category.skills.length - 1 && (
              <span className="ml-6 inline-block" style={{ color: "var(--fg-4)" }}>·</span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useT();
  return (
    <Section id="skills">
      <SectionHeading index="02" kicker="Capabilities">
        Skills & <span className="text-gradient">Tech Stack</span>
      </SectionHeading>

      <div className="border-b" style={{ borderColor: "var(--line)" }}>
        {skillCategories.map((cat, i) => (
          <SkillRow
            key={cat.name}
            category={cat}
            index={i}
            label={t[CAT_KEY[cat.name]] ?? cat.name}
          />
        ))}
      </div>
    </Section>
  );
}
