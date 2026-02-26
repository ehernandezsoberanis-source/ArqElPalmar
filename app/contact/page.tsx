import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { RevealSection } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { siteMeta } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Arq El Palmar para nuevos encargos de arquitectura y diseño.",
};

export default function ContactPage() {
  return (
    <RevealSection className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Contacto"
        title="Conversemos sobre un nuevo encargo."
        description="Comparte el contexto del proyecto y te propondremos una ruta clara de trabajo."
      />

      <div className="mt-12 grid gap-8 border-t border-[color:var(--color-border)] pt-10 sm:mt-14 lg:grid-cols-12 lg:gap-10 lg:pt-12">
        <div className="order-1 lg:col-span-7 lg:order-2">
          <ContactForm />
        </div>

        <aside className="order-2 space-y-6 lg:col-span-5 lg:order-1">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Información de contacto</h2>
            <div className="space-y-3 text-sm leading-relaxed text-[color:var(--color-muted-1)] sm:text-base">
              <p>
                <Link href={`mailto:${siteMeta.contact.email}`} className="transition-opacity hover:opacity-70">
                  {siteMeta.contact.email}
                </Link>
              </p>
              <p>
                <Link href={`tel:${siteMeta.contact.phone.replace(/[^\d+]/g, "")}`} className="transition-opacity hover:opacity-70">
                  {siteMeta.contact.phone}
                </Link>
              </p>
              <p>{siteMeta.contact.address}</p>
            </div>
          </div>

          <div className="space-y-3 border-t border-[color:var(--color-border)] pt-4 text-sm leading-relaxed text-[color:var(--color-muted-2)] sm:text-base">
            <p>Tiempo de respuesta habitual: 24–48h hábiles.</p>
            <p>
              Para una propuesta más precisa, incluye alcance, ubicación, presupuesto estimado, cronograma y referencias.
            </p>
          </div>

          <div className="overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-map-shell)] shadow-[0_8px_22px_rgba(0,0,0,0.14)]">
            <div className="relative h-36 bg-[linear-gradient(160deg,#0f0f10,#191919_50%,#121212)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(255,255,255,0.06),transparent_45%),radial-gradient(circle_at_78%_70%,rgba(255,255,255,0.04),transparent_48%)]" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_13px,rgba(255,255,255,0.035)_14px),repeating-linear-gradient(90deg,transparent_0,transparent_13px,rgba(255,255,255,0.03)_14px)]" />
              <div className="project-marker absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-3 text-xs tracking-[0.16em] uppercase text-white/75">
              <p>Zihuatanejo, Guerrero, MX</p>
              <Link href="https://www.google.com/maps?q=17.640806,-101.550361" target="_blank" rel="noreferrer" className="border-b border-white/25 pb-1">
                Abrir mapa
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </RevealSection>
  );
}
