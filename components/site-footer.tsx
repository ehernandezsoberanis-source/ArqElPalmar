import Link from "next/link";
import { siteMeta } from "@/lib/site-data";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const navLinks = [
    { href: "/studio", label: "Estudio" },
    { href: "/#servicios", label: "Servicios" },
    { href: "/projects", label: "Proyectos" },
    { href: "/contact", label: "Contacto" },
  ];
  const city = "Miami";

  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-paper)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-7 sm:px-8 sm:py-8 lg:px-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] tracking-[0.22em] uppercase sm:text-[11px]">
          <p>{siteMeta.name}</p>
          <span className="text-[color:var(--color-muted-4)]">•</span>
          <p className="text-[color:var(--color-muted-2)]">Arquitectura serena y precisa para proyectos contemporáneos.</p>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-[color:var(--color-border)] pt-3 text-[11px] text-[color:var(--color-muted-2)] sm:mt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href={`mailto:${siteMeta.contact.email}`} className="transition-opacity hover:opacity-65">
              {siteMeta.contact.email}
            </Link>
            <span className="text-[color:var(--color-muted-4)]">•</span>
            <Link href={`tel:${siteMeta.contact.phone.replace(/[^\d+]/g, "")}`} className="transition-opacity hover:opacity-65">
              {siteMeta.contact.phone}
            </Link>
            <span className="text-[color:var(--color-muted-4)]">•</span>
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(siteMeta.contact.address)}`}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-65"
            >
              {city}
            </Link>
          </div>

          <nav aria-label="Navegación secundaria" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] tracking-[0.2em] uppercase sm:text-[11px]">
            {navLinks.map((item, index) => (
              <span key={item.href} className="inline-flex items-center gap-3">
                <Link href={item.href} className="transition-opacity hover:opacity-65">
                  {item.label}
                </Link>
                {index < navLinks.length - 1 ? <span className="text-[color:var(--color-muted-4)]">•</span> : null}
              </span>
            ))}
          </nav>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[color:var(--color-border)] pt-3 text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-3)] sm:text-[11px]">
          <p>© {currentYear} {siteMeta.name}</p>
          <div className="flex gap-5">
            <Link
              href="/contact"
              className="border-b border-transparent pb-1 transition-colors hover:border-[color:var(--color-border-strong)]"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
