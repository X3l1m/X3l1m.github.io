import type { CSSProperties, ElementType, ReactNode } from "react";

/*
 * GlassPanel — the single source of truth for every frosted-glass surface
 * in the portfolio.
 *
 * Visual recipe (matching high-end glassmorphism):
 *   • Very low-opacity background so the page content shows through
 *   • Strong blur + saturation boost for the frosted look
 *   • Hairline border at ~20% white opacity
 *   • Top-edge bright line  → light hitting the upper face of the pane
 *   • Bottom-edge dark line → depth / shadow on the lower face
 *   • Left/right micro-highlights → side-face refraction
 *   • Soft radial glow at top-centre → the "thickness" illusion
 *   • Hover shimmer sweep (CSS animation via ::before, applied via class)
 *
 * Usage:
 *   <GlassPanel>…</GlassPanel>
 *   <GlassPanel radius="full" opaque>…</GlassPanel>
 *   <GlassPanel as={motion.div} opaque={false} radius="2xl">…</GlassPanel>
 */

type Radius = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
const RADII: Record<Radius, string> = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "18px",
  "2xl": "22px",
  "3xl": "28px",
  full: "9999px",
};

type Props = {
  children?: ReactNode;
  /** Border-radius preset. Default: "xl" */
  radius?: Radius;
  /** Extra inline styles (merged last, can override) */
  style?: CSSProperties;
  /** Extra Tailwind / CSS class names */
  className?: string;
  /** HTML tag or any component (e.g. motion.div, motion.button). Default: "div" */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: ElementType | any;
  /**
   * opaque=false (default) → very transparent, best for floating UI
   *   (nav, toggles, popovers sitting ON TOP of content)
   * opaque=true            → slightly more filled-in, best for content
   *   cards that need to be readable (project cards, dropdowns)
   */
  opaque?: boolean;
  /** Disable the hover shimmer sweep. Default: false */
  noShimmer?: boolean;
  [key: string]: unknown;
};

export default function GlassPanel({
  children,
  radius = "xl",
  style,
  className = "",
  as: Tag = "div",
  opaque = false,
  noShimmer = false,
  ...rest
}: Props) {
  const r = RADII[radius];

  const panelStyle: CSSProperties = {
    /* ── Background ─────────────────────────────────────────────── */
    background: opaque
      ? "rgba(255, 255, 255, 0.08)" /* cards / dropdowns */
      : "rgba(255, 255, 255, 0.05)" /* floating UI */,

    /* ── Blur ───────────────────────────────────────────────────── */
    backdropFilter: "blur(10px) saturate(180%)",
    WebkitBackdropFilter: "blur(10px) saturate(180%)",

    /* ── Shape ──────────────────────────────────────────────────── */
    borderRadius: r,

    /* ── Border ─────────────────────────────────────────────────── */
    border: "1px solid rgba(255, 255, 255, 0.18)",

    /* ── Layered box-shadow ─────────────────────────────────────── *
     *  1. Outer drop shadow      → separates panel from background   *
     *  2. Top-edge highlight     → light on the top glass face        *
     *  3. Bottom-edge shadow     → ground-shadow / depth              *
     *  4-5. Side micro-glints    → left/right face refraction         */
    boxShadow: [
      "0 8px 32px rgba(0, 0, 0, 0.25)",
      "inset 0  1px 0 rgba(255, 255, 255, 0.22)",
      "inset 0 -1px 0 rgba(0,   0,   0,   0.14)",
      "inset  1px 0 0 rgba(255, 255, 255, 0.08)",
      "inset -1px 0 0 rgba(255, 255, 255, 0.08)",
    ].join(", "),

    position: "relative",
    overflow: "hidden",

    ...style,
  };

  return (
    <Tag
      className={`glass-panel${noShimmer ? "" : " glass-panel--shimmer"} ${className}`}
      style={panelStyle}
      {...rest}
    >
      {/* Radial top-centre glow — simulates light refracting through the glass */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.10) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* All children sit above the glow */}
      <span style={{ position: "relative", zIndex: 1, display: "contents" }}>
        {children}
      </span>
    </Tag>
  );
}
