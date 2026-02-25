"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cinematicEase } from "@/lib/animation-variants";
import { AnimatedHeadline } from "@/components/animated-headline";
import { useHeroCompressionMotion } from "@/lib/scroll-animation";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type HeroHomeProps = {
  eyebrow: string;
  title: string;
  subheadline: string;
  secondaryLine: string;
};

export function HeroHome({ eyebrow, title, subheadline, secondaryLine }: HeroHomeProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotionSafe();
  const disableIntroAnimation = reducedMotion !== false;
  // Track scroll only inside this hero section.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  // Use first part of hero scroll to drive typography + compression.
  const compressionProgress = useTransform(scrollYProgress, [0, 0.52], [0, 1], { clamp: true });

  const {
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
  } = useHeroCompressionMotion(compressionProgress, reducedMotion === true);
  const heroBorderColor = useTransform(heroBorderAlpha, (value) => `rgba(255, 255, 255, ${value})`);

  return (
    <section ref={containerRef} className="relative isolate h-[150vh]">
      <motion.div
        className="sticky top-0 flex items-end overflow-hidden border border-transparent"
        style={{
          height: heroHeight,
          borderRadius: heroRadius,
          borderColor: heroBorderColor,
        }}
      >
        <motion.video
          style={{ y: mediaY, scale: mediaScale }}
          className="absolute inset-0 -z-20 h-[112%] w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23d9d1c5'/%3E%3Cstop offset='1' stop-color='%23efe8de'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='900' fill='url(%23a)'/%3E%3C/svg%3E"
        >
          <source src="/media/hero-architecture.mp4" type="video/mp4" />
        </motion.video>

        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 -z-10 bg-gradient-to-t from-black/72 via-black/34 to-black/12" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12 lg:pb-18">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-white/75"
            initial={disableIntroAnimation ? false : { opacity: 0, y: 14 }}
            animate={disableIntroAnimation ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: cinematicEase }}
          >
            {eyebrow}
          </motion.p>

          <motion.div
            style={{ scale: headlineScale, y: headlineY }}
            className="mt-6 origin-center"
          >
            <AnimatedHeadline
              text={title}
              className="max-w-5xl text-4xl leading-[0.95] text-white sm:text-6xl lg:text-7xl"
            />
          </motion.div>

          <motion.div style={{ y: copyY, maxWidth: subMaxWidth }}>
            <motion.p
              style={{
                scale: subheadlineScale,
                opacity: subheadlineOpacity,
                y: subheadlineY,
                filter: subheadlineBlur,
              }}
              className="mt-7 text-sm leading-relaxed text-white/82 sm:text-base"
              initial={disableIntroAnimation ? false : { opacity: 0, y: 10 }}
              animate={disableIntroAnimation ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.72, ease: cinematicEase }}
            >
              {subheadline}
            </motion.p>

            <motion.p
              style={{
                scale: secondaryScale,
                opacity: secondaryOpacity,
                y: secondaryY,
                filter: secondaryBlur,
              }}
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/66 sm:text-[15px]"
              initial={disableIntroAnimation ? false : { opacity: 0, y: 10 }}
              animate={disableIntroAnimation ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.92, ease: cinematicEase }}
            >
              {secondaryLine}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-white/68"
          style={{ opacity: scrollCueOpacity, y: scrollCueY }}
        >
          <span>Scroll</span>
          <span className="h-8 w-px bg-white/45" />
        </motion.div>
      </motion.div>
    </section>
  );
}
