"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  index: string;       // "01", "02"...
  kicker: string;      // small uppercase label
  children: ReactNode; // the main heading
};

export default function SectionHeading({ index, kicker, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20"
    >
      <div className="flex items-baseline gap-4 mb-4">
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--fg-4)" }}
        >
          {index}
        </span>
        <span className="h-px flex-1 max-w-20" style={{ background: "var(--line-2)" }} />
        <span
          className="font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--acc-1)" }}
        >
          {kicker}
        </span>
      </div>
      <h2 className="text-fluid-h1 font-bold" style={{ color: "var(--fg)" }}>
        {children}
      </h2>
    </motion.div>
  );
}
