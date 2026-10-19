"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { personalInfo, projectsEnabled } from "@/lib/data";
import Section from "./Section";
import { useT } from "@/contexts/LanguageContext";
import styles from "./Hero.module.css";
import glass from "./Glass.module.css";

export default function Hero() {
  const { t } = useT();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [4, -4]);
  const rotateY = useTransform(springX, [-300, 300], [-4, 4]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <Section
      id="hero"
      withContainer={false}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div ref={containerRef} className="relative z-10 mx-auto max-w-4xl text-center w-full">

        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${styles.role} ${glass.text} mb-8 inline-block text-sm font-medium tracking-[0.24em] uppercase sm:text-base`}
          data-light-reactive
          data-light-depth="0.15"
        >
          {t.hero_role}
        </motion.p>

        {/* Main heading */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className={`${glass.text} mb-6 font-bold tracking-tight leading-[1.1]`} data-light-reactive data-light-depth="0.45" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
            <span className="block text-foreground">Hi, I&apos;m</span>
            <span
              className="block text-gradient"
              style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
            >
              {personalInfo.name.split(" ")[0]}
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className={`${glass.copy} mx-auto mb-12 max-w-lg text-lg leading-relaxed text-muted`}
          data-light-reactive
        >
          {t.hero_tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {projectsEnabled && (
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
                color: "var(--accent-foreground)",
                boxShadow: "0 0 30px var(--glow-from), var(--shadow-sm)",
              }}
            >
              <span className="relative z-10">{t.hero_cta_projects}</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, var(--accent-to), var(--accent-from))",
                  transition: "opacity 0.3s ease",
                }}
              />
            </a>
          )}
          <a
            href="#contact"
            className={`${glass.surface} rounded-full px-8 py-3.5 text-sm font-semibold text-muted hover:text-foreground`}
            data-light-reactive
            data-light-depth="0.6"
          >
            {t.hero_cta_contact}
          </a>
        </motion.div>
      </div>

      {/* Scroll hint stays above the floating navigation on mobile. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="pointer-events-none absolute bottom-28 left-1/2 z-10 -translate-x-1/2 min-[769px]:bottom-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </Section>
  );
}
