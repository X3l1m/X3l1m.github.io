"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
      className="mb-14"
    >
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>
      <div className="mt-3 h-px w-12 bg-linear-to-r from-accent-from to-accent-to rounded-full" />
    </motion.div>
  );
}
