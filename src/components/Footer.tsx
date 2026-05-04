"use client";

import { useT } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative px-6 py-12 border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-4)" }}>
            © {year} · Selim Yildirim
          </p>
          <p className="text-sm" style={{ color: "var(--fg-3)" }}>
            {t.footer_built}
          </p>
        </div>

        <a
          href="#hero"
          className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: "var(--fg-3)" }}
        >
          <span className="underline-anim">Back to top</span>
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </a>
      </div>
    </footer>
  );
}
