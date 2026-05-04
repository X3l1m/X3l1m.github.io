"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/contexts/LanguageContext";

const NAV_ITEMS = [
  { id: "hero",     key: "nav_home"     as const },
  { id: "projects", key: "nav_projects" as const },
  { id: "skills",   key: "nav_skills"   as const },
  { id: "about",    key: "nav_about"    as const },
  { id: "contact",  key: "nav_contact"  as const },
];

export default function TopNav() {
  const { t } = useT();
  const [active, setActive] = useState("hero");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Detect active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4, rootMargin: "-20% 0px -40% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 8) {
        setHidden(true);
      } else if (y < lastY.current - 8) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main navigation"
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]"
        >
          <div
            className="glass-strong flex items-center gap-1 rounded-full p-1.5"
            style={{ boxShadow: "var(--shadow)" }}
          >
            {NAV_ITEMS.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                className="relative px-4 py-2 text-xs font-medium tracking-wide transition-colors"
                style={{
                  color: active === id ? "var(--bg)" : "var(--fg-2)",
                  zIndex: 1,
                }}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "var(--fg)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{t[key]}</span>
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
