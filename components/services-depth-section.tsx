"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ServiceCard } from "@/components/service-card";
import {
  editorialCardItemVariants,
  editorialCardsContainerVariants,
  editorialHierarchyContainerVariants,
  editorialHierarchyItemVariants,
} from "@/lib/animation-variants";
import { useServicesParallaxMotion } from "@/lib/parallax-motion";
import type { Service } from "@/lib/site-data";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type ServicesDepthSectionProps = {
  services: Service[];
};

export function ServicesDepthSection({ services }: ServicesDepthSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotionPreference = useReducedMotionSafe();
  const reducedMotion = reducedMotionPreference === true;
  const shouldAnimate = reducedMotionPreference !== true;
  const { backgroundY, backgroundScale, contentY, accentOpacity } = useServicesParallaxMotion(sectionRef, reducedMotion);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle editorial depth between card rows.
  const firstRowY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -6]);
  const secondRowY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 6]);
  const withBlur = shouldAnimate;

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(214,201,182,0.24),transparent_48%),linear-gradient(160deg,#f6f1e7_0%,#eee4d6_58%,#e8dccb_100%)]" />
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: accentOpacity }}>
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.14)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.08),transparent_38%,rgba(0,0,0,0.05)_100%)]" />
      </motion.div>

      <motion.div style={{ y: contentY }}>
        <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <motion.div
            variants={editorialHierarchyContainerVariants}
            initial={shouldAnimate ? "hidden" : false}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-3xl space-y-4"
          >
            <motion.p variants={editorialHierarchyItemVariants(withBlur)} className="text-xs tracking-[0.25em] uppercase text-black/55">
              Servicios
            </motion.p>
            <motion.h2 variants={editorialHierarchyItemVariants(withBlur)} className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Capacidades integradas entre arquitectura y estrategia espacial.
            </motion.h2>
            <motion.p variants={editorialHierarchyItemVariants(withBlur)} className="max-w-2xl text-sm leading-relaxed text-black/65 sm:text-base">
              Nuestro modelo de servicio se adapta a cada cronograma, desde factibilidad temprana hasta documentación completa y coordinación de obra.
            </motion.p>
          </motion.div>

          <motion.div
            variants={editorialCardsContainerVariants(0.62)}
            initial={shouldAnimate ? "hidden" : false}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true, amount: 0.18 }}
            className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={editorialCardItemVariants(withBlur)}
                style={{ y: index < 3 ? firstRowY : secondRowY }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </motion.div>
    </section>
  );
}
