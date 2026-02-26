"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import type { Project } from "@/lib/site-data";

type ProjectsMapProps = {
  projects: Project[];
  hoveredProjectSlug: string | null;
};

type ViewportSyncProps = {
  projects: Project[];
  hoveredProjectSlug: string | null;
};

export function ProjectsMap({ projects, hoveredProjectSlug }: ProjectsMapProps) {
  const center: [number, number] = [25.7921, -80.1423];

  return (
    <div className="overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-map-shell)]">
      <div className="h-[320px] w-full sm:h-[420px] lg:h-[520px]">
        <MapContainer
          center={center}
          zoom={4}
          scrollWheelZoom
          zoomControl={false}
          className="h-full w-full"
          preferCanvas
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO'
          />
          <ViewportSync projects={projects} hoveredProjectSlug={hoveredProjectSlug} />
          {projects.map((project, index) => (
            <ProjectMarker
              key={project.slug}
              project={project}
              index={index}
              active={hoveredProjectSlug === project.slug}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

function ViewportSync({ projects, hoveredProjectSlug }: ViewportSyncProps) {
  const map = useMap();
  const hoveredProject = projects.find((project) => project.slug === hoveredProjectSlug);

  useEffect(() => {
    if (projects.length === 0) return;

    if (hoveredProject) {
      map.flyTo([hoveredProject.latitude, hoveredProject.longitude], Math.max(map.getZoom(), 6), {
        duration: 0.6,
      });
      return;
    }

    const bounds = L.latLngBounds(projects.map((project) => [project.latitude, project.longitude] as [number, number]));
    map.flyToBounds(bounds.pad(0.26), {
      duration: 0.7,
      animate: true,
    });
  }, [hoveredProject, map, projects]);

  return null;
}

function ProjectMarker({ project, index, active }: { project: Project; index: number; active: boolean }) {
  const router = useRouter();

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div class="project-marker ${active ? "project-marker--active" : ""}" style="animation-delay:${Math.min(index * 60, 360)}ms"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    [active, index],
  );

  return (
    <Marker
      position={[project.latitude, project.longitude]}
      icon={icon}
      eventHandlers={{
        click: () => router.push(`/projects/${project.slug}`),
      }}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.2em] uppercase">{project.category}</p>
          <p className="text-sm">{project.title}</p>
        </div>
      </Tooltip>
    </Marker>
  );
}
