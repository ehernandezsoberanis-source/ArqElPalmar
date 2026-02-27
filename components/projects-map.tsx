"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Project } from "@/lib/site-data";

const ZIHUATANEJO_CENTER: [number, number] = [17.645, -101.57];
const ZIHUATANEJO_ZOOM = 12;

type ProjectsMapProps = {
  projects: Project[];
  hoveredProjectSlug: string | null;
};

type ViewportSyncProps = {
  projects: Project[];
  hoveredProjectSlug: string | null;
};

export function ProjectsMap({ projects, hoveredProjectSlug }: ProjectsMapProps) {
  const center = ZIHUATANEJO_CENTER;

  return (
    <div className="overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-map-shell)]">
      <div className="h-[320px] w-full sm:h-[420px] lg:h-[520px]">
        <MapContainer
          center={center}
          zoom={ZIHUATANEJO_ZOOM}
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
      map.flyTo([hoveredProject.latitude, hoveredProject.longitude], Math.max(map.getZoom(), 14), {
        duration: 0.6,
      });
      return;
    }

    map.flyTo(ZIHUATANEJO_CENTER, ZIHUATANEJO_ZOOM, {
      duration: 0.7,
      animate: true,
    });
  }, [hoveredProject, map, projects]);

  return null;
}

function ProjectMarker({ project, index, active }: { project: Project; index: number; active: boolean }) {
  const router = useRouter();
  const markerRef = useRef<L.Marker | null>(null);

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

  useEffect(() => {
    if (!markerRef.current) return;

    if (active) {
      markerRef.current.openPopup();
      return;
    }

    markerRef.current.closePopup();
  }, [active]);

  return (
    <Marker
      ref={markerRef}
      position={[project.latitude, project.longitude]}
      icon={icon}
      eventHandlers={{
        click: () => router.push(`/projects/${project.slug}`),
      }}
    >
      <Popup>
        <div className="space-y-1">
          <p className="text-sm font-semibold">{project.title}</p>
          <p className="text-xs text-[color:var(--color-muted-2)]">{project.location}</p>
        </div>
      </Popup>
    </Marker>
  );
}
