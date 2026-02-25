import type { Metadata } from "next";
import { ProjectsPortfolio } from "@/components/projects-portfolio";
import { RevealSection } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projectCategories, projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Portafolio editorial de arquitectura con estudios de caso, filtros y narrativa de proyecto.",
};

export default function ProjectsPage() {
  return (
    <RevealSection className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Proyectos"
        title="Estudios de caso diseñados para comunicar contexto, intención e impacto medible."
      />
      <div className="mt-10 sm:mt-12">
        <ProjectsPortfolio projects={projects} categories={projectCategories} />
      </div>
    </RevealSection>
  );
}
