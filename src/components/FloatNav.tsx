"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useT } from "@/contexts/LanguageContext";
import { motion, useMotionValue, useVelocity, useTransform, AnimatePresence, animate } from "framer-motion";
import GlassPanel from "./GlassPanel";

const ITEM_SIZE = 44;
const GAP       = 10;
const STRIDE    = ITEM_SIZE + GAP;
const PAD       = 8;

const NAV_ITEMS = [
  {
    id: "hero", href: "#hero",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
  },
  {
    id: "projects", href: "#projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: "skills", href: "#skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    id: "about", href: "#about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: "contact", href: "#contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
      </svg>
    ),
  },
];

export default function FloatNav() {
  const { t } = useT();
  const labels = [t.nav_home, t.nav_projects, t.nav_skills, t.nav_about, t.nav_contact];

  const [active,   setActive]   = useState(0);
  const [hovered,  setHovered]  = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const isScrollingRef = useRef(false);
  const unlockRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Blob spring animation
  const blobProgress = useMotionValue(0);
  const blobVelocity = useVelocity(blobProgress);
  const squash  = useTransform(blobVelocity, [-500, 0, 500], [0.75, 1, 0.75]);
  const stretch = useTransform(blobVelocity, [-500, 0, 500], [1.4,  1, 1.4 ]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    animate(blobProgress, active * STRIDE, {
      type: "spring", stiffness: 320, damping: 26, mass: 0.7,
    });
  }, [active, blobProgress]);

  const scrollTo = useCallback((idx: number) => {
    const el = document.getElementById(NAV_ITEMS[idx].id);
    if (!el) return;
    if (unlockRef.current) clearTimeout(unlockRef.current);
    isScrollingRef.current = true;
    setActive(idx);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", idx === 0 ? "/" : NAV_ITEMS[idx].href);
    unlockRef.current = setTimeout(() => { isScrollingRef.current = false; }, 900);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && !isScrollingRef.current) setActive(i); },
        { threshold: 0.45, rootMargin: "-10% 0px -10% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const idx = NAV_ITEMS.findIndex((n) => n.href === hash);
    if (idx !== -1) scrollTo(idx);
  }, [scrollTo]);

  const handleClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    scrollTo(idx);
  };

  const navW = isMobile ? NAV_ITEMS.length * STRIDE - GAP + PAD * 2 : ITEM_SIZE + PAD * 2;
  const navH = isMobile ? ITEM_SIZE + PAD * 2 : NAV_ITEMS.length * STRIDE - GAP + PAD * 2;

  return (
    <>
      {/* SVG filter for goo effect */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <defs>
          <filter id="fnav-goo" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"/>
          </filter>
        </defs>
      </svg>

      <GlassPanel
        as="nav"
        radius="full"
        aria-label="Section navigation"
        style={{
          position: "fixed",
          right:  isMobile ? "auto" : 20,
          top:    isMobile ? "auto" : "50%",
          left:   isMobile ? "50%"  : "auto",
          bottom: isMobile ? 20     : "auto",
          transform: isMobile ? "translateX(-50%)" : "translateY(-50%)",
          zIndex: 60,
          width: navW,
          height: navH,
        }}
      >
        {/* Goo layer — transparent circles + blob */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: "url(#fnav-goo)",
          }}
        >
          {/* Background circles — plain fill inside goo filter layer */}
          {NAV_ITEMS.map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: ITEM_SIZE, height: ITEM_SIZE,
                top:  isMobile ? PAD : PAD + i * STRIDE,
                left: isMobile ? PAD + i * STRIDE : PAD,
                borderRadius: "50%",
                background: "var(--bg-elev-2)",
              }}
            />
          ))}

          {/* Active blob */}
          <motion.div
            style={{
              position: "absolute",
              width: ITEM_SIZE, height: ITEM_SIZE,
              top:  isMobile ? PAD : PAD,
              left: isMobile ? PAD : PAD,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--acc-1), var(--acc-2))",
              boxShadow: "0 0 24px var(--acc-glow)",
              x: isMobile ? blobProgress : 0,
              y: isMobile ? 0 : blobProgress,
              scaleX: isMobile ? stretch : squash,
              scaleY: isMobile ? squash  : stretch,
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Clickable icon layer */}
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleClick(e, i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            aria-label={labels[i]}
            style={{
              position: "absolute",
              top:  isMobile ? PAD : PAD + i * STRIDE,
              left: isMobile ? PAD + i * STRIDE : PAD,
              width: ITEM_SIZE, height: ITEM_SIZE,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "50%",
              color: active === i ? "#fff" : "var(--fg-3)",
              transition: "color 0.2s ease",
              zIndex: 2,
              textDecoration: "none",
            }}
          >
            {item.icon}
          </a>
        ))}

        {/* Tooltips */}
        <AnimatePresence>
          {hovered !== null && (
            <GlassPanel
              as={motion.div}
              radius="md"
              key={hovered}
              initial={{ opacity: 0, x: isMobile ? 0 : 6, y: isMobile ? -4 : 0, scale: 0.88 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: isMobile ? 0 : 6, y: isMobile ? -4 : 0, scale: 0.88 }}
              transition={{ duration: 0.13, ease: "easeOut" }}
              style={{
                position: "absolute",
                right:  isMobile ? "auto" : navW + 10,
                left:   isMobile ? PAD + hovered * STRIDE + ITEM_SIZE / 2 : "auto",
                top:    isMobile ? -(PAD + 10) : PAD + hovered * STRIDE + ITEM_SIZE / 2,
                transform: isMobile ? "translate(-50%, -100%)" : "translateY(-50%)",
                padding: "5px 11px",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--fg)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              {labels[hovered]}
            </GlassPanel>
          )}
        </AnimatePresence>
      </GlassPanel>
    </>
  );
}
