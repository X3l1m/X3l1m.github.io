"use client";

import { useT } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useT();

  return (
    <footer
      className="border-t border-border px-6 py-8"
      style={{ background: "var(--background-2)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">Selim Yildirim</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent-from)", boxShadow: "0 0 6px var(--accent-from)" }}
          />
          {t.footer_built}
        </span>
      </div>
    </footer>
  );
}
