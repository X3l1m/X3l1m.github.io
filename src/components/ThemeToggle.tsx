"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";
import GlassPanel from "./GlassPanel";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [visualTheme, setVisualTheme] = useState<"dark" | "light">(theme);
  const clicking = useRef(false);
  const isDark = visualTheme === "dark";

  useEffect(() => {
    if (!clicking.current) setVisualTheme(theme);
  }, [theme]);

  const handleClick = () => {
    clicking.current = true;
    setVisualTheme((v) => (v === "dark" ? "light" : "dark"));
    toggle();
    setTimeout(() => { clicking.current = false; }, 900);
  };

  return (
    <GlassPanel
      as={motion.button}
      radius="full"
      onClick={handleClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 70,
        width: 52,
        height: 52,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatePresence initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: 24, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -24, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute", display: "flex" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--acc-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: 24, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -24, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute", display: "flex" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </GlassPanel>
  );
}
