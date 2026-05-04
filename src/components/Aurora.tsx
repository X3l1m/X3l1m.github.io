"use client";

import { useEffect, useRef } from "react";

/*
 * Aurora — full-viewport ambient background.
 * Three large blurred orbs that drift with low-frequency noise + subtle
 * parallax against the cursor. Uses pure CSS transforms so it stays cheap.
 */
export default function Aurora() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let mx = 0, my = 0;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx = (e.clientX / w - 0.5) * 2;
      my = (e.clientY / h - 0.5) * 2;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          wrap.style.setProperty("--mx", String(mx));
          wrap.style.setProperty("--my", String(my));
          raf = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        // CSS vars set by mouse handler, fallback to 0
        ["--mx" as string]: 0,
        ["--my" as string]: 0,
      }}
    >
      {/* Orb 1 — violet, top-left */}
      <div
        style={{
          position: "absolute",
          top: "-20%", left: "-15%",
          width: "70vmax", height: "70vmax",
          background: "radial-gradient(circle, var(--aurora-1) 0%, transparent 60%)",
          filter: "blur(80px)",
          transform: "translate3d(calc(var(--mx) * 30px), calc(var(--my) * 30px), 0)",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          animation: "aurora-drift-1 28s ease-in-out infinite",
        }}
      />
      {/* Orb 2 — pink, bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-25%", right: "-20%",
          width: "60vmax", height: "60vmax",
          background: "radial-gradient(circle, var(--aurora-2) 0%, transparent 60%)",
          filter: "blur(80px)",
          transform: "translate3d(calc(var(--mx) * -40px), calc(var(--my) * -40px), 0)",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          animation: "aurora-drift-2 32s ease-in-out infinite",
        }}
      />
      {/* Orb 3 — cyan, mid-right */}
      <div
        style={{
          position: "absolute",
          top: "30%", right: "-15%",
          width: "50vmax", height: "50vmax",
          background: "radial-gradient(circle, var(--aurora-3) 0%, transparent 60%)",
          filter: "blur(80px)",
          transform: "translate3d(calc(var(--mx) * 20px), calc(var(--my) * -20px), 0)",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          animation: "aurora-drift-3 24s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% { translate: 0 0; }
          50%      { translate: 4% 6%; }
        }
        @keyframes aurora-drift-2 {
          0%, 100% { translate: 0 0; }
          50%      { translate: -5% -3%; }
        }
        @keyframes aurora-drift-3 {
          0%, 100% { translate: 0 0; }
          50%      { translate: -8% 4%; }
        }
      `}</style>
    </div>
  );
}
