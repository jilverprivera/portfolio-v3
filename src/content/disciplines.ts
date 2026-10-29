export type Proof = { slug: string; title: string; context: string; text: string };

export type Discipline = {
  id: string;
  title: string;
  subtitle: string;
  lead: string;
  tags: string[];
  covers: string[];
  proofs: Proof[];
};

const proofs = {
  mottika: { slug: "mottika", title: "Mottika", context: "Tres Astronautas", text: "A multi-tenant switch that validates, routes, prices and reconciles card transactions." },
  emisys: { slug: "emisys", title: "Emisys", context: "Tres Astronautas", text: "Back-office and portals to run the lifecycle of credit-card products for employee funds." },
  getsellers: { slug: "getsellers", title: "GetSellers", context: "Tres Astronautas", text: "Handover and modernization of a live lead marketplace, with a prepaid wallet on Stripe." },
  uncierre: { slug: "uncierre", title: "UnCierre", context: "Conversion", text: "Event-sourced microservices for real-estate sales and rentals, with a dashboard and a mobile app." },
  midea: { slug: "midea-hvac", title: "Midea HVAC", context: "Tres Astronautas", text: "A bilingual portal and API with SSO, role-based access and a thermal load calculator." },
  nido: { slug: "nido", title: "NIDO", context: "Tres Astronautas", text: "A condominium platform with a resident app, a staff app and a web portal." },
  comfandi: { slug: "comfandi-digital", title: "Comfandi Digital Products", context: "OL-Software", text: "A health portal and app for appointments and lab results, and an assessment platform." },
} satisfies Record<string, Proof>;

export const disciplines: Discipline[] = [
  {
    id: "backend",
    title: "Backend",
    subtitle: "Services, APIs and event-driven systems",
    lead: "Backend services built around clear domain boundaries: hexagonal modules, messaging between services and tests that cover each use case.",
    tags: ["Go", "Nest.js", "Kafka", "RabbitMQ"],
    covers: [
      "Go and Nest.js services",
      "Event-driven architecture, Outbox and CQRS",
      "PostgreSQL, MongoDB and Prisma",
      "Rate limiting, tracing and structured logging",
    ],
    proofs: [proofs.mottika, proofs.uncierre, proofs.getsellers],
  },
  {
    id: "web",
    title: "Web platforms",
    subtitle: "Portals, back-offices and web apps",
    lead: "Next.js applications with role-based access, internationalization and a shared design system across apps.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    covers: [
      "Role-based access and single sign-on",
      "Bilingual interfaces",
      "Shared component libraries in monorepos",
      "Static exports served from Firebase Hosting",
    ],
    proofs: [proofs.midea, proofs.emisys, proofs.nido],
  },
  {
    id: "mobile",
    title: "Mobile development",
    subtitle: "iOS and Android with Expo",
    lead: "React Native apps for daily use, designed to keep working when the connection does not.",
    tags: ["React Native", "Expo", "NativeWind"],
    covers: [
      "Expo and React Native for iOS and Android",
      "Offline registration and sync",
      "Push notifications",
      "Device binding and OTP verification",
    ],
    proofs: [proofs.nido, proofs.uncierre, proofs.comfandi],
  },
  {
    id: "architecture",
    title: "Architecture",
    subtitle: "System design and documentation",
    lead: "Architecture that is written down: C4 diagrams, quality attributes and domain models, with each decision recorded next to its trade-off.",
    tags: ["C4", "Hexagonal", "DDD"],
    covers: [
      "C4 diagrams from context to components",
      "Domain models and system flows",
      "Decisions recorded with their trade-offs",
      "Dependency rules checked in CI",
    ],
    proofs: [proofs.midea, proofs.getsellers],
  },
];
