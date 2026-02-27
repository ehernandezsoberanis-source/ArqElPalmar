export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
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
    image: "/Servicios/ArquitecturaResidencial.jpg",
  },
  {
    id: "02",
    title: "Diseño Hotelero",
    description: "Espacios de hospitalidad boutique que equilibran atmósfera, circulación e identidad.",
    image: "/Servicios/Dise%C3%B1oHotelero.jpg",
  },
  {
    id: "03",
    title: "Arquitectura Interior",
    description: "Sistemas interiores refinados donde luz, estructura y oficio definen el carácter.",
    image: "/Servicios/ArquitecturaInterior.jpg",
  },
  {
    id: "04",
    title: "Plan Maestro",
    description: "Estrategias de planificación urbana y costera guiadas por el contexto y la resiliencia.",
    image: "/Servicios/PlanMaestro.jpg",
  },
  {
    id: "05",
    title: "Renovación + Reuso Adaptativo",
    description: "Transformación de estructuras existentes mediante detalle preciso y criterio.",
    image: "/Servicios/Renovacion.jpg",
  },
  {
    id: "06",
    title: "Asesoría de Diseño",
    description: "Consultoría en etapa temprana para terreno, concepto y decisiones de desarrollo.",
    image: "/Servicios/Asesoria.jpg",
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
    title: "Plaza Real",
    category: "Residencial",
    location: "Zihuatanejo, Guerrero, México",
    latitude: 17.6417,
    longitude: -101.5517,
    year: "2025",
    description:
      "Plaza Real es un espacio de uso mixto, que combina áreas deportivas, culturales y gastronómicas en un diseño moderno y funcional. Creado para ser un punto de encuentro social en Zihuatanejo. Cuenta con un par de canchas modernas con instalaciones cómodas e iluminación óptima y un área comercial con gran diversidad gastronómica.",
    coverImage: "/Cards/PlazaReal.jpg",
    hoverImage: "/Cards/PlazaReal.jpg",
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
    title: "Restaurant The General's",
    category: "Comercial",
    location: "Ixtapa, Zihuatanejo, Guerrero, México",
    latitude: 17.664,
    longitude: -101.606,
    year: "2024",
    description:
      "El proyecto \"The Generals Sports Bar & Restaurant\" consistió en el desarrollo integral de obra civil, desde la cimentación hasta la etapa de \"obra gris\". Este espacio fue concebido con una estructura sólida y funcional, diseñada para adaptarse a las necesidades operativas del restaurante y bar deportivo.",
    coverImage: "/Cards/Generals.PNG",
    hoverImage: "/Cards/Generals.PNG",
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
    title: "Bonanza Condominios",
    category: "Planeamiento Urbano",
    location: "Ixtapa, Zihuatanejo, Guerrero, México",
    latitude: 17.6585,
    longitude: -101.5825,
    year: "2026",
    description:
      "Compuesto por un total de 28 departamentos, Bonanza Condominios ofrece un estilo de vida cómodo y accesible, en un modelo establecido de dos recámaras y dos baños completos, complementado con amenidades tales como albercas con chapoteadero, cabañas de uso múltiple, juegos para niños y áreas verdes.",
    coverImage: "/Cards/BonansaCondominios.PNG",
    hoverImage: "/Cards/BonansaCondominios.PNG",
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
    title: "Plaza Cocos",
    category: "Cultural",
    location: "La Puerta, Ixtapa-Zihuatanejo, Guerrero, México",
    latitude: 17.6572,
    longitude: -101.5798,
    year: "2023",
    description:
      "Plaza Cocos es un espacio de uso mixto, que combina actividades deportivas, gastronómicas y culturales en Col. La Puerta. El proyecto destaca por su enfoque contemporáneo al implementar un sistema constructivo basado en contenedores marítimos, aprovechando su versatilidad para crear locales comerciales modernos y estéticamente atractivos.",
    coverImage: "/Cards/PlazaCocos.PNG",
    hoverImage: "/Cards/PlazaCocos.PNG",
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
