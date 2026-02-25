import Link from "next/link";
import { siteMeta } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[color:var(--color-paper)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-3 lg:px-12">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase">Arq El Palmar</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/70">{siteMeta.shortDescription}</p>
        </div>

        <div className="space-y-2 text-sm text-black/75">
          <p>{siteMeta.contact.email}</p>
          <p>{siteMeta.contact.phone}</p>
          <p>{siteMeta.contact.address}</p>
        </div>

        <div className="space-y-3 text-sm">
          {siteMeta.socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="block w-fit border-b border-black/25 pb-1 transition-opacity hover:opacity-60"
            >
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}