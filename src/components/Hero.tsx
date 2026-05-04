"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { personalInfo } from "@/lib/data";
import Section from "./Section";
import { useT } from "@/contexts/LanguageContext";

function FloatingOrb({
  size,
  x,
  y,
  color,
  delay,
}: {
  size: number;
  x: string;
  y: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${size * 0.4}px)`,
        pointerEvents: "none",
      }}
    />
  );
}

function GridLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 grid-bg opacity-[0.03]"
      style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }}
    />
  );
}

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
      <GridLines />

      {/* Orbs */}
      <FloatingOrb size={400} x="-10%" y="-15%" color="radial-gradient(circle, var(--glow-from) 0%, transparent 70%)" delay={0} />
      <FloatingOrb size={300} x="60%" y="50%" color="radial-gradient(circle, var(--glow-to) 0%, transparent 70%)" delay={2} />
      <FloatingOrb size={200} x="80%" y="-10%" color="radial-gradient(circle, var(--glow-from) 0%, transparent 70%)" delay={1} />

      <div ref={containerRef} className="relative z-10 mx-auto max-w-4xl text-center w-full">

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border-2 bg-card px-4 py-2 text-xs font-medium tracking-widest text-muted uppercase"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent-from)", boxShadow: "0 0 6px var(--accent-from)" }}
          />
          {t.hero_role}
        </motion.div>

        {/* Main heading */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="mb-6 font-bold tracking-tight leading-[1.1]" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
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
          className="mx-auto mb-12 max-w-lg text-lg leading-relaxed text-muted"
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
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
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
          <a
            href="#contact"
            className="rounded-full border border-border-2 px-8 py-3.5 text-sm font-semibold text-muted transition-all duration-300 hover:border-accent-from hover:text-foreground"
            style={{ background: "var(--card)", boxShadow: "var(--shadow-sm)" }}
          >
            {t.hero_cta_contact}
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
      </div>
    </Section>
  );
}
