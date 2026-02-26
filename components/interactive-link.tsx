"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonUnderlineVariants } from "@/lib/animation-variants";

type InteractiveLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function InteractiveLink({ href, label, className }: InteractiveLinkProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      <Link href={href} className="group relative inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[color:var(--color-muted-2)]">
        <span>{label}</span>
        <motion.span
          className="absolute -bottom-1 left-0 h-px w-full bg-[color:var(--color-muted-1)]"
          variants={buttonUnderlineVariants}
        />
      </Link>
    </motion.div>
  );
}
