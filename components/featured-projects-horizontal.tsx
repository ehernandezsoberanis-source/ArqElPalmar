"use client";

import { useCallback, useEffect, useRef, useState, type PointerEventHandler, type WheelEventHandler } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/site-data";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type FeaturedProjectsHorizontalProps = {
  projects: Project[];
};

export function FeaturedProjectsHorizontal({ projects }: FeaturedProjectsHorizontalProps) {
  // SPEED: px per frame for the continuous marquee loop.
  const SPEED_PX_PER_FRAME = 0.22;
  // RESUME_DELAY: wait time after manual interaction before autoplay resumes.
  const RESUME_DELAY_MS = 3200;
  // GAP between cards (Tailwind class used by both sequence rows and reduced-motion fallback).
  const CARD_GAP_CLASS = "gap-4 sm:gap-6";

  const reducedMotion = useReducedMotionSafe() === true;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSequenceRef = useRef<HTMLDivElement | null>(null);
  const loopRafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const sequenceSpanRef = useRef(0);
  const lastFrameRef = useRef(0);

  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const pointerDownRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartOffsetRef = useRef(0);
  const dragStartXRef = useRef(0);
  const resumeAtRef = useRef(0);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayEnabled = isPlaying;

  const applyOffset = useCallback((offset: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${-offset}px,0,0)`;
  }, []);

  const normalizeOffset = useCallback((value: number) => {
    const span = sequenceSpanRef.current;
    if (span <= 0) return 0;
    let next = value % span;
    if (next < 0) next += span;
    return next;
  }, []);

  const markInteraction = useCallback(() => {
    resumeAtRef.current = performance.now() + RESUME_DELAY_MS;
  }, [RESUME_DELAY_MS]);

  const measureLoopSpan = useCallback(() => {
    const firstSequence = firstSequenceRef.current;
    const track = trackRef.current;
    if (!firstSequence || !track) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || "0");
    // The seamless reset distance is one full sequence + the inter-sequence gap.
    sequenceSpanRef.current = firstSequence.getBoundingClientRect().width + gap;
    offsetRef.current = normalizeOffset(offsetRef.current);
    applyOffset(offsetRef.current);
  }, [applyOffset, normalizeOffset]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    measureLoopSpan();
    const onResize = () => measureLoopSpan();
    window.addEventListener("resize", onResize);

    const step = (timestamp: number) => {
      if (lastFrameRef.current === 0) {
        lastFrameRef.current = timestamp;
      }

      const deltaFrames = Math.min((timestamp - lastFrameRef.current) / (1000 / 60), 2);
      lastFrameRef.current = timestamp;

      const shouldPause = !autoplayEnabled || hoverRef.current || focusRef.current || pointerDownRef.current || timestamp < resumeAtRef.current;
      if (!shouldPause && sequenceSpanRef.current > 0) {
        offsetRef.current = normalizeOffset(offsetRef.current + SPEED_PX_PER_FRAME * deltaFrames);
        applyOffset(offsetRef.current);
      }

      loopRafRef.current = window.requestAnimationFrame(step);
    };

    loopRafRef.current = window.requestAnimationFrame(step);

    return () => {
      if (loopRafRef.current !== null) {
        window.cancelAnimationFrame(loopRafRef.current);
      }
      window.removeEventListener("resize", onResize);
      lastFrameRef.current = 0;
    };
  }, [applyOffset, autoplayEnabled, measureLoopSpan, normalizeOffset, reducedMotion, SPEED_PX_PER_FRAME]);

  const manualAdvance = useCallback((deltaPx: number) => {
    offsetRef.current = normalizeOffset(offsetRef.current + deltaPx);
    applyOffset(offsetRef.current);
  }, [applyOffset, normalizeOffset]);

  const handleWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    if (reducedMotion) return;

    // Allow horizontal or vertical wheel to scrub the marquee manually.
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 0.1) return;
    event.preventDefault();
    markInteraction();
    manualAdvance(delta);
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    const viewport = viewportRef.current;
    if (!viewport || event.button !== 0) return;

    pointerDownRef.current = true;
    dragMovedRef.current = false;
    setIsPointerDown(true);
    dragStartOffsetRef.current = offsetRef.current;
    dragStartXRef.current = event.clientX;
    markInteraction();
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (reducedMotion) return;
    if (!pointerDownRef.current) return;

    const deltaX = event.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 3) {
      dragMovedRef.current = true;
    }
    offsetRef.current = normalizeOffset(dragStartOffsetRef.current - deltaX);
    applyOffset(offsetRef.current);
  };

  const endPointerInteraction = (pointerId?: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    pointerDownRef.current = false;
    setIsPointerDown(false);
    markInteraction();
    if (typeof pointerId === "number" && viewport.hasPointerCapture(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }
  };

  const stopClickWhenDragging: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!dragMovedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragMovedRef.current = false;
  };

  const renderCards = (suffix: string) =>
    projects.map((project) => (
      <article key={`${project.slug}-${suffix}`} className="w-[86vw] min-w-[86vw] shrink-0 sm:w-[62vw] sm:min-w-[62vw] lg:w-[44vw] lg:min-w-[44vw]">
        <ProjectCard project={project} />
      </article>
    ));

  return (
    <section className="relative mt-10 sm:mt-12">
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className={`rounded-full border px-3 py-1 text-[10px] tracking-[0.22em] uppercase transition-colors ${
            isPlaying
              ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
              : "border-[color:var(--color-border-strong)] bg-[color:var(--color-paper)] text-[color:var(--color-muted-2)] hover:border-[color:var(--color-ink)]"
          }`}
          aria-label="Reproducir carrusel de proyectos"
        >
          Play
        </button>
        <button
          type="button"
          onClick={() => setIsPlaying(false)}
          className={`rounded-full border px-3 py-1 text-[10px] tracking-[0.22em] uppercase transition-colors ${
            !isPlaying
              ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
              : "border-[color:var(--color-border-strong)] bg-[color:var(--color-paper)] text-[color:var(--color-muted-2)] hover:border-[color:var(--color-ink)]"
          }`}
          aria-label="Pausar carrusel de proyectos"
        >
          Pausa
        </button>
      </div>
      <div
        ref={viewportRef}
        onPointerEnter={() => {
          hoverRef.current = true;
        }}
        onPointerLeave={() => {
          hoverRef.current = false;
          markInteraction();
        }}
        onFocusCapture={() => {
          focusRef.current = true;
        }}
        onBlurCapture={() => {
          const scroller = viewportRef.current;
          if (!scroller || scroller.contains(document.activeElement)) return;
          focusRef.current = false;
          markInteraction();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => endPointerInteraction(event.pointerId)}
        onPointerCancel={(event) => endPointerInteraction(event.pointerId)}
        onWheel={handleWheel}
        onClickCapture={stopClickWhenDragging}
        className={`relative overflow-hidden pb-5 [touch-action:pan-x] sm:pb-6 ${isPointerDown ? "cursor-grabbing" : "cursor-grab"}`}
        aria-label="Marquesina infinita de proyectos destacados"
      >
        <div ref={trackRef} className={`flex will-change-transform ${CARD_GAP_CLASS}`}>
          <div ref={firstSequenceRef} className={`flex ${CARD_GAP_CLASS}`} aria-hidden={false}>
            {renderCards("a")}
          </div>
          <div className={`flex ${CARD_GAP_CLASS}`} aria-hidden>
            {renderCards("b")}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[color:var(--color-paper)] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[color:var(--color-paper)] to-transparent sm:w-16" />
    </section>
  );
}
