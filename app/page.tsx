import type { Metadata } from "next";
import { FeaturedProjectsSpotlight } from "@/components/featured-projects-spotlight";
import { HeroHome } from "@/components/hero-home";
import { InteractiveLink } from "@/components/interactive-link";
import { RevealItem, RevealSection, StaggerGroup } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { featuredProjectSlugs, projects, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Estudio de arquitectura minimalista y de alta gama que crea espacios editoriales con precisión.",
};

export default function HomePage() {
  const baseProject = projects[0]!;
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  const pickFeatured = (index: number) => featuredProjects[index] ?? projects[index] ?? baseProject;
  const featuredPrimary = pickFeatured(0);
  const featuredSecondary: [typeof projects[number], typeof projects[number]] = [pickFeatured(1), pickFeatured(2)];

  return (
    <div className="space-y-24 pb-24 sm:space-y-32 sm:pb-28">
      <HeroHome
        eyebrow="Estudio de Arquitectura"
        title="Diseñamos espacios atemporales con silencio intencional."
        subheadline="Arq El Palmar desarrolla proyectos residenciales y culturales mediante claridad material, luz medida y contención espacial."
        secondaryLine="Cada decisión de proyecto se construye como una secuencia precisa de atmósfera, proporción y permanencia."
      />

      <RevealSection id="servicios" className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Filosofía del Estudio"
          title="Diseñamos con calma, editamos con rigor y construimos para perdurar."
          description="Cada proyecto nace del contexto: clima, cultura y ritmo. A través de la reducción, revelamos una arquitectura contemporánea y durable."
        />
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Servicios"
          title="Del concepto a la obra, con precisión en cada escala."
        />
        <StaggerGroup className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.id}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </StaggerGroup>
      </RevealSection>

      <RevealSection className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Proyectos Destacados" title="Obras seleccionadas en residencial, corporativo y hotelería." />
          <InteractiveLink href="/projects" label="Ver todos" className="hidden md:block" />
        </div>
        <RevealItem>
          <FeaturedProjectsSpotlight featuredPrimary={featuredPrimary} featuredSecondary={featuredSecondary} />
        </RevealItem>
      </RevealSection>
    </div>
  );
}
