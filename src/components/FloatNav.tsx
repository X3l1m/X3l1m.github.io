"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useT } from "@/contexts/LanguageContext";
import { projectsEnabled } from "@/lib/data";
import glass from "./Glass.module.css";
import {
  motion,
  useMotionValue,
  useVelocity,
  useTransform,
  AnimatePresence,
  animate,
} from "framer-motion";

const ITEM_SIZE = 44;
const GAP = 12;
const STRIDE = ITEM_SIZE + GAP;

const navItems = [
  {
    id: "hero",
    label: "Home",
    href: "#hero",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    href: "#skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "Background",
    href: "#about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
  },
].filter((item) => projectsEnabled || item.id !== "projects");

export default function FloatNav() {
  const { t } = useT();
  const navLabels = [
    t.nav_home,
    ...(projectsEnabled ? [t.nav_projects] : []),
    t.nav_skills,
    t.nav_about,
    t.nav_contact,
  ];
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const activeRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const animationUnlockRef = useRef<number | null>(null);

  const blobProgress = useMotionValue(0);
  const blobVelocity = useVelocity(blobProgress);
  const squash = useTransform(blobVelocity, [-600, 0, 600], [0.72, 1, 0.72]);
  const stretch = useTransform(blobVelocity, [-600, 0, 600], [1.5, 1, 1.5]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    animate(blobProgress, active * STRIDE, {
      type: "spring",
      stiffness: 280,
      damping: 22,
      mass: 0.8,
    });
  }, [active, blobProgress]);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const href = navItems[active].href;
    history.replaceState(null, "", active === 0 ? "/" : href);
  }, [active]);

  const scrollToIndex = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(navItems.length - 1, index));
    const root = document.getElementById("snap-root");
    const target = document.getElementById(navItems[clampedIndex].id);
    if (!root || !target) return;

    const rootRect = root.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const to = root.scrollTop + (targetRect.top - rootRect.top);

    if (animationUnlockRef.current !== null) window.clearTimeout(animationUnlockRef.current);
    isAnimatingRef.current = true;
    setActive(clampedIndex);
    root.scrollTo({ top: to, behavior: "smooth" });

    animationUnlockRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      animationUnlockRef.current = null;
    }, 700);
  }, []);

  useEffect(() => {
    return () => {
      if (animationUnlockRef.current !== null) window.clearTimeout(animationUnlockRef.current);
    };
  }, []);

  useEffect(() => {
    const root = document.getElementById("snap-root");
    if (!root) return;
    let observer: IntersectionObserver;

    const observeSections = () => {
      observer?.disconnect();
      // Use the viewport's center so long history sections work on small screens.
      const inset = Math.max(0, root.clientHeight / 2 - 1);
      observer = new IntersectionObserver((entries) => {
        if (isAnimatingRef.current) return;
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const index = navItems.findIndex((item) => item.id === visible.target.id);
        if (index !== -1) setActive(index);
      }, { root, threshold: 0, rootMargin: `-${inset}px 0px -${inset}px 0px` });

      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });
    };

    observeSections();
    const resizeObserver = new ResizeObserver(observeSections);
    resizeObserver.observe(root);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = document.getElementById("snap-root");
    if (!root) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      if (isAnimatingRef.current) { event.preventDefault(); return; }

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentId = navItems[activeRef.current]?.id;
      const currentSection = currentId ? document.getElementById(currentId) : null;

      if (currentSection) {
        const sectionHeight = currentSection.offsetHeight;
        const viewportHeight = root.clientHeight;
        if (sectionHeight > viewportHeight + 4) {
          const atBottom = root.scrollTop + viewportHeight >= currentSection.offsetTop + sectionHeight - 8;
          const atTop = root.scrollTop <= currentSection.offsetTop + 8;
          if (direction > 0 && !atBottom) return;
          if (direction < 0 && !atTop) return;
        }
      }

      const nextIndex = Math.max(0, Math.min(navItems.length - 1, activeRef.current + direction));
      if (nextIndex === activeRef.current) return;
      event.preventDefault();
      scrollToIndex(nextIndex);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [scrollToIndex]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const index = navItems.findIndex((item) => item.href === hash);
    if (index !== -1) scrollToIndex(index);
  }, [scrollToIndex]);

  const handleClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (isAnimatingRef.current) return;
    scrollToIndex(index);
  };

  const navWidth = isMobile ? navItems.length * STRIDE - GAP + 16 : ITEM_SIZE + 16;
  const navHeight = isMobile ? ITEM_SIZE + 16 : navItems.length * STRIDE - GAP + 16;

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <defs>
          <filter id="liquid-goo" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11" />
          </filter>
        </defs>
      </svg>

      <nav
        className={glass.surface}
        data-light-reactive
        data-light-depth="0.7"
        style={{
          position: "fixed",
          right: isMobile ? "auto" : 20,
          top: isMobile ? "auto" : "50%",
          left: isMobile ? "50%" : "auto",
          bottom: isMobile ? 20 : "auto",
          transform: isMobile ? "translateX(-50%)" : "translateY(-50%)",
          zIndex: 50,
          width: navWidth,
          height: navHeight,
          padding: 8,
          borderRadius: isMobile ? 999 : 999,
        }}
        aria-label="Section navigation"
      >
        {/* Goo shape layer */}
        <div style={{ position: "absolute", inset: 8, filter: "url(#liquid-goo)" }}>
          {navItems.map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                top: isMobile ? 0 : i * STRIDE,
                left: isMobile ? i * STRIDE : 0,
                borderRadius: "50%",
                background: "var(--glass-chip)",
              }}
            />
          ))}

          <motion.div
            style={{
              position: "absolute",
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              top: 0,
              left: 0,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
              x: isMobile ? blobProgress : 0,
              y: isMobile ? 0 : blobProgress,
              scaleX: isMobile ? stretch : squash,
              scaleY: isMobile ? squash : stretch,
              transformOrigin: "center center",
            }}
          />
        </div>

        {/* Icons */}
        {navItems.map((item, i) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleClick(e, i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            aria-label={navLabels[i]}
            style={{
              position: "absolute",
              top: isMobile ? 8 : 8 + i * STRIDE,
              left: isMobile ? 8 + i * STRIDE : 8,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: active === i ? "var(--accent-foreground)" : "var(--muted)",
              transition: "color 0.25s ease",
              zIndex: 2,
              padding: 0,
              textDecoration: "none",
            }}
          >
            {item.icon}
          </a>
        ))}

        {/* Tooltips */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, x: isMobile ? 0 : 6, y: isMobile ? -4 : 0, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: isMobile ? 0 : 6, y: isMobile ? -4 : 0, scale: 0.92 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              style={{
                position: "absolute",
                right: isMobile ? "auto" : ITEM_SIZE + 24,
                left: isMobile ? 8 + hovered * STRIDE + ITEM_SIZE / 2 : "auto",
                top: isMobile ? -8 : 8 + hovered * STRIDE + ITEM_SIZE / 2,
                transform: isMobile ? "translate(-50%, -100%)" : "translateY(-50%)",
                background: "var(--tooltip-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--border-2)",
                borderRadius: 8,
                padding: "5px 11px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "var(--foreground)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {navLabels[hovered]}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
