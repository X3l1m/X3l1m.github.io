"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

const DISPLACEMENT_MAP = "/displacement-map.png";
const SPECULAR_MAP = "/specular-map.png";

const BASE_SCALE = 122.8;

/* ─────────────────────────────────────────────
   Static SVG filters — one per droplet size,
   NO React re-renders. Params mutated via DOM refs.
───────────────────────────────────────────── */
function LiquidFilter({ id, size }: { id: string; size: number }) {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      aria-hidden="true"
    >
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB">
          {/* Displacement map — fills element exactly */}
          <feImage
            href={DISPLACEMENT_MAP}
            x={0} y={0}
            width={size} height={size}
            preserveAspectRatio="xMidYMid slice"
            result="disp_map"
          />
          <feDisplacementMap
            id={`${id}-disp`}
            in="SourceGraphic"
            in2="disp_map"
            scale={BASE_SCALE}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Saturation boost */}
          <feColorMatrix in="displaced" type="saturate" values="4" result="saturated" />
          {/* Specular highlight */}
          <feImage
            href={SPECULAR_MAP}
            x={0} y={0}
            width={size} height={size}
            preserveAspectRatio="xMidYMid slice"
            result="specular"
          />
          <feComponentTransfer in="specular" result="spec_faded">
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
          <feBlend in="spec_faded" in2="saturated" mode="normal" />
        </filter>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Droplet configs
───────────────────────────────────────────── */
interface DropletConfig {
  id: number;
  size: number;
  x: number;
  y: number;
  floatDuration: number;
  floatDelay: number;
}

const DROPLETS: DropletConfig[] = [
  { id: 1, size: 150, x: 0.07, y: 0.22, floatDuration: 7,   floatDelay: 0 },
  { id: 2, size: 105, x: 0.88, y: 0.14, floatDuration: 5.5, floatDelay: 1.2 },
  { id: 3, size: 78,  x: 0.03, y: 0.72, floatDuration: 6,   floatDelay: 0.6 },
  { id: 4, size: 125, x: 0.84, y: 0.68, floatDuration: 8,   floatDelay: 2 },
  { id: 5, size: 58,  x: 0.16, y: 0.52, floatDuration: 6.5, floatDelay: 0.3 },
];

/* ─────────────────────────────────────────────
   Individual droplet — all animation via
   MotionValues, zero setState during motion
───────────────────────────────────────────── */
function Droplet({ config }: { config: DropletConfig }) {
  const filterId = `lg-${config.id}`;
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);

  // 0=idle, 1=active
  const isActive = useMotionValue<number>(0);
  const velocityX = useMotionValue<number>(0);

  // Mutate SVG scale attribute directly — no React re-render
  const dispScale = useSpring(
    useTransform(isActive, [0, 1], [BASE_SCALE * 0.75, BASE_SCALE]),
    { stiffness: 280, damping: 24 }
  );
  useEffect(() => {
    return dispScale.on("change", (v) => {
      dispRef.current?.setAttribute("scale", String(v));
    });
  }, [dispScale]);

  // Assign ref after mount
  useEffect(() => {
    dispRef.current = document.getElementById(`${filterId}-disp`) as SVGFEDisplacementMapElement | null;
  }, [filterId]);

  /* ── Box shadow (pure MotionValue, no state) ── */
  const shadowX    = useSpring(useTransform(isActive, [0, 1], [0,    4]),    { stiffness: 280, damping: 26 });
  const shadowY    = useSpring(useTransform(isActive, [0, 1], [4,    16]),   { stiffness: 280, damping: 26 });
  const shadowBlur = useSpring(useTransform(isActive, [0, 1], [9,    24]),   { stiffness: 280, damping: 26 });
  const shadowOp   = useSpring(useTransform(isActive, [0, 1], [0.16, 0.22]), { stiffness: 280, damping: 26 });
  const insetOp    = useSpring(useTransform(isActive, [0, 1], [0.20, 0.27]), { stiffness: 280, damping: 26 });

  const boxShadow = useTransform(
    [shadowX, shadowY, shadowBlur, shadowOp, insetOp],
    ([sx, sy, sb, so, io]: number[]) =>
      `${sx}px ${sy}px ${sb}px rgba(0,0,0,${so}),` +
      `inset ${sx / 2}px ${sy / 2}px 24px rgba(0,0,0,${io}),` +
      `inset ${-sx / 2}px ${-sy / 2}px 24px rgba(255,255,255,${io})`
  );

  /* ── Squish (pure MotionValue) ── */
  const baseScale = useSpring(
    useTransform(isActive, [0, 1], [0.92, 1]),
    { stiffness: 340, damping: 20 }
  );
  const scaleYRaw = useTransform(
    [baseScale, velocityX],
    ([bs, vx]: number[]) => bs * Math.max(0.72, 1 - Math.abs(vx) / 5000)
  );
  const scaleXRaw = useTransform(
    [baseScale, scaleYRaw],
    ([bs, sy]: number[]) => bs + (1 - sy)
  );
  const scaleY = useSpring(scaleYRaw, { stiffness: 340, damping: 30 });
  const scaleX = useSpring(scaleXRaw, { stiffness: 340, damping: 30 });

  /* ── Float pause uses CSS, only one boolean state ── */
  const [isDragging, setIsDragging] = useState(false);

  /* ── Pointer-up reset ── */
  useEffect(() => {
    const reset = () => { isActive.set(0); velocityX.set(0); };
    window.addEventListener("pointerup", reset);
    window.addEventListener("touchend", reset);
    return () => {
      window.removeEventListener("pointerup", reset);
      window.removeEventListener("touchend", reset);
    };
  }, [isActive, velocityX]);

  return (
    <div
      style={{
        position: "fixed",
        left: `calc(${config.x * 100}vw - ${config.size / 2}px)`,
        top:  `calc(${config.y * 100}vh - ${config.size / 2}px)`,
        zIndex: 40,
        pointerEvents: "none",
        willChange: "transform",
        animation: isDragging
          ? "none"
          : `glass-float ${config.floatDuration}s ease-in-out ${config.floatDelay}s infinite`,
      }}
    >
      {/* SVG filter lives here — purely static after mount */}
      <LiquidFilter id={filterId} size={config.size} />

      <motion.div
        drag
        dragMomentum
        dragTransition={{ bounceStiffness: 180, bounceDamping: 18 }}
        onMouseDown={() => isActive.set(1)}
        onTouchStart={() => isActive.set(1)}
        onDrag={(_, info) => velocityX.set(info.velocity.x)}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => { setIsDragging(false); velocityX.set(0); isActive.set(0); }}
        style={{
          width: config.size,
          height: config.size,
          borderRadius: "50%",
          scaleX,
          scaleY,
          pointerEvents: "auto",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
          userSelect: "none",
          position: "relative",
          willChange: "transform",
        }}
      >
        {/* Lens — transparent, SVG filter on backdrop does all the work */}
        <motion.div
          className="absolute inset-0 ring-1 ring-white/10"
          style={{
            borderRadius: "50%",
            backdropFilter: `url(#${filterId})`,
            WebkitBackdropFilter: "blur(10px) saturate(1.6) brightness(1.08)",
            boxShadow,
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Root export
───────────────────────────────────────────── */
export default function GlassDroplets() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

  const visible = isMobile ? DROPLETS.slice(0, 2) : DROPLETS;

  return (
    <>
      {visible.map((cfg) => (
        <Droplet key={cfg.id} config={cfg} />
      ))}
    </>
  );
}
