"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/site-data";
import {
  cardTitleHoverVariants,
  tactileCardVariants,
  tactileImageVariants,
  tactileOverlayVariants,
  viewIndicatorVariants,
} from "@/lib/animation-variants";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={tactileCardVariants}
      className="group rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-paper-alt)] p-6 sm:p-7"
    >
      <div className="relative overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-card-tint)]">
        <motion.div
          className="aspect-[16/10] bg-[image:var(--service-gradient)]"
          variants={tactileImageVariants}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-black/0"
          variants={tactileOverlayVariants}
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted-4)]">{service.id}</p>
          <motion.h3 variants={cardTitleHoverVariants} className="mt-3 font-serif text-2xl leading-tight">
            {service.title}
          </motion.h3>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted-2)]">{service.description}</p>
        </div>
        <motion.span variants={viewIndicatorVariants} className="mt-4 text-[11px] tracking-[0.24em] uppercase text-[color:var(--color-muted-3)]">
          Ver
        </motion.span>
      </div>
    </motion.article>
  );
}
