"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/site-data";
import {
  cardTitleHoverVariants,
  tactileProjectCardVariants,
  tactileProjectImageZoomVariants,
  tactileProjectOverlayRevealVariants,
  viewIndicatorVariants,
} from "@/lib/animation-variants";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type ProjectCardProps = {
  project: Project;
  showDescription?: boolean;
  onHoverChange?: (slug: string | null) => void;
  size?: "default" | "primary" | "secondary";
  className?: string;
};

export function ProjectCard({
  project,
  showDescription = false,
  onHoverChange,
  size = "default",
  className,
}: ProjectCardProps) {
  const HOVER_VIDEO_DELAY_MS = 3000;

  const reducedMotion = useReducedMotionSafe();
  const shouldReduceMotion = reducedMotion === true;
  const sharedLayoutEnabled = reducedMotion === false;
  const [isHovered, setIsHovered] = useState(false);
  const [isHoverVideoReady, setIsHoverVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hoverDelayTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Treat as mobile only when device is truly touch-first.
    const media = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (hoverDelayTimerRef.current !== null) {
      window.clearTimeout(hoverDelayTimerRef.current);
      hoverDelayTimerRef.current = null;
    }

    if (isHovered && !isMobile && project.hoverVideo) {
      hoverDelayTimerRef.current = window.setTimeout(() => {
        setIsHoverVideoReady(true);
      }, HOVER_VIDEO_DELAY_MS);
    }
  }, [HOVER_VIDEO_DELAY_MS, isHovered, isMobile, project.hoverVideo]);

  const showVideoPreview = Boolean(project.hoverVideo) && isHovered && isHoverVideoReady && !isMobile;
  const isFeaturedVariant = size !== "default";
  const titleClass =
    size === "primary"
      ? "font-serif text-3xl leading-tight sm:text-4xl"
      : size === "secondary"
        ? "font-serif text-2xl leading-tight sm:text-[30px]"
        : "font-serif text-2xl leading-tight sm:text-3xl";
  const contentPaddingClass = size === "primary" ? "p-6 sm:p-7" : "p-5 sm:p-6";

  const activatePreview = () => {
    setIsHoverVideoReady(false);
    setIsHovered(true);
    onHoverChange?.(project.slug);
  };

  const deactivatePreview = () => {
    setIsHovered(false);
    onHoverChange?.(null);
  };

  return (
    <motion.article
      initial="rest"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      whileTap={{ scale: 0.98 }}
      variants={tactileProjectCardVariants}
      className={`group overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-paper-alt)] ${className ?? ""}`}
      onPointerEnter={activatePreview}
      onPointerLeave={deactivatePreview}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden bg-[color:var(--color-card-tint)]">
          <motion.div
            variants={tactileProjectImageZoomVariants}
            layoutId={sharedLayoutEnabled ? `project-media-${project.slug}` : undefined}
            className="relative aspect-[4/3]"
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />

            <AnimatePresence>
              {showVideoPreview ? (
                <motion.div
                  key="hover-video-preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38 }}
                  className="absolute inset-0 z-20"
                >
                  <video
                    className="h-full w-full object-cover"
                    src={project.hoverVideo}
                    poster={project.coverImage}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 bg-black/8"
            variants={{
              rest: { backgroundColor: "rgba(0,0,0,0.1)" },
              hover: { backgroundColor: "rgba(0,0,0,0.28)", transition: { duration: 0.3 } },
            }}
          />

          <motion.div
            variants={tactileProjectOverlayRevealVariants}
            className="pointer-events-none absolute inset-x-0 bottom-0 space-y-2 p-5 text-white sm:p-6"
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/75">
              {project.location} • {project.year}
            </p>
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/75">{project.category}</p>
            <motion.span variants={viewIndicatorVariants} className="inline-flex rounded-full border border-white/35 px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
              View Project
            </motion.span>
          </motion.div>
        </div>

        <div className={contentPaddingClass}>
          {isFeaturedVariant ? (
            <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-muted-3)]">
              {project.category} • {project.location} • {project.year}
            </p>
          ) : null}
          {/* Keep slug-based layoutId stable for new projects to preserve shared transitions. */}
          <motion.h3
            variants={cardTitleHoverVariants}
            layoutId={sharedLayoutEnabled ? `project-title-${project.slug}` : undefined}
            className={`${isFeaturedVariant ? "mt-3" : ""} ${titleClass}`}
          >
            {project.title}
          </motion.h3>
          {showDescription ? <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted-2)]">{project.description}</p> : null}
        </div>
      </Link>
    </motion.article>
  );
}
