"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageTransitionVariants, reducedPageTransitionVariants } from "@/lib/animation-variants";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotionSafe();
  const shouldReduceMotion = reducedMotion === true;

  useEffect(() => {
    // Keep transitions app-like: every route starts from top.
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [pathname, shouldReduceMotion]);

  const variants = shouldReduceMotion ? reducedPageTransitionVariants : pageTransitionVariants;

  return (
    <LayoutGroup id="route-shared-layout">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ willChange: "opacity, transform, filter" }}
          className="relative"
        >
          {!shouldReduceMotion ? (
            <motion.div
              className="pointer-events-none fixed inset-0 z-40 bg-[color:var(--color-route-overlay)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.22 }}
            />
          ) : null}
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
