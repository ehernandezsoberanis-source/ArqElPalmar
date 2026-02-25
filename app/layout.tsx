import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageTransition } from "@/components/page-transition";
import { MotionProvider } from "@/components/motion-provider";
import { siteMeta } from "@/lib/site-data";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arqelpalmar.com"),
  title: {
    default: "Arq El Palmar | Estudio de Arquitectura",
    template: "%s | Arq El Palmar",
  },
  description: siteMeta.shortDescription,
  openGraph: {
    title: "Arq El Palmar",
    description: siteMeta.shortDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arq El Palmar",
    description: siteMeta.shortDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${sans.variable} ${serif.variable} bg-[color:var(--color-paper)] text-[color:var(--color-ink)] antialiased`}>
        <div className="site-noise pointer-events-none fixed inset-0 -z-10 opacity-50" />
        <MotionProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
