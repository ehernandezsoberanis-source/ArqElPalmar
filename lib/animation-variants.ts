import type { Transition, Variants } from "framer-motion";

export const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const quickTransition: Transition = {
  duration: 0.45,
  ease: cinematicEase,
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.46, ease: cinematicEase },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
    transition: { duration: 0.32, ease: cinematicEase },
  },
};

export const reducedPageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.14, ease: "linear" } },
  exit: { opacity: 0, transition: { duration: 0.1, ease: "linear" } },
};

export const sectionRevealVariants = (withBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 20, filter: withBlur ? "blur(6px)" : "blur(0px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: quickTransition,
  },
});

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const fadeUpItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: quickTransition },
};

export const cardTitleHoverVariants: Variants = {
  rest: { y: 0 },
  hover: { y: -3, transition: { duration: 0.4, ease: cinematicEase } },
};

export const viewIndicatorVariants: Variants = {
  rest: { opacity: 0, x: -8 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.35, ease: cinematicEase } },
};

export const buttonUnderlineVariants: Variants = {
  rest: { scaleX: 0, transformOrigin: "left" },
  hover: { scaleX: 1, transformOrigin: "left", transition: { duration: 0.4, ease: cinematicEase } },
};

export const tactileCardVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "var(--shadow-card-rest)",
  },
  hover: {
    y: -6,
    boxShadow: "var(--shadow-card-hover)",
    transition: { duration: 0.3, ease: cinematicEase },
  },
};

export const tactileImageVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: cinematicEase } },
};

export const tactileOverlayVariants: Variants = {
  rest: { backgroundColor: "rgba(0,0,0,0)" },
  hover: { backgroundColor: "rgba(0,0,0,0.16)", transition: { duration: 0.28, ease: cinematicEase } },
};

export const tactileProjectCardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "var(--shadow-project-rest)",
    borderColor: "var(--color-border)",
  },
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: "var(--shadow-project-hover)",
    borderColor: "var(--color-border-strong)",
    transition: { duration: 0.3, ease: cinematicEase },
  },
};

export const tactileProjectOverlayRevealVariants: Variants = {
  rest: { opacity: 0, y: 8 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease: cinematicEase } },
};

export const tactileProjectImageZoomVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.3, ease: cinematicEase } },
};

export const editorialHierarchyContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

export const editorialHierarchyItemVariants = (withBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 14, filter: withBlur ? "blur(6px)" : "blur(0px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: cinematicEase },
  },
});

export const editorialCardsContainerVariants = (delayChildren: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren: 0.075,
    },
  },
});

export const editorialCardItemVariants = (withBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 18, filter: withBlur ? "blur(8px)" : "blur(0px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: cinematicEase },
  },
});

export type FeaturedProjectsRevealMode = "vertical" | "horizontal";

export const featuredProjectsContainerVariants = (stagger = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.06,
    },
  },
});

export const featuredProjectItemVariants = (
  index: number,
  mode: FeaturedProjectsRevealMode,
  reducedMotion: boolean,
): Variants => {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.24, ease: "linear" },
      },
    };
  }

  if (mode === "horizontal") {
    // Even cards from left, odd cards from right.
    return {
      hidden: { opacity: 0, x: index % 2 === 0 ? -40 : 40, filter: "blur(6px)" },
      visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.52, ease: cinematicEase },
      },
    };
  }

  // Editorial default: bottom-to-top.
  return {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.52, ease: cinematicEase },
    },
  };
};
