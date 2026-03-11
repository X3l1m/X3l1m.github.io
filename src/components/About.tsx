"use client";

import { motion } from "framer-motion";
import { aboutText } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading>About Me</SectionHeading>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.4 }}
          className="max-w-2xl text-base leading-relaxed text-muted"
        >
          {aboutText}
        </motion.p>
      </div>
    </section>
  );
}
