import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/site-data";

type FeaturedProjectsSpotlightProps = {
  featuredPrimary: Project;
  featuredSecondary: [Project, Project];
};

export function FeaturedProjectsSpotlight({ featuredPrimary, featuredSecondary }: FeaturedProjectsSpotlightProps) {
  return (
    <section className="mt-10 sm:mt-12">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="lg:col-span-8">
          <ProjectCard project={featuredPrimary} size="primary" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-5">
          {featuredSecondary.map((project) => (
            <ProjectCard key={project.slug} project={project} size="secondary" />
          ))}
        </div>
      </div>
    </section>
  );
}

