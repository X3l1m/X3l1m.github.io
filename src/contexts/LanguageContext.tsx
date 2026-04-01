"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { SOURCE_STRINGS, type Strings } from "@/lib/strings";
import { translateStrings, getLanguages, type LangOption } from "@/lib/translator";

type Ctx = {
  lang: string;
  setLang: (code: string) => void;
  t: Strings;
  isTranslating: boolean;
  languages: LangOption[];
  langsLoading: boolean;
};

const LanguageContext = createContext<Ctx>(null!);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("en");
  const [t, setT] = useState<Strings>(SOURCE_STRINGS as Strings);
  const [isTranslating, setIsTranslating] = useState(false);
  const [languages, setLanguages] = useState<LangOption[]>([]);
  const [langsLoading, setLangsLoading] = useState(false);

  const applyLang = useCallback(async (code: string) => {
    setLangState(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_lang", code);
      document.documentElement.lang = code;
    }

    if (code === "en") {
      setT(SOURCE_STRINGS as Strings);
      return;
    }

    setIsTranslating(true);
    try {
      const translated = await translateStrings(
        SOURCE_STRINGS as Record<string, string>,
        code
      );
      setT(translated as Strings);
    } catch {
      setT(SOURCE_STRINGS as Strings);
    } finally {
      setIsTranslating(false);
    }
  }, []);

  // Restore saved language on mount
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("portfolio_lang")
        : null;
    if (saved && saved !== "en") applyLang(saved);
  }, [applyLang]);

  // Load language list
  useEffect(() => {
    setLangsLoading(true);
    getLanguages()
      .then(setLanguages)
      .catch(() => {})
      .finally(() => setLangsLoading(false));
  }, []);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang: applyLang, t, isTranslating, languages, langsLoading }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  return useContext(LanguageContext);
}
