"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useT } from "@/contexts/LanguageContext";
import {
  motion,
  useMotionValue,
  useVelocity,
  useTransform,
  AnimatePresence,
  animate,
} from "framer-motion";

const ITEM_SIZE = 44;
const GAP = 14;
const STRIDE = ITEM_SIZE + GAP;

const navItems = [
  {
    id: "hero",
    label: "Home",
    href: "#hero",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        height="17"
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        height="17"
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        height="17"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        height="17"
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        height="17"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function FloatNav() {
  const { t } = useT();
  const navLabels = [t.nav_home, t.nav_projects, t.nav_skills, t.nav_about, t.nav_contact];
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const activeRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const animationUnlockRef = useRef<number | null>(null);

  const blobProgress = useMotionValue(0);
  const blobVelocity = useVelocity(blobProgress);
  const squash = useTransform(blobVelocity, [-600, 0, 600], [0.68, 1, 0.68]);
  const stretch = useTransform(blobVelocity, [-600, 0, 600], [1.6, 1, 1.6]);

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
      stiffness: 260,
      damping: 20,
      mass: 0.9,
    });
  }, [active, blobProgress]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Sync URL hash with the active section
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

    if (animationUnlockRef.current !== null) {
      window.clearTimeout(animationUnlockRef.current);
    }
    isAnimatingRef.current = true;
    setActive(clampedIndex);

    root.scrollTo({
      top: to,
      behavior: "smooth",
    });

    animationUnlockRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      animationUnlockRef.current = null;
    }, 700);
  }, []);

  useEffect(() => {
    return () => {
      if (animationUnlockRef.current !== null) {
        window.clearTimeout(animationUnlockRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const root = document.getElementById("snap-root");
    navItems.forEach(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isAnimatingRef.current) setActive(i);
        },
        {
          root,
          threshold: 0.55,
          rootMargin: "-10% 0px -10% 0px",
        },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const root = document.getElementById("snap-root");
    if (!root) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(
        0,
        Math.min(navItems.length - 1, activeRef.current + direction),
      );

      if (nextIndex === activeRef.current) return;
      event.preventDefault();
      scrollToIndex(nextIndex);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [scrollToIndex]);

  // Restore section from URL hash on mount
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

  return (
    <>
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="liquid-goo"
            x="-60%"
            y="-60%"
            width="220%"
            height="220%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -12"
            />
          </filter>
        </defs>
      </svg>

      <nav
        style={{
          position: "fixed",
          right: isMobile ? "auto" : 24,
          top: isMobile ? "auto" : "50%",
          left: isMobile ? "50%" : "auto",
          bottom: isMobile ? 16 : "auto",
          transform: isMobile ? "translateX(-50%)" : "translateY(-50%)",
          zIndex: 50,
          width: isMobile ? navItems.length * STRIDE - GAP : ITEM_SIZE,
          height: isMobile ? ITEM_SIZE : navItems.length * STRIDE - GAP,
        }}
        aria-label="Section navigation"
      >
        {/* Goo shape layer */}
        <div
          style={{ position: "absolute", inset: 0, filter: "url(#liquid-goo)" }}
        >
          {/* Inactive circles — subtle purple tint so bridge blends naturally */}
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
                background: [
                  "radial-gradient(circle at 38% 32%, rgba(99,102,241,0.22) 0%, transparent 65%)",
                  "linear-gradient(145deg, rgba(32,32,46,0.99) 0%, rgba(18,18,28,0.99) 100%)",
                ].join(", "),
              }}
            />
          ))}

          {/* Liquid blob */}
          <motion.div
            style={{
              position: "absolute",
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              top: 0,
              left: 0,
              borderRadius: "50%",
              background: [
                "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.0) 48%)",
                "radial-gradient(circle at 72% 76%, rgba(79,30,180,0.55) 0%, rgba(79,30,180,0.0) 52%)",
                "linear-gradient(145deg, #a5b4fc 0%, #6366f1 30%, #8b5cf6 65%, #6d28d9 100%)",
              ].join(", "),
              x: isMobile ? blobProgress : 0,
              y: isMobile ? 0 : blobProgress,
              scaleX: isMobile ? stretch : squash,
              scaleY: isMobile ? squash : stretch,
              transformOrigin: "center center",
            }}
          />
        </div>

        {/* Icon & click layer */}
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
              top: isMobile ? 0 : i * STRIDE,
              left: isMobile ? i * STRIDE : 0,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: active === i ? "#ffffff" : "#52525b",
              transition: "color 0.25s ease",
              zIndex: 2,
              padding: 0,
              textDecoration: "none",
            }}
          >
            {item.icon}
          </a>
        ))}

        {/* Hover tooltips */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, x: 8, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.94 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              style={{
                position: "absolute",
                right: isMobile ? "auto" : ITEM_SIZE + 10,
                left: isMobile ? hovered * STRIDE + ITEM_SIZE / 2 : "auto",
                top: isMobile ? -10 : hovered * STRIDE + ITEM_SIZE / 2,
                transform: isMobile
                  ? "translate(-50%, -100%)"
                  : "translateY(-50%)",
                background: "rgba(12, 12, 18, 0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(63, 63, 70, 0.45)",
                borderRadius: 8,
                padding: "5px 12px",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: "#e4e4e7",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
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
