"use client";

import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/animation-variants";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type AnimatedHeadlineProps = {
  text: string;
  className?: string;
  stagger?: number;
};

export function AnimatedHeadline({ text, className, stagger = 0.045 }: AnimatedHeadlineProps) {
  const reducedMotion = useReducedMotionSafe();
  const words = text.split(" ");

  // Keep SSR and first client paint deterministic: render plain text first.
  // After mount, if reduced motion is disabled, switch to staggered reveal.
  if (reducedMotion !== false) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.06,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: cinematicEase },
            },
          }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.h1>
  );
}
