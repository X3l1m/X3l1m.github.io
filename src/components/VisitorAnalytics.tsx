"use client";

import { useEffect } from "react";
import { recordUniqueVisitor } from "@/lib/unique-visitor";

export default function VisitorAnalytics() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      navigator.webdriver ||
      window.self !== window.top
    ) {
      return;
    }

    const record = () => {
      if (document.visibilityState !== "visible" || !navigator.onLine) return;

      try {
        void recordUniqueVisitor({
          storage: window.localStorage,
          locks: navigator.locks,
          send: (url) =>
            fetch(url, {
              mode: "no-cors",
              credentials: "omit",
              cache: "no-store",
              referrerPolicy: "no-referrer",
              keepalive: true,
            }),
        });
      } catch {
        // Some browsers deny access to localStorage itself.
      }
    };

    record();
    document.addEventListener("visibilitychange", record);
    window.addEventListener("online", record);
    return () => {
      document.removeEventListener("visibilitychange", record);
      window.removeEventListener("online", record);
    };
  }, []);

  return null;
}
