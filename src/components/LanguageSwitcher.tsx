"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/contexts/LanguageContext";
import glass from "./Glass.module.css";

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
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
    <div ref={ref} style={{ position: "fixed", top: 16, left: 16, zIndex: 80 }}>
      {/* Trigger */}
      <motion.button
        className={glass.surface}
        data-light-reactive
        data-light-depth="0.5"
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        aria-label="Change language"
        whileTap={{ scale: 0.94 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 13px",
          borderRadius: 999,
          color: "var(--muted)",
          fontSize: 11,
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
            data-light-reactive
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              width: 220,
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {/* Search */}
            <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--border)" }}>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search languages…"
                style={{
                  width: "100%",
                  background: "var(--surface)",
                  border: "1px solid var(--border-2)",
                  borderRadius: 8,
                  padding: "5px 10px",
                  fontSize: 12,
                  color: "var(--foreground)",
                  outline: "none",
                }}
              />
            </div>

            {/* List */}
            <div style={{ maxHeight: 220, overflowY: "auto" }}>
              {langsLoading ? (
                <div style={{ padding: "16px", textAlign: "center", color: "var(--muted-2)", fontSize: 12 }}>
                  Loading…
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: "16px", textAlign: "center", color: "var(--muted-2)", fontSize: 12 }}>
                  No results
                </div>
              ) : (
                filtered.map((l, idx) => (
                  <div key={l.code}>
                    {!search && idx === PINNED.length && (
                      <div style={{ margin: "4px 10px", borderTop: "1px solid var(--border)" }} />
                    )}
                    <button
                      onClick={() => { setLang(l.code); setOpen(false); setSearch(""); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "7px 12px",
                        background: l.code === lang ? "var(--glow-from)" : "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: l.code === lang ? "var(--accent-from)" : "var(--muted)",
                        fontSize: 12,
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
                      <span style={{ fontSize: 10, color: l.code === lang ? "var(--accent-from)" : "var(--muted-2)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
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
