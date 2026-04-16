"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface LiteModeContextValue {
  isLiteMode: boolean;
  toggle: () => void;
}

const LiteModeContext = createContext<LiteModeContextValue>({
  isLiteMode: false,
  toggle: () => {},
});

const STORAGE_KEY = "sentuh-lite-mode";

export function LiteModeProvider({ children }: { children: React.ReactNode }) {
  const [isLiteMode, setIsLiteMode] = useState(false);

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      setIsLiteMode(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // Private browsing or blocked storage — degrade gracefully
    }
  }, []);

  function toggle() {
    setIsLiteMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  }

  return (
    <LiteModeContext.Provider value={{ isLiteMode, toggle }}>
      {children}
    </LiteModeContext.Provider>
  );
}

export function useLiteMode() {
  return useContext(LiteModeContext);
}
