"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/contexts/LanguageContext";
import GlassPanel from "./GlassPanel";

const PINNED = ["en", "nl"];

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const { lang, setLang, languages, langsLoading, isTranslating } = useT();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const currentLang = languages.find((l) => l.code === lang);
  const displayCode = (currentLang?.code ?? lang).toUpperCase().slice(0, 4);

  const sorted = [
    ...PINNED.map((code) => languages.find((l) => l.code === code)).filter(Boolean),
    ...languages.filter((l) => !PINNED.includes(l.code)),
  ] as typeof languages;

  const filtered = search
    ? sorted.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.code.toLowerCase().includes(search.toLowerCase()),
      )
    : sorted;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "fixed", top: 24, left: 24, zIndex: 70 }}>
      <GlassPanel
        as={motion.button}
        radius="full"
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        aria-label="Change language"
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          color: "var(--fg-2)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          cursor: "pointer",
        }}
      >
        {isTranslating ? <Spinner /> : <GlobeIcon />}
        <span>{displayCode}</span>
      </GlassPanel>

      <AnimatePresence>
        {open && (
          <GlassPanel
            as={motion.div}
            radius="lg"
            opaque
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: 0,
              width: 240,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--line)" }}>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search languages…"
                style={{
                  width: "100%",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: "7px 12px",
                  fontSize: 12,
                  color: "var(--fg)",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ maxHeight: 260, overflowY: "auto", padding: "4px 0" }}>
              {langsLoading ? (
                <div style={{ padding: 18, textAlign: "center", color: "var(--fg-4)", fontSize: 12 }}>
                  Loading…
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: 18, textAlign: "center", color: "var(--fg-4)", fontSize: 12 }}>
                  No results
                </div>
              ) : (
                filtered.map((l, idx) => {
                  const sel = l.code === lang;
                  return (
                    <div key={l.code}>
                      {!search && idx === PINNED.length && (
                        <div style={{ margin: "4px 12px", borderTop: "1px solid var(--line)" }} />
                      )}
                      <button
                        onClick={() => { setLang(l.code); setOpen(false); setSearch(""); }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "8px 14px",
                          background: sel ? "var(--surface-hi)" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: sel ? "var(--acc-1)" : "var(--fg-2)",
                          fontSize: 13,
                          fontWeight: sel ? 600 : 500,
                          textAlign: "left",
                          transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!sel) (e.currentTarget as HTMLButtonElement).style.background = "var(--surface)";
                        }}
                        onMouseLeave={(e) => {
                          if (!sel) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        }}
                      >
                        <span>{l.name}</span>
                        <span
                          style={{
                            fontSize: 10,
                            color: sel ? "var(--acc-1)" : "var(--fg-4)",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {l.code.toUpperCase()}
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </GlassPanel>
        )}
      </AnimatePresence>
    </div>
  );
}
