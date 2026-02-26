"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";

const StudioLocationMap = dynamic(
  () => import("@/components/studio-location-map").then((mod) => mod.StudioLocationMap),
  { ssr: false, loading: () => <MapSkeleton /> },
);

const STUDIO_LOCATION = {
  // Replace with your real studio coordinates/address when ready.
  lat: 17.640806,
  lng: -101.550361,
  city: "Zihuatanejo, Guerrero, MX",
  address: "Centro, Zihuatanejo, Guerrero, México",
};

export function StudioLocationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      { rootMargin: "120px 0px", threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView]);

  const openMapsHref = useMemo(
    () => "https://www.google.com/maps?q=17.640806,-101.550361",
    [],
  );

  return (
    <section ref={sectionRef} className="mt-16 sm:mt-18">
      <div className="space-y-2">
        <p className="text-xs tracking-[0.24em] uppercase text-[color:var(--color-muted-3)]">Ubicación</p>
        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Visítanos o agenda una llamada.</h2>
      </div>

      <motion.div
        whileHover={{ y: -3, borderColor: "var(--color-border-strong)" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-map-shell)] shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
      >
        {isInView ? (
          <StudioLocationMap
            lat={STUDIO_LOCATION.lat}
            lng={STUDIO_LOCATION.lng}
            label="ARQ EL PALMAR"
            subtitle="Estudio"
            mapsUrl={openMapsHref}
          />
        ) : (
          <MapSkeleton />
        )}

        <div className="flex flex-col gap-3 border-t border-white/10 bg-black/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-xs tracking-[0.18em] uppercase text-white/70">
            {STUDIO_LOCATION.city} · Centro, Zihuatanejo
          </p>
          <Link
            href={openMapsHref}
            target="_blank"
            rel="noreferrer"
            className="w-fit border-b border-white/25 pb-1 text-xs tracking-[0.2em] uppercase text-white/82 transition-opacity hover:opacity-65"
          >
            Abrir en Maps
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function MapSkeleton() {
  return (
    <div className="h-[260px] w-full animate-pulse bg-[linear-gradient(140deg,#121212,#1b1b1b_45%,#161616)] sm:h-[300px]" />
  );
}
