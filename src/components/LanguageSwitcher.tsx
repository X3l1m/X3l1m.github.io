"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/contexts/LanguageContext";

function GlobeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-spin"
    >
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
          l.code.toLowerCase().includes(search.toLowerCase())
      )
    : sorted;

  // Close on outside click
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

  // Focus search when dropdown opens
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  return (
    <div
      ref={ref}
      style={{ position: "fixed", top: 16, left: 16, zIndex: 80 }}
    >
      {/* Trigger */}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setSearch("");
        }}
        aria-label="Change language"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(12,12,18,0.6)",
          backdropFilter: "blur(16px) saturate(1.8)",
          WebkitBackdropFilter: "blur(16px) saturate(1.8)",
          color: "#a1a1aa",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "color 0.2s, border-color 0.2s",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#e4e4e7";
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "rgba(99,102,241,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#a1a1aa";
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "rgba(255,255,255,0.08)";
        }}
      >
        {isTranslating ? <Spinner /> : <GlobeIcon />}
        <span>{displayCode}</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              width: 220,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(12,12,18,0.65)",
              backdropFilter: "blur(16px) saturate(1.8)",
              WebkitBackdropFilter: "blur(16px) saturate(1.8)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            {/* Search */}
            <div
              style={{
                padding: "8px 10px",
                borderBottom: "1px solid rgba(63,63,70,0.5)",
              }}
            >
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search languages…"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(63,63,70,0.5)",
                  borderRadius: 6,
                  padding: "5px 9px",
                  fontSize: 12,
                  color: "#e4e4e7",
                  outline: "none",
                }}
              />
            </div>

            {/* List */}
            <div style={{ maxHeight: 220, overflowY: "auto" }}>
              {langsLoading ? (
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    color: "#52525b",
                    fontSize: 12,
                  }}
                >
                  Loading…
                </div>
              ) : filtered.length === 0 ? (
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    color: "#52525b",
                    fontSize: 12,
                  }}
                >
                  No results
                </div>
              ) : (
                filtered.map((l, idx) => (
                  <div key={l.code}>
                    {!search && idx === PINNED.length && (
                      <div
                        style={{
                          margin: "4px 10px",
                          borderTop: "1px solid rgba(63,63,70,0.5)",
                        }}
                      />
                    )}
                    <button
                      onClick={() => {
                        setLang(l.code);
                        setOpen(false);
                        setSearch("");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "7px 12px",
                        background:
                          l.code === lang
                            ? "rgba(99,102,241,0.12)"
                            : "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: l.code === lang ? "#a5b4fc" : "#a1a1aa",
                        fontSize: 12,
                        textAlign: "left",
                        transition: "background 0.15s, color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (l.code !== lang) {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "rgba(255,255,255,0.04)";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#e4e4e7";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (l.code !== lang) {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#a1a1aa";
                        }
                      }}
                    >
                      <span>{l.name}</span>
                      <span
                        style={{
                          fontSize: 10,
                          color: l.code === lang ? "#6366f1" : "#3f3f46",
                          fontFamily: "monospace",
                          letterSpacing: "0.04em",
                        }}
                      >
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
