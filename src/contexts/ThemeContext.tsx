"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Origin: bottom-right corner (where the toggle button lives)
    const x = window.innerWidth - 48;
    const y = window.innerHeight - 48;
    const maxR = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Wavy clip-path keyframes using SVG-style polygon approximation of a circle
    // We animate clip-path from a tiny circle to full coverage
    const startClip = `circle(0px at ${x}px ${y}px)`;
    const endClip   = `circle(${maxR}px at ${x}px ${y}px)`;

    // Apply new theme immediately (hidden under the old one via clip-path)
    root.setAttribute("data-theme", next);

    // Animate the reveal using View Transitions API if available, else WAAPI
    if (document.startViewTransition) {
      // Already changed data-theme above — undo it, let VT handle it
      root.setAttribute("data-theme", theme);
      const vt = document.startViewTransition(() => {
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });
      vt.ready.then(() => {
        document.documentElement.animate(
          [
            { clipPath: startClip },
            { clipPath: endClip },
          ],
          {
            duration: 750,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
      vt.finished.then(() => setTheme(next));
    } else {
      // Fallback: WAAPI on a cover div
      const cover = document.createElement("div");
      cover.style.cssText = `
        position:fixed; inset:0; z-index:9999; pointer-events:none;
        background:var(--background); clip-path:${startClip};
      `;
      document.body.appendChild(cover);

      const anim = cover.animate(
        [{ clipPath: startClip }, { clipPath: endClip }],
        { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
      );

      anim.onfinish = () => {
        document.body.removeChild(cover);
      };

      setTheme(next);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
