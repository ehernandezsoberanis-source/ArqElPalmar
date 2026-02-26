import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { StudioLocationSection } from "@/components/studio-location-section";

export const metadata: Metadata = {
  title: "Estudio",
  description: "Conoce el estudio, el proceso y la filosofía de diseño de Arq El Palmar.",
};

export default function StudioPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Estudio"
        title="Una práctica de arquitectura multidisciplinaria basada en contexto y proporción."
        description="Colaboramos con clientes privados y públicos en sectores residenciales, hoteleros y culturales. Nuestro proceso une rigor estratégico y sensibilidad táctil."
      />

      <div className="mt-12 grid gap-10 border-t border-[color:var(--color-border)] pt-10 sm:mt-14 sm:grid-cols-2 sm:pt-12">
        <p className="text-sm leading-relaxed text-[color:var(--color-muted-2)] sm:text-base">
          Fundado en Miami, Arq El Palmar entiende la arquitectura como un trabajo editorial: cada línea, unión y decisión material se revisa por necesidad y sentido.
        </p>
        <p className="text-sm leading-relaxed text-[color:var(--color-muted-2)] sm:text-base">
          El estudio se asocia con ingenieros, paisajistas y artesanos para entregar proyectos espacialmente claros, técnicamente precisos y profundamente arraigados al lugar.
        </p>
      </div>

      <StudioLocationSection />
    </section>
  );
}
