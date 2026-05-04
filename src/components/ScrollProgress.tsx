"use client";

import { useScrollProgress } from "@/lib/hooks";

export default function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 2,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${p * 100}%`,
          background: "linear-gradient(90deg, var(--acc-1), var(--acc-2), var(--acc-3))",
          boxShadow: "0 0 12px var(--acc-glow)",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
}
