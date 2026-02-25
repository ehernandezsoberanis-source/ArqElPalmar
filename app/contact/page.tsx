import type { Metadata } from "next";
import { RevealItem, RevealSection, StaggerGroup } from "@/components/reveal";
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
        title="Conversemos sobre un nuevo encargo, colaboración o asesoría."
      />
      <StaggerGroup className="mt-12 grid gap-8 border-t border-black/10 pt-10 sm:mt-14 sm:grid-cols-2 sm:pt-12">
        <RevealItem>
          <div className="space-y-2 text-sm leading-relaxed text-black/75 sm:text-base">
            <p>{siteMeta.contact.email}</p>
            <p>{siteMeta.contact.phone}</p>
            <p>{siteMeta.contact.address}</p>
          </div>
        </RevealItem>
        <RevealItem>
          <p className="max-w-md text-sm leading-relaxed text-black/70 sm:text-base">
            Incluye tipo de proyecto, ubicación, cronograma y nivel de acompañamiento deseado. Respondemos habitualmente en un plazo de dos días hábiles.
          </p>
        </RevealItem>
      </StaggerGroup>
    </RevealSection>
  );
}
