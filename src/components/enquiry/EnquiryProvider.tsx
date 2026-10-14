"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { LandingConfig } from "@/data/landing";
import EnquiryModal from "./EnquiryModal";
import PackageQuickView from "../packages/PackageQuickView";

type Enquiry = { packageId?: string; source: string };

type Ctx = {
  config: LandingConfig;
  open: (e: Enquiry) => void;
  view: (packageId: string) => void;
  /** Any form on the page submitted — stops the recurring popup. */
  leadSubmitted: () => void;
};

const LandingContext = createContext<Ctx | null>(null);

function useCtx() {
  const ctx = useContext(LandingContext);
  if (!ctx) throw new Error("Landing components must be rendered inside <EnquiryProvider>");
  return ctx;
}

/** The destination config of the page being rendered. */
export const useLanding = () => useCtx().config;
export const useEnquiry = () => {
  const { open, view } = useCtx();
  return { open, view };
};
export const useLeadSubmitted = () => useCtx().leadSubmitted;

// Offer popup: first nudge shortly after landing, then again every 2 minutes
// after it is closed — until the visitor submits a form on the page. A
// submitted lead is remembered in localStorage so it never nags them again.
const FIRST_POPUP_MS = 6000;
const REPEAT_POPUP_MS = 2 * 60 * 1000;

function hasSubmitted(key: string) {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function markSubmitted(key: string) {
  try {
    localStorage.setItem(key, "1");
  } catch {
    /* storage blocked — the popup simply keeps its 2-minute rhythm */
  }
}

export default function EnquiryProvider({ config, children }: { config: LandingConfig; children: React.ReactNode }) {
  const [active, setActive] = useState<Enquiry | null>(null);
  // Package shown in the quick-view popup (card "View" button).
  const [viewing, setViewing] = useState<string | null>(null);
  const storageKey = `sr-lead-submitted-${config.slug}`;

  const open = useCallback((e: Enquiry) => {
    setViewing(null);
    setActive(e);
  }, []);
  const view = useCallback((packageId: string) => setViewing(packageId), []);
  const closeView = useCallback(() => setViewing(null), []);

  // Any popup closing (auto or opened from a card) switches to the 2-minute rhythm.
  const shownRef = useRef(false);

  // Re-armed whenever nothing is open: the countdown restarts after each close,
  // and never runs while the visitor is reading a package or filling a form.
  useEffect(() => {
    if (active || viewing) return;
    const t = setTimeout(
      () => {
        if (hasSubmitted(storageKey)) return;
        setActive({ source: "auto-popup" });
      },
      shownRef.current ? REPEAT_POPUP_MS : FIRST_POPUP_MS,
    );
    return () => clearTimeout(t);
  }, [active, viewing, storageKey]);

  const leadSubmitted = useCallback(() => markSubmitted(storageKey), [storageKey]);

  const close = useCallback(
    (submitted: boolean) => {
      if (submitted) markSubmitted(storageKey);
      shownRef.current = true;
      setActive(null);
    },
    [storageKey],
  );

  return (
    <LandingContext.Provider value={{ config, open, view, leadSubmitted }}>
      {children}
      {viewing && !active && <PackageQuickView packageId={viewing} onClose={closeView} />}
      {active && <EnquiryModal packageId={active.packageId} source={active.source} onClose={close} />}
    </LandingContext.Provider>
  );
}
