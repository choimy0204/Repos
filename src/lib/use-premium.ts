"use client";

import { useSyncExternalStore } from "react";
import { isPremiumUnlocked, subscribePremium } from "./premium";

function getServerSnapshot() {
  return false;
}

export function usePremiumStatus(): boolean {
  return useSyncExternalStore(subscribePremium, isPremiumUnlocked, getServerSnapshot);
}
