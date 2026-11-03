import type { Discipline, Proof } from "./disciplines";

const proofs = {
  mottika: { slug: "mottika", title: "Mottika", context: "Tres Astronautas", text: "Un switch multi-tenant que valida, enruta, tarifica y concilia transacciones con tarjeta." },
  emisys: { slug: "emisys", title: "Emisys", context: "Tres Astronautas", text: "Back-office y portales para gestionar el ciclo de vida de productos de tarjeta de crédito para fondos de empleados." },
  getsellers: { slug: "getsellers", title: "GetSellers", context: "Tres Astronautas", text: "Traspaso y modernización de un marketplace de leads en producción, con una billetera prepago sobre Stripe." },
  uncierre: { slug: "uncierre", title: "UnCierre", context: "Conversion", text: "Microservicios con event sourcing para venta y arriendo de inmuebles, con un dashboard y una app móvil." },
  midea: { slug: "midea-hvac", title: "Midea HVAC", context: "Tres Astronautas", text: "Un portal bilingüe, back-office y API con acceso por roles y una calculadora de carga térmica." },
  nido: { slug: "nido", title: "NIDO", context: "Tres Astronautas", text: "Una plataforma para conjuntos residenciales con una app para residentes, una app para el personal y un portal web." },
  comfandi: { slug: "comfandi-digital", title: "Comfandi Digital Products", context: "OL-Software", text: "Un portal y una app de salud para citas y resultados de laboratorio, y una plataforma de evaluaciones." },
} satisfies Record<string, Proof>;

export const disciplines: Discipline[] = [
  {
    id: "backend",
    title: "Backend",
    subtitle: "Servicios, APIs y sistemas orientados a eventos",
    lead: "Servicios backend construidos alrededor de límites de dominio claros: módulos hexagonales, mensajería entre servicios y pruebas que cubren cada caso de uso.",
    tags: ["Go", "Nest.js", "Kafka", "RabbitMQ"],
    covers: [
      "Servicios en Go y Nest.js",
      "Arquitectura orientada a eventos, Outbox y CQRS",
      "PostgreSQL, MongoDB y Prisma",
      "Rate limiting, trazabilidad y logging estructurado",
    ],
    proofs: [proofs.mottika, proofs.uncierre, proofs.getsellers],
  },
  {
    id: "web",
    title: "Plataformas web",
    subtitle: "Portales, back-offices y aplicaciones web",
    lead: "Aplicaciones en Next.js con acceso por roles, internacionalización y un sistema de diseño compartido entre apps.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    covers: [
      "Acceso por roles e inicio de sesión único",
      "Interfaces bilingües",
      "Librerías de componentes compartidas en monorepos",
      "Exportaciones estáticas servidas desde Firebase Hosting",
    ],
    proofs: [proofs.midea, proofs.getsellers, proofs.nido],
  },
  {
    id: "mobile",
    title: "Desarrollo móvil",
    subtitle: "iOS y Android con Expo",
    lead: "Apps en React Native para el uso diario, diseñadas para seguir funcionando cuando la conexión falla.",
    tags: ["React Native", "Expo", "NativeWind"],
    covers: [
      "Expo y React Native para iOS y Android",
      "Registro y sincronización sin conexión",
      "Notificaciones push",
      "Device binding y verificación OTP",
    ],
    proofs: [proofs.nido, proofs.uncierre, proofs.comfandi],
  },
  {
    id: "architecture",
    title: "Arquitectura",
    subtitle: "Diseño de sistemas y documentación",
    lead: "Arquitectura que queda por escrito: diagramas C4, atributos de calidad y modelos de dominio, con cada decisión registrada junto a su costo.",
    tags: ["C4", "Hexagonal", "DDD"],
    covers: [
      "Diagramas C4 desde el contexto hasta los componentes",
      "Modelos de dominio y flujos del sistema",
      "Decisiones registradas con sus costos",
      "Reglas de dependencias verificadas en CI",
    ],
    proofs: [proofs.mottika, proofs.emisys],
  },
];
