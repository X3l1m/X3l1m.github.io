"use client";

import { useT } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useT();

  return (
    <footer className="border-t border-border/50 px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-muted">
        <span>&copy; {new Date().getFullYear()} Selim Yildirim</span>
        <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
        <span>{t.footer_built}</span>
      </div>
    </footer>
  );
}
