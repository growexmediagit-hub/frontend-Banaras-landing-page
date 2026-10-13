"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { LandingConfig } from "@/data/landing";
import EnquiryModal from "./EnquiryModal";

type Enquiry = { packageId?: string; source: string };

type Ctx = { config: LandingConfig; open: (e: Enquiry) => void };

const LandingContext = createContext<Ctx | null>(null);

function useCtx() {
  const ctx = useContext(LandingContext);
  if (!ctx) throw new Error("Landing components must be rendered inside <EnquiryProvider>");
  return ctx;
}

/** The destination config of the page being rendered. */
export const useLanding = () => useCtx().config;
export const useEnquiry = () => ({ open: useCtx().open });

// Offer popup timing — first nudge after a short read, one reminder later.
// atravelq re-opens every 30s; for a client-facing brand page that felt pushy,
// so this stops after the second showing, on submit, or once dismissed twice.
const FIRST_POPUP_MS = 6000;
const SECOND_POPUP_MS = 45000;

type PopupState = { submitted?: boolean; dismissed?: number };

function readState(key: string): PopupState {
  try {
    return JSON.parse(sessionStorage.getItem(key) ?? "{}");
  } catch {
    return {};
  }
}

function writeState(key: string, patch: PopupState) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ ...readState(key), ...patch }));
  } catch {
    /* storage blocked — popup just won't remember */
  }
}

export default function EnquiryProvider({ config, children }: { config: LandingConfig; children: React.ReactNode }) {
  const [active, setActive] = useState<Enquiry | null>(null);
  const storageKey = `sr-enquiry-${config.slug}`;

  const open = useCallback((e: Enquiry) => setActive(e), []);

  useEffect(() => {
    const nudge = () => {
      const s = readState(storageKey);
      if (s.submitted || (s.dismissed ?? 0) >= 2) return;
      // Never replace an enquiry the visitor opened themselves.
      setActive(prev => prev ?? { source: "auto-popup" });
    };
    const t1 = setTimeout(nudge, FIRST_POPUP_MS);
    const t2 = setTimeout(nudge, SECOND_POPUP_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [storageKey]);

  const close = useCallback(
    (submitted: boolean) => {
      if (submitted) writeState(storageKey, { submitted: true });
      else writeState(storageKey, { dismissed: (readState(storageKey).dismissed ?? 0) + 1 });
      setActive(null);
    },
    [storageKey],
  );

  return (
    <LandingContext.Provider value={{ config, open }}>
      {children}
      {active && <EnquiryModal packageId={active.packageId} source={active.source} onClose={close} />}
    </LandingContext.Provider>
  );
}
