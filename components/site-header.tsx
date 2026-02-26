"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/studio", label: "Estudio" },
  { href: "/projects", label: "Proyectos" },
  { href: "/contact", label: "Contacto" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ENTER_THRESHOLD = 28;
    const EXIT_THRESHOLD = 8;
    let ticking = false;

    const updateScrolledState = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > EXIT_THRESHOLD : y > ENTER_THRESHOLD));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-30 transition-colors duration-500 ${
        scrolled
          ? "border-b border-[color:var(--color-border)] bg-[color:var(--color-paper)] shadow-[var(--shadow-header)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      animate={{ opacity: 1 }}
      initial={false}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
        animate={{ scale: scrolled ? 0.985 : 1, y: scrolled ? -1 : 0 }}
        initial={false}
        transition={{ duration: 0.28 }}
      >
        <Link href="/" className="text-xs tracking-[0.3em] uppercase">
          Arq El Palmar
        </Link>
        <nav aria-label="Navegación principal" className="hidden gap-7 text-xs tracking-[0.18em] uppercase md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="group relative transition-opacity hover:opacity-80">
              <span>{item.label}</span>
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--color-muted-1)] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
