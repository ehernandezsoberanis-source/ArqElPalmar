"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/site-data";
import { RevealItem, RevealSection, StaggerGroup } from "@/components/reveal";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type ProjectCaseStudyProps = {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
};

export function ProjectCaseStudy({ project, previousProject, nextProject }: ProjectCaseStudyProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotionSafe();
  const sharedLayoutEnabled = reducedMotion === false;
  const lightboxImage = useMemo(() => (lightboxIndex === null ? null : project.gallery[lightboxIndex]), [lightboxIndex, project.gallery]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % project.gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + project.gallery.length) % project.gallery.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, project.gallery.length]);

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <motion.div layoutId={sharedLayoutEnabled ? `project-media-${project.slug}` : undefined} className="absolute inset-0 -z-20">
          {project.hero.type === "video" ? (
            <video className="h-full w-full object-cover" autoPlay loop muted playsInline poster={project.hero.poster}>
              <source src={project.hero.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={project.hero.src}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/68 via-black/30 to-black/14" />

        <div className="mx-auto flex min-h-[88vh] w-full max-w-7xl items-end px-5 pb-12 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
          <StaggerGroup className="space-y-4">
            <RevealItem>
              <p className="text-xs tracking-[0.24em] uppercase text-white/75">{project.category}</p>
            </RevealItem>
            <RevealItem>
              <motion.h1
                layoutId={sharedLayoutEnabled ? `project-title-${project.slug}` : undefined}
                className="max-w-5xl font-serif text-5xl leading-[0.95] text-white sm:text-7xl lg:text-8xl"
              >
                {project.title}
              </motion.h1>
            </RevealItem>
            <RevealItem>
              <p className="text-sm text-white/82 sm:text-base">
                {project.location} • {project.year}
              </p>
            </RevealItem>
          </StaggerGroup>
        </div>
      </section>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="grid gap-6 border-y border-[color:var(--color-border)] py-6 sm:grid-cols-2 lg:grid-cols-5">
          <FactItem label="Ubicación" value={project.location} />
          <FactItem label="Año" value={project.year} />
          <FactItem label="Servicios" value={project.services.join(", ")} />
          <FactItem label="Área" value={project.area ?? "No disponible"} />
          <FactItem label="Cliente" value={project.client ?? "No disponible"} />
        </div>
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
        <StaggerGroup className="space-y-8 sm:space-y-10">
          {project.gallery.map((asset, index) => (
            <RevealItem key={asset.src}>
              <motion.button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group block w-full overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-card-tint)] text-left"
                whileTap={{ scale: 0.995 }}
              >
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  width={asset.width}
                  height={asset.height}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  loading="lazy"
                />
              </motion.button>
            </RevealItem>
          ))}
        </StaggerGroup>
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <StaggerGroup className="grid gap-10 lg:grid-cols-3">
          <StoryBlock title="Desafío" content={project.story.challenge} />
          <StoryBlock title="Enfoque" content={project.story.approach} />
          <StoryBlock title="Resultado" content={project.story.result} />
        </StaggerGroup>
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 pb-18 pt-4 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-t border-[color:var(--color-border)] pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <Link href="/projects" className="w-fit text-xs tracking-[0.25em] uppercase text-[color:var(--color-muted-2)] hover:text-[color:var(--color-ink)]">
            Volver a proyectos
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            {previousProject ? (
              <Link href={`/projects/${previousProject.slug}`} className="text-xs tracking-[0.22em] uppercase text-[color:var(--color-muted-2)] hover:text-[color:var(--color-ink)]">
                Anterior: {previousProject.title}
              </Link>
            ) : null}
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="text-xs tracking-[0.22em] uppercase text-[color:var(--color-muted-2)] hover:text-[color:var(--color-ink)]">
                Siguiente: {nextProject.title}
              </Link>
            ) : null}
          </div>
        </div>
      </RevealSection>

      {lightboxImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-white/25 px-3 py-1 text-xs tracking-[0.18em] uppercase text-white/80 hover:bg-white/10"
            onClick={() => setLightboxIndex(null)}
          >
            Cerrar
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 px-3 py-2 text-xs tracking-[0.14em] uppercase text-white/80 hover:bg-white/10 sm:left-6"
            onClick={() => setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + project.gallery.length) % project.gallery.length))}
          >
            Anterior
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 px-3 py-2 text-xs tracking-[0.14em] uppercase text-white/80 hover:bg-white/10 sm:right-6"
            onClick={() => setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % project.gallery.length))}
          >
            Siguiente
          </button>
          <Image
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            width={lightboxImage.width}
            height={lightboxImage.height}
            className="max-h-[88vh] w-auto max-w-[95vw] object-contain"
            sizes="95vw"
            priority
          />
        </div>
      ) : null}
    </>
  );
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-muted-4)]">{label}</p>
      <p className="text-sm leading-relaxed text-[color:var(--color-muted-1)]">{value}</p>
    </div>
  );
}

function StoryBlock({ title, content }: { title: string; content: string }) {
  return (
    <RevealItem className="space-y-3">
      <h2 className="font-serif text-3xl">{title}</h2>
      <p className="text-sm leading-relaxed text-[color:var(--color-muted-2)] sm:text-base">{content}</p>
    </RevealItem>
  );
}
