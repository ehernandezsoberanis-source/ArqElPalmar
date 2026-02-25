"use client";

import { motion } from "framer-motion";
import { fadeUpItemVariants, sectionRevealVariants, staggerContainerVariants } from "@/lib/animation-variants";

type RevealSectionProps = {
  children: React.ReactNode;
  className?: string;
  withBlur?: boolean;
  as?: "section" | "div" | "article";
};

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "ul" | "li";
};

const sectionTags = {
  section: motion.section,
  div: motion.div,
  article: motion.article,
};

const itemTags = {
  div: motion.div,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
};

export function RevealSection({ children, className, withBlur = true, as = "section" }: RevealSectionProps) {
  const MotionTag = sectionTags[as];

  return (
    <MotionTag
      className={className}
      variants={sectionRevealVariants(withBlur)}
      initial="hidden"
      animate="visible"
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({ children, className, as = "div" }: RevealItemProps) {
  const MotionTag = itemTags[as];

  return (
    <MotionTag
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const MotionTag = itemTags[as];

  return (
    <MotionTag className={className} variants={fadeUpItemVariants}>
      {children}
    </MotionTag>
  );
}
