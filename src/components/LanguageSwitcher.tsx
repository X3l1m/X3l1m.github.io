"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/contexts/LanguageContext";
import glass from "./Glass.module.css";

function GlobeIcon() {
  return (
    <svg width="0.8125rem" height="0.8125rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="0.8125rem" height="0.8125rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
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

  const PINNED = ["en", "nl"];

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
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 80 }}>
      {/* Trigger */}
      <motion.button
        className={glass.surface}
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        aria-label="Change language"
        whileTap={{ scale: 0.94 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.4375rem 0.8125rem",
          borderRadius: 999,
          color: "var(--muted)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
        }}
      >
        {isTranslating ? <Spinner /> : <GlobeIcon />}
        <span>{displayCode}</span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={glass.surface}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 0.5rem)",
              left: 0,
              width: "min(13.75rem, calc(100vw - 2rem))",
              borderRadius: "0.875rem",
              overflow: "hidden",
            }}
          >
            {/* Search */}
            <div style={{ padding: "0.5rem 0.625rem", borderBottom: "1px solid var(--border)" }}>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search languages…"
                style={{
                  width: "100%",
                  background: "var(--surface)",
                  border: "1px solid var(--border-2)",
                  borderRadius: "0.5rem",
                  padding: "0.3125rem 0.625rem",
                  fontSize: "0.75rem",
                  color: "var(--foreground)",
                  outline: "none",
                }}
              />
            </div>

            {/* List */}
            <div style={{ maxHeight: "min(13.75rem, 60dvh)", overflowY: "auto" }}>
              {langsLoading ? (
                <div style={{ padding: "1rem", textAlign: "center", color: "var(--muted-2)", fontSize: "0.75rem" }}>
                  Loading…
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: "1rem", textAlign: "center", color: "var(--muted-2)", fontSize: "0.75rem" }}>
                  No results
                </div>
              ) : (
                filtered.map((l, idx) => (
                  <div key={l.code}>
                    {!search && idx === PINNED.length && (
                      <div style={{ margin: "0.25rem 0.625rem", borderTop: "1px solid var(--border)" }} />
                    )}
                    <button
                      onClick={() => { setLang(l.code); setOpen(false); setSearch(""); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0.4375rem 0.75rem",
                        background: l.code === lang ? "var(--glow-from)" : "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: l.code === lang ? "var(--accent-from)" : "var(--muted)",
                        fontSize: "0.75rem",
                        textAlign: "left",
                        transition: "background 0.15s, color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (l.code !== lang) {
                          (e.currentTarget as HTMLButtonElement).style.background = "var(--surface)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (l.code !== lang) {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
                        }
                      }}
                    >
                      <span>{l.name}</span>
                      <span style={{ fontSize: "0.625rem", color: l.code === lang ? "var(--accent-from)" : "var(--muted-2)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                        {l.code.toUpperCase()}
                      </span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
