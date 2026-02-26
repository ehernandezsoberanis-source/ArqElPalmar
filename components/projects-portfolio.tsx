"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCategory } from "@/lib/site-data";

const ProjectsMap = dynamic(() => import("@/components/projects-map").then((mod) => mod.ProjectsMap), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] w-full animate-pulse rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-card-tint)] sm:h-[420px] lg:h-[520px]" />
  ),
});

type ProjectsPortfolioProps = {
  projects: Project[];
  categories: Array<ProjectCategory | "Todas">;
};

export function ProjectsPortfolio({ projects, categories }: ProjectsPortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "Todas">("Todas");
  const [hoveredProjectSlug, setHoveredProjectSlug] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todas") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  const hoveredProjectSlugInFilter = useMemo(() => {
    if (!hoveredProjectSlug) return null;
    return filteredProjects.some((project) => project.slug === hoveredProjectSlug) ? hoveredProjectSlug : null;
  }, [filteredProjects, hoveredProjectSlug]);

  return (
    <div className="space-y-10 sm:space-y-12">
      <LayoutGroup>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative rounded-full border px-4 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors ${
                  isActive
                    ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                    : "border-[color:var(--color-border)] bg-transparent text-[color:var(--color-muted-2)] hover:border-[color:var(--color-border-strong)]"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {category}
                {isActive ? (
                  <motion.span
                    layoutId="portfolio-filter-active"
                    className="absolute inset-0 -z-10 rounded-full border border-[color:var(--color-ink)] bg-[color:var(--color-ink)]"
                    transition={{ duration: 0.35 }}
                  />
                ) : null}
              </motion.button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-8 sm:gap-10 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                transition={{ duration: 0.45 }}
                className="space-y-4"
              >
                <ProjectCard
                  project={project}
                  showDescription
                  onHoverChange={(slug) => setHoveredProjectSlug(slug)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <section className="space-y-5 pt-4 sm:pt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.24em] uppercase text-[color:var(--color-muted-4)]">Mapa de proyectos</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">Exploración geográfica del portafolio</h3>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-relaxed text-[color:var(--color-muted-3)] sm:block">
            Pasa el cursor sobre una tarjeta para resaltar su ubicación en el mapa.
          </p>
        </div>
        <ProjectsMap projects={filteredProjects} hoveredProjectSlug={hoveredProjectSlugInFilter} />
      </section>
    </div>
  );
}
