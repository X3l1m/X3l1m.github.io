export default function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* Static base gradient mesh — no animation, zero GPU cost */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 8% 12%,  rgba(130, 52, 255, 0.52) 0%, transparent 60%),
            radial-gradient(ellipse 60% 45% at 92% 18%,  rgba(50, 110, 255, 0.45) 0%, transparent 58%),
            radial-gradient(ellipse 55% 65% at 18% 84%,  rgba(68, 48, 230, 0.42) 0%, transparent 60%),
            radial-gradient(ellipse 65% 50% at 88% 80%,  rgba(155, 48, 255, 0.40) 0%, transparent 58%),
            radial-gradient(ellipse 42% 36% at 50% 50%,  rgba(99, 102, 241, 0.28) 0%, transparent 70%),
            radial-gradient(ellipse 55% 28% at 36% 32%,  rgba(34, 211, 238, 0.16) 0%, transparent 62%)
          `,
        }}
      />

      {/* 4 animated orbs — each on its own compositor layer via will-change */}
      <div
        className="absolute rounded-full"
        style={{
          top: "-8%", left: "-10%",
          width: 650, height: 650,
          background: "radial-gradient(circle, rgba(125, 42, 255, 0.58) 0%, rgba(95, 34, 205, 0.30) 40%, transparent 70%)",
          animation: "orb-drift-1 22s ease-in-out infinite",
          filter: "blur(3px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "20%", right: "-14%",
          width: 560, height: 560,
          background: "radial-gradient(circle, rgba(50, 115, 255, 0.52) 0%, rgba(40, 92, 241, 0.26) 40%, transparent 70%)",
          animation: "orb-drift-2 28s ease-in-out infinite",
          filter: "blur(3px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-12%", left: "10%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(65, 48, 228, 0.50) 0%, rgba(48, 68, 205, 0.26) 40%, transparent 70%)",
          animation: "orb-drift-3 24s ease-in-out infinite",
          filter: "blur(3px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "4%", left: "36%",
          width: 360, height: 360,
          background: "radial-gradient(circle, rgba(28, 210, 238, 0.34) 0%, rgba(99, 102, 241, 0.20) 48%, transparent 70%)",
          animation: "orb-drift-2 20s ease-in-out infinite reverse",
          filter: "blur(2px)",
          willChange: "transform",
        }}
      />

      {/* Fine grid — crisp lines for refraction to distort */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.030) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.030) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dot matrix — adds depth and texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
