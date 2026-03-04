"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-12 text-2xl font-bold tracking-tight sm:text-3xl"
    >
      {children}
    </motion.h2>
  );
}
