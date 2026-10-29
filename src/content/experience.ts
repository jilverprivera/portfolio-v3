export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  highlights: { title: string; text: string }[];
  // Project pages that came out of this job.
  projects?: { slug: string; title: string }[];
};

// Professional experience, newest first.
export const jobs: Job[] = [
  {
    company: "Tres Astronautas",
    role: "Senior Software Engineer",
    period: "November 2025 – November 2026",
    location: "Bogota D.C., Colombia (Remote)",
    stack: ["Go", "Nest.js", "Next.js", "React Native", "Expo", "Tailwind CSS", "NativeWind", "Socket.IO", "PostgreSQL", "Prisma ORM", "MongoDB", "Kafka", "Transactional Outbox", "ISO 8583", "PCI DSS", "Hexagonal Architecture", "Redis", "SOLID principles", "PayPal", "Braintree", "Yappy", "Jest", "React Testing Library", "SDD (Spec-Driven Development)", "TDD (Test-Driven Development)", "BDD (Behavior-Driven Development)", "APISIX", "Keycloak", "gRPC"],
    highlights: [
      {
        title: "Fintech & transactional core",
        text: "Developed Golang microservices for the transactional core of a platform for employee fund management in Colombia, PCI DSS compliant, integrating the ISO 8583 protocol, an in-memory rules engine, and an event-driven architecture with Kafka, the Transactional Outbox pattern, and DLQ, with internal service-to-service communication over gRPC, achieving p99 latency under 500 ms under heavy load.",
      },
      {
        title: "Multi-tenant & mobile platforms",
        text: "Built a multi-tenant solution with a web platform (Next.js) and two mobile apps (React Native/Expo), featuring Socket.IO, Device Binding, OTP verification, and hybrid persistence (PostgreSQL/MongoDB).",
      },
      {
        title: "Custom enterprise solutions",
        text: "Developed platforms with NestJS, Prisma ORM, and PostgreSQL, featuring centralized SSO/RBAC authentication, multi-language (i18n) support, and a thermal calculation engine for automated equipment recommendations.",
      },
      {
        title: "Modernization, security & observability",
        text: "Migrated legacy services to Hexagonal Architecture and optimized MongoDB queries, reducing latency by 65%. Implemented structured logging, distributed tracing, rate limiting, and NoSQL injection protections.",
      },
      {
        title: "Technical documentation & architecture",
        text: "Produced technical documentation across several projects: C4 architecture, quality attributes, domain model, system flows and views, and functional backlog, working hand in hand with the client and the product team to gather requirements.",
      },
    ],
    projects: [
      { slug: "mottika", title: "Mottika" },
      { slug: "emisys", title: "Emisys" },
      { slug: "nido", title: "NIDO" },
      { slug: "midea-hvac", title: "Midea HVAC" },
      { slug: "getsellers", title: "GetSellers" },
    ],
  },
  {
    company: "Conversion (UnCierre)",
    role: "Mid-level Software Engineer",
    period: "April 2024 – December 2025",
    location: "Guatemala City, Guatemala (Remote)",
    stack: ["Node.js", "TypeScript", "Next.js", "Expo", "React Native", "Tailwind CSS", "NativeWind", "PostgreSQL", "Knex", "Hasura (GraphQL)", "RabbitMQ", "Hexagonal Architecture", "CQRS and Event Sourcing", "Jest", "Playwright", "Docker Swarm", "GitHub Actions", "SOLID principles", "TDD (Test-Driven Development)"],
    highlights: [
      {
        title: "Architecture & modernization",
        text: "Architected the decoupling of a legacy monolith into event-driven microservices applying Hexagonal Architecture, CQRS, Event Sourcing, and asynchronous messaging with RabbitMQ.",
      },
      {
        title: "Product engineering & business impact",
        text: "Delivered cross-platform mobile apps for property management and payment processing alongside quote and booking engines, unlocking new revenue streams that boosted sales by 40%.",
      },
      {
        title: "Software quality & testing",
        text: "Standardized TDD adoption and automated test suites (unit, integration, and E2E) utilizing Jest and Playwright, shortening production release cycles by 30%.",
      },
    ],
    projects: [{ slug: "uncierre", title: "UnCierre" }],
  },
  {
    company: "OL-Software",
    role: "Mid-level Software Engineer",
    period: "June 2025 – October 2025",
    location: "Cali, Colombia (Remote)",
    stack: ["Next.js", "Expo", "React Native", "Nest.js", "PostgreSQL", "Prisma ORM", "Jest", "TDD (Test-Driven Development)", "React Testing Library", "Supertest", "Turborepo", "SOLID principles"],
    highlights: [
      {
        title: "Frontend & cross-platform",
        text: "Engineered unified web and mobile interfaces for medical and educational applications with Next.js, React Native, and Expo, establishing a shared reusable component library across platforms.",
      },
      {
        title: "Backend migration & quality",
        text: "Migrated core monolith features to scalable Nest.js microservices, adopting strict TDD practices and automated unit testing with Jest to guarantee code maintainability.",
      },
    ],
    projects: [{ slug: "comfandi-digital", title: "Comfandi digital products" }],
  },
  {
    company: "MarketXM",
    role: "Fullstack Developer",
    period: "April 2023 – April 2024",
    location: "Bogota D.C., Colombia (Remote)",
    stack: ["AWS", "Event-driven microservices", "Blockchain", "Clean Architecture", "Hexagonal Architecture", "SOLID principles", "Redis", "CouchDB", "Node.js", "TypeScript", "React", "Tailwind CSS"],
    highlights: [
      {
        title: "Fintech & blockchain",
        text: "Engineered core modules for a B2B collateral management platform in OTC derivatives markets, integrating blockchain technology for automated asset settlement.",
      },
      {
        title: "Architecture modernization & cloud backend",
        text: "Spearheaded the migration from monolithic backend systems to event-driven microservices on AWS, enforcing Clean/Hexagonal Architecture and SOLID principles.",
      },
    ],
  },
  {
    company: "Gigamonos",
    role: "Fullstack Developer",
    period: "January 2023 – April 2023",
    location: "Bogota D.C., Colombia (Remote)",
    stack: ["GitHub Actions", "AWS", "CI/CD pipelines", "React", "styled-components", "PostgreSQL", "Python", "Flask", "SQLAlchemy"],
    highlights: [
      {
        title: "Product engineering & analytics",
        text: "Developed a B2B decarbonization SaaS platform featuring dynamic survey engines and automated analytics reporting to quantify enterprise environmental metrics.",
      },
      {
        title: "CI/CD automation & deployment",
        text: "Configured robust continuous integration and delivery (CI/CD) pipelines with GitHub Actions and AWS services, automating testing suites and production deployments.",
      },
    ],
  },
  {
    company: "DAGABOT",
    role: "Junior Electronic Engineer",
    period: "January 2022 – June 2022",
    location: "Bucaramanga, Colombia (Hybrid)",
    stack: ["C", "PIC microcontrollers", "WordPress"],
    highlights: [
      {
        title: "Embedded systems & firmware",
        text: "Assembled and programmed educational robots in C language targeting PIC microcontrollers, developing low-level control loops and hardware automation.",
      },
      {
        title: "Internal tooling & training",
        text: "Implemented a customized LMS platform on WordPress to streamline internal technical onboarding and delivered hands-on robotics and computational logic workshops.",
      },
    ],
  },
  {
    company: "DyCO Solutions",
    role: "Junior Frontend Developer",
    period: "July 2020 – December 2020",
    location: "Bucaramanga, Colombia (Remote)",
    stack: ["Firebase", "Cloud Firestore", "React", "Express", "Socket.IO", "PostgreSQL"],
    highlights: [
      {
        title: "Full-stack & cloud development",
        text: "Built a B2C talent management platform with a virtual assistant workflow, leveraging Firebase and Cloud Firestore for authentication, data persistence, and real-time state synchronization.",
      },
    ],
  },
];

export const education = {
  degree: "B.S. in Electronic Engineering",
  school: "Universidad de Investigación y Desarrollo (UDI)",
  place: "Bucaramanga, Colombia",
  period: "February 2017 – February 2023",
  honors: [
    "Ranked #1 Robotics Team in Colombia (National Champion, 2020).",
    "Ranked 3rd Best Robotics Team across Latin America (2021).",
    "Academic Honor Award for keynote lectures and training workshops in Artificial Intelligence for university students (2021).",
  ],
};

// Technology groups, in the order they are shown.
const stackGroups: Record<string, string[]> = {
  "Languages & runtimes": [
    "Go",
    "C",
    "Python",
    "Node.js",
    "TypeScript"
  ],
  "Backend & architecture": [
    "Nest.js",
    "Express",
    "Flask",
    "Hexagonal Architecture",
    "Clean Architecture",
    "CQRS and Event Sourcing",
    "Event-driven microservices",
    "Transactional Outbox",
    "SOLID principles",
    "APISIX",
    "Keycloak",
    "gRPC",
    "Hasura (GraphQL)"
  ],
  "Frontend & mobile": [
    "Next.js",
    "React",
    "React Native",
    "Expo",
    "Tailwind CSS",
    "NativeWind",
    "styled-components"
  ],
  "Databases & cache": [
    "PostgreSQL",
    "MongoDB",
    "CouchDB",
    "Redis",
    "Cloud Firestore",
    "Prisma ORM",
    "Knex",
    "SQLAlchemy"
  ],
  "Messaging & cloud": [
    "AWS",
    "Kafka",
    "RabbitMQ",
    "Socket.IO",
    "Firebase",
    "Docker Swarm",
    "GitHub Actions",
    "CI/CD pipelines"
  ],
  "Testing & practices": [
    "Jest",
    "Playwright",
    "React Testing Library",
    "Supertest",
    "SDD (Spec-Driven Development)",
    "TDD (Test-Driven Development)",
    "BDD (Behavior-Driven Development)"
  ],
  "Payments & protocols": [
    "ISO 8583",
    "PCI DSS",
    "PayPal",
    "Braintree",
    "Yappy",
    "Blockchain"
  ],
  "Tools & hardware": [
    "Turborepo",
    "WordPress",
    "PIC microcontrollers"
  ]
};

// Splits a flat stack into groups by type; each group is sorted alphabetically.
export function groupStack(stack: string[]): { group: string; items: string[] }[] {
  return Object.entries(stackGroups)
    .map(([group, known]) => ({
      group,
      items: stack.filter((item) => known.includes(item)).sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })),
    }))
    .filter((g) => g.items.length > 0);
}
