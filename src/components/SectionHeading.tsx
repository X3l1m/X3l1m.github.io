"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">{children}</h2>
      <div
        className="mt-3 h-0.5 w-14 rounded-full"
        style={{ background: "linear-gradient(90deg, var(--accent-from), var(--accent-to))" }}
      />
    </motion.div>
  );
}
