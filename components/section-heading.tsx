"use client";

import { motion } from "framer-motion";
import { fadeUpItemVariants, staggerContainerVariants } from "@/lib/animation-variants";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      className="max-w-3xl space-y-4"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {eyebrow ? (
        <motion.p variants={fadeUpItemVariants} className="text-xs tracking-[0.25em] uppercase text-black/55">
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2 variants={fadeUpItemVariants} className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={fadeUpItemVariants} className="max-w-2xl text-sm leading-relaxed text-black/65 sm:text-base">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
