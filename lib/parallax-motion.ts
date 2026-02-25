"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

type ServicesParallaxMotion = {
  backgroundY: MotionValue<number>;
  backgroundScale: MotionValue<number>;
  contentY: MotionValue<number>;
  accentOpacity: MotionValue<number>;
};

export function useServicesParallaxMotion(
  target: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
): ServicesParallaxMotion {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  // Strength tuning:
  // backgroundY: larger value = stronger parallax drift.
  // contentY: smaller negative value keeps cards grounded.
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 50]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, reducedMotion ? 1.02 : 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -8]);
  const accentOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.38]);

  return {
    backgroundY,
    backgroundScale,
    contentY,
    accentOpacity,
  };
}
