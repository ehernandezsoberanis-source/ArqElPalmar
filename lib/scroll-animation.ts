import { useTransform, type MotionValue } from "framer-motion";

type HeroCompressionMotion = {
  heroHeight: MotionValue<string>;
  heroRadius: MotionValue<number>;
  heroBorderAlpha: MotionValue<number>;
  mediaY: MotionValue<number>;
  mediaScale: MotionValue<number>;
  overlayOpacity: MotionValue<number>;
  headlineScale: MotionValue<number>;
  headlineY: MotionValue<number>;
  copyY: MotionValue<number>;
  subMaxWidth: MotionValue<number>;
  subheadlineScale: MotionValue<number>;
  secondaryScale: MotionValue<number>;
  subheadlineOpacity: MotionValue<number>;
  subheadlineY: MotionValue<number>;
  subheadlineBlur: MotionValue<string>;
  secondaryOpacity: MotionValue<number>;
  secondaryY: MotionValue<number>;
  secondaryBlur: MotionValue<string>;
  scrollCueOpacity: MotionValue<number>;
  scrollCueY: MotionValue<number>;
};

export function useHeroCompressionMotion(compressionProgress: MotionValue<number>, reducedMotion: boolean): HeroCompressionMotion {
  // Scroll compression range is handled outside. These transforms map
  // progress (0..1) into cinematic but subtle values for the hero.
  const heroHeight = useTransform(compressionProgress, [0, 1], ["100vh", reducedMotion ? "100vh" : "74vh"]);
  const heroRadius = useTransform(compressionProgress, [0, 1], [0, reducedMotion ? 0 : 18]);
  const heroBorderAlpha = useTransform(compressionProgress, [0, 1], [0, reducedMotion ? 0 : 0.14]);

  const mediaY = useTransform(compressionProgress, [0, 1], [0, reducedMotion ? 0 : 40]);
  const mediaScale = useTransform(compressionProgress, [0, 1], [1.06, reducedMotion ? 1.06 : 1.1]);
  const overlayOpacity = useTransform(compressionProgress, [0, 1], [0.34, reducedMotion ? 0.34 : 0.5]);

  // Scale tuning:
  // Headline leads the motion: subtle growth from 1 to 1.08.
  const headlineScale = useTransform(compressionProgress, [0, 1], [1, reducedMotion ? 1 : 1.08]);
  const headlineY = useTransform(compressionProgress, [0, 1], [0, reducedMotion ? 0 : -24]);

  const copyY = useTransform(compressionProgress, [0, 1], [0, reducedMotion ? 0 : -12]);
  const subMaxWidth = useTransform(compressionProgress, [0, 1], [760, reducedMotion ? 760 : 640]);
  // Subheadline follows with slightly delayed and softer scale growth.
  const subheadlineScale = useTransform(compressionProgress, [0.14, 0.86], [1, reducedMotion ? 1 : 1.04]);
  const secondaryScale = useTransform(compressionProgress, [0.22, 0.92], [1, reducedMotion ? 1 : 1.03]);

  // Keep the previous storytelling behavior: subheadline appears first, then secondary line.
  const subheadlineOpacity = useTransform(compressionProgress, [0.08, 0.42], [0, 1]);
  const subheadlineY = useTransform(compressionProgress, [0.08, 0.42], [16, 0]);
  const subheadlineBlur = useTransform(
    compressionProgress,
    [0.08, 0.42],
    [reducedMotion ? "blur(0px)" : "blur(6px)", "blur(0px)"],
  );

  const secondaryOpacity = useTransform(compressionProgress, [0.3, 0.72], [0, 1]);
  const secondaryY = useTransform(compressionProgress, [0.3, 0.72], [18, 0]);
  const secondaryBlur = useTransform(
    compressionProgress,
    [0.3, 0.72],
    [reducedMotion ? "blur(0px)" : "blur(7px)", "blur(0px)"],
  );

  const scrollCueOpacity = useTransform(compressionProgress, [0, 0.5], [1, 0]);
  const scrollCueY = useTransform(compressionProgress, [0, 0.5], [0, 10]);

  return {
    heroHeight,
    heroRadius,
    heroBorderAlpha,
    mediaY,
    mediaScale,
    overlayOpacity,
    headlineScale,
    headlineY,
    copyY,
    subMaxWidth,
    subheadlineScale,
    secondaryScale,
    subheadlineOpacity,
    subheadlineY,
    subheadlineBlur,
    secondaryOpacity,
    secondaryY,
    secondaryBlur,
    scrollCueOpacity,
    scrollCueY,
  };
}
