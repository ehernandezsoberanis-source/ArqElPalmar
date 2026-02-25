"use client";

import { useEffect, useState } from "react";

export function useReducedMotionSafe() {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => setReduced(mediaQuery.matches);
    const frameId = window.requestAnimationFrame(updatePreference);

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      window.cancelAnimationFrame(frameId);
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return reduced;
}
