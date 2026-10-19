"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import styles from "./PointerLight.module.css";
import { surfaceLighting } from "@/lib/surfaceLighting";

const motionPreference =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const route = [[0.7, 0.25], [0.78, 0.7], [0.28, 0.76], [0.22, 0.3]];

export default function PointerLight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useSpring(0, { stiffness: 60, damping: 22 });

  useEffect(() => {
    const preference = window.matchMedia(motionPreference);
    let tracking = false;
    let targetX = 0;
    let targetY = 0;
    let waypoint = 0;
    let frame = 0;
    let lastTime = 0;
    let lastHoverCheck = 0;
    let lastLightingFrame = 0;
    let lastMeasurement = -Infinity;
    let geometryDirty = true;
    let surfaces: { element: HTMLElement; rect: DOMRect; depth: number }[] = [];

    const markGeometryDirty = () => { geometryDirty = true; };
    const lightSurfaces = (time: number) => {
      if (time - lastLightingFrame < 32) return;
      lastLightingFrame = time;
      // Read all bounds before writing styles. Scrolls invalidate viewport positions.
      if (geometryDirty || time - lastMeasurement > 250) {
        surfaces = Array.from(document.querySelectorAll<HTMLElement>("[data-light-reactive]")).map((element) => ({
          element,
          rect: element.getBoundingClientRect(),
          depth: Number(element.dataset.lightDepth || 1),
        }));
        geometryDirty = false;
        lastMeasurement = time;
      }
      for (const { element, rect, depth } of surfaces) {
        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) continue;
        for (const [property, value] of Object.entries(surfaceLighting(rect, x.get(), y.get(), depth))) {
          element.style.setProperty(property, value);
        }
      }
    };

    const resetSurfaces = () => {
      const properties = Object.keys(surfaceLighting({ left: 0, top: 0, width: 1, height: 1 }, 0, 0));
      document.querySelectorAll<HTMLElement>("[data-light-reactive]").forEach((element) => {
        properties.forEach((property) => element.style.removeProperty(property));
      });
    };

    // Switching modes changes only the destination, never the visible position.
    const startWandering = () => {
      tracking = false;
    };

    const follow = (event: MouseEvent) => {
      if (!preference.matches || ("pointerType" in event && event.pointerType === "touch")) return;
      if (event.clientX < 0 || event.clientX >= window.innerWidth ||
          event.clientY < 0 || event.clientY >= window.innerHeight) {
        startWandering();
        return;
      }
      tracking = true;
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const onOut = (event: MouseEvent) => {
      // Moving between page elements must not start the idle route.
      if (event.relatedTarget === null) startWandering();
    };

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Some embedded browsers omit boundary events when entering their chrome.
      if (tracking && time - lastHoverCheck > 200) {
        lastHoverCheck = time;
        if (!document.documentElement.matches(":hover")) startWandering();
      }

      if (!tracking) {
        let point = route[waypoint];
        targetX = point[0] * window.innerWidth;
        targetY = point[1] * window.innerHeight;
        if (Math.hypot(targetX - x.get(), targetY - y.get()) < 36) {
          waypoint = (waypoint + 1) % route.length;
          point = route[waypoint];
          targetX = point[0] * window.innerWidth;
          targetY = point[1] * window.innerHeight;
        }
      }

      const dx = targetX - x.get();
      const dy = targetY - y.get();
      const distance = Math.hypot(dx, dy);
      if (distance > 0.01) {
        // The same speed limit applies to ordinary tracking and re-entry.
        const speed = tracking ? Math.min(distance * 6, 520) : 28;
        const step = Math.min(distance, speed * delta);
        x.set(x.get() + (dx / distance) * step);
        y.set(y.get() + (dy / distance) * step);
      }
      lightSurfaces(time);
      frame = requestAnimationFrame(tick);
    };

    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (preference.matches && !document.hidden) {
        lastTime = performance.now();
        opacity.set(1);
        frame = requestAnimationFrame(tick);
      } else {
        opacity.set(0);
        resetSurfaces();
      }
    };

    const onVisibilityChange = () => {
      startWandering();
      syncAnimation();
    };

    x.set(window.innerWidth * 0.55);
    y.set(window.innerHeight * 0.45);
    syncAnimation();
    preference.addEventListener("change", syncAnimation);
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("mousemove", follow, { passive: true });
    window.addEventListener("pointerout", onOut);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("blur", startWandering);
    document.documentElement.addEventListener("pointerleave", startWandering);
    document.documentElement.addEventListener("mouseleave", startWandering);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", markGeometryDirty);
    document.addEventListener("scroll", markGeometryDirty, { capture: true, passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resetSurfaces();
      window.removeEventListener("resize", markGeometryDirty);
      document.removeEventListener("scroll", markGeometryDirty, true);
      preference.removeEventListener("change", syncAnimation);
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("mousemove", follow);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", startWandering);
      document.documentElement.removeEventListener("pointerleave", startWandering);
      document.documentElement.removeEventListener("mouseleave", startWandering);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [x, y, opacity]);

  return (
    <div className={styles.stage} aria-hidden="true">
      <motion.div className={styles.light} style={{ x, y, opacity }} />
    </div>
  );
}
