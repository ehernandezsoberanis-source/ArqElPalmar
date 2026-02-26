export type Service = {
  id: string;
  title: string;
  description: string;
};

export type ProjectCategory = "Residencial" | "Comercial" | "Planeamiento Urbano" | "Cultural";

export type ProjectAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectHero = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export type ProjectStory = {
  challenge: string;
  approach: string;
  result: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  latitude: number;
  longitude: number;
  year: string;
  description: string;
  // Hover assets for tactile cards:
  // - coverImage: default still
  // - hoverImage: swapped image on hover
  // - hoverVideo: optional muted loop shown only while hovered
  coverImage: string;
  hoverImage: string;
  hoverVideo?: string;
  services: string[];
  area?: string;
  client?: string;
  hero: ProjectHero;
  gallery: ProjectAsset[];
  story: ProjectStory;
};

export const siteMeta = {
  name: "Arq El Palmar",
  shortDescription:
    "Estudio de arquitectura que crea espacios serenos y de alto impacto con precisión editorial.",
  contact: {
    email: "studio@arqelpalmar.com",
    phone: "+1 (305) 555-0184",
    address: "1420 Bay Avenue, Miami, FL",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

export const services: Service[] = [
  {
    id: "01",
    title: "Arquitectura Residencial",
    description: "Viviendas privadas diseñadas con proporciones serenas y paletas materiales atemporales.",
  },
  {
    id: "02",
    title: "Diseño Hotelero",
    description: "Espacios de hospitalidad boutique que equilibran atmósfera, circulación e identidad.",
  },
  {
    id: "03",
    title: "Arquitectura Interior",
    description: "Sistemas interiores refinados donde luz, estructura y oficio definen el carácter.",
  },
  {
    id: "04",
    title: "Plan Maestro",
    description: "Estrategias de planificación urbana y costera guiadas por el contexto y la resiliencia.",
  },
  {
    id: "05",
    title: "Renovación + Reuso Adaptativo",
    description: "Transformación de estructuras existentes mediante detalle preciso y criterio.",
  },
  {
    id: "06",
    title: "Asesoría de Diseño",
    description: "Consultoría en etapa temprana para terreno, concepto y decisiones de desarrollo.",
  },
];

export const projectCategories: Array<ProjectCategory | "Todas"> = [
  "Todas",
  "Residencial",
  "Comercial",
  "Planeamiento Urbano",
  "Cultural",
];

export const projects: Project[] = [
  {
    slug: "coastal-courtyard-house",
    title: "Casa Patio Costera",
    category: "Residencial",
    location: "Biscayne Bay, FL",
    latitude: 25.7921,
    longitude: -80.1423,
    year: "2025",
    description: "Residencia frente al agua organizada alrededor de un patio ajardinado y galerías de sombra profunda.",
    coverImage: "/images/projects/coastal/hero.jpg",
    hoverImage: "/images/projects/coastal/gallery-1.jpg",
    hoverVideo: "/media/projects/coastal-construction.mp4",
    services: ["Arquitectura", "Arquitectura Interior", "Coordinación de Paisaje"],
    area: "980 m²",
    client: "Cliente Privado",
    hero: {
      type: "video",
      src: "/media/hero-architecture.mp4",
      poster: "/images/projects/coastal/hero.jpg",
    },
    gallery: [
      { src: "/images/projects/coastal/hero.jpg", alt: "Vista principal de la casa patio costera", width: 2000, height: 1250 },
      { src: "/images/projects/coastal/gallery-1.jpg", alt: "Patio central y circulación cubierta", width: 2000, height: 1250 },
      { src: "/images/projects/coastal/gallery-2.jpg", alt: "Composición de fachada al atardecer", width: 2000, height: 1250 },
      { src: "/images/projects/coastal/gallery-3.jpg", alt: "Salón interior con luz filtrada", width: 2000, height: 1250 },
    ],
    story: {
      challenge:
        "El terreno exigía privacidad frente a lotes vecinos sin perder las vistas abiertas a la bahía y garantizando ventilación natural cruzada.",
      approach:
        "La casa se organizó como una secuencia de umbrales alrededor de un vacío vegetal, incorporando aleros profundos y filtros perforados para controlar luz y calor.",
      result:
        "El resultado ofrece continuidad espacial serena, confort térmico y una paleta material contenida que envejece con dignidad.",
    },
  },
  {
    slug: "monolith-hotel-lobby",
    title: "Lobby del Hotel Monolith",
    category: "Comercial",
    location: "Ciudad de México, MX",
    latitude: 19.4326,
    longitude: -99.1332,
    year: "2024",
    description: "Experiencia de llegada esculpida por masa pétrea, detalles en bronce cálido y una iluminación dramática.",
    coverImage: "/images/projects/monolith/hero.jpg",
    hoverImage: "/images/projects/monolith/gallery-1.jpg",
    hoverVideo: "/media/projects/monolith-construction.mp4",
    services: ["Diseño Conceptual", "Arquitectura Interior", "Mobiliario a Medida"],
    area: "640 m²",
    hero: {
      type: "image",
      src: "/images/projects/monolith/hero.jpg",
    },
    gallery: [
      { src: "/images/projects/monolith/hero.jpg", alt: "Escena principal del lobby", width: 2000, height: 1250 },
      { src: "/images/projects/monolith/gallery-1.jpg", alt: "Distribución de recepción y lounge", width: 2000, height: 1250 },
      { src: "/images/projects/monolith/gallery-2.jpg", alt: "Detalle de mobiliario personalizado", width: 2000, height: 1250 },
    ],
    story: {
      challenge:
        "La planta baja existente carecía de identidad y orientación, generando una secuencia de acceso fragmentada para huéspedes.",
      approach:
        "Un elemento monolítico central ordena la circulación, mientras la iluminación calibrada y las superficies táctiles guían naturalmente la llegada a recepción.",
      result:
        "El nuevo lobby funciona como hito y espacio social, elevando la percepción de marca y la comodidad de los usuarios.",
    },
  },
  {
    slug: "atelier-office-campus",
    title: "Campus Corporativo Atelier",
    category: "Planeamiento Urbano",
    location: "Austin, TX",
    latitude: 30.2672,
    longitude: -97.7431,
    year: "2026",
    description: "Campus creativo de baja altura con patios porosos y fachadas sensibles al clima local.",
    coverImage: "/images/projects/atelier/hero.jpg",
    hoverImage: "/images/projects/atelier/gallery-2.jpg",
    hoverVideo: "/media/projects/atelier-construction.mp4",
    services: ["Plan Maestro", "Arquitectura", "Estrategia de Entorno Laboral"],
    area: "14.500 m²",
    client: "Grupo Atelier",
    hero: {
      type: "image",
      src: "/images/projects/atelier/hero.jpg",
    },
    gallery: [
      { src: "/images/projects/atelier/hero.jpg", alt: "Perspectiva aérea del campus", width: 2000, height: 1250 },
      { src: "/images/projects/atelier/gallery-1.jpg", alt: "Conexiones entre patios", width: 2000, height: 1250 },
      { src: "/images/projects/atelier/gallery-2.jpg", alt: "Interior colaborativo abierto", width: 2000, height: 1250 },
    ],
    story: {
      challenge:
        "El encargo requería alta densidad de puestos de trabajo conservando acceso a luz natural, conexión exterior y flexibilidad para crecimiento futuro.",
      approach:
        "Se propuso una estrategia compacta de clústeres alrededor de patios porosos, reduciendo ganancia térmica y creando anclas sociales en todo el predio.",
      result:
        "El campus opera como un ecosistema laboral adaptable, con identidad sólida, mejor desempeño ambiental y orientación clara.",
    },
  },
  {
    slug: "ridge-cultural-pavilion",
    title: "Pabellón Cultural Ridge",
    category: "Cultural",
    location: "Santa Fe, NM",
    latitude: 35.687,
    longitude: -105.9378,
    year: "2023",
    description: "Pabellón público compacto ubicado en una cresta para enmarcar horizontes amplios del desierto.",
    coverImage: "/images/projects/ridge/hero.jpg",
    hoverImage: "/images/projects/ridge/gallery-1.jpg",
    hoverVideo: "/media/projects/ridge-construction.mp4",
    services: ["Arquitectura", "Diseño de Espacio Público", "Investigación Material"],
    hero: {
      type: "image",
      src: "/images/projects/ridge/hero.jpg",
    },
    gallery: [
      { src: "/images/projects/ridge/hero.jpg", alt: "Silueta del pabellón sobre la cresta", width: 2000, height: 1250 },
      { src: "/images/projects/ridge/gallery-1.jpg", alt: "Encuentro público bajo cubierta", width: 2000, height: 1250 },
      { src: "/images/projects/ridge/gallery-2.jpg", alt: "Detalle tectónico de materialidad", width: 2000, height: 1250 },
    ],
    story: {
      challenge:
        "La mínima huella y el clima extremo exigían una propuesta robusta, con confort pasivo y presencia cívica.",
      approach:
        "La forma se redujo a gestos tectónicos esenciales, orientando sombra, estructura y cerramiento según sol y vientos predominantes.",
      result:
        "El pabellón funciona hoy como una sala cívica precisa y resiliente, con fuerte identidad local.",
    },
  },
];

// Spotlight selection for Home "Proyectos Destacados".
// Swap slugs here to curate the featured trio.
export const featuredProjectSlugs = [
  "coastal-courtyard-house",
  "monolith-hotel-lobby",
  "atelier-office-campus",
] as const;
