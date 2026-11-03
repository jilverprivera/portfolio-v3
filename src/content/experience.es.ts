import type { Job } from "./experience";

// Experiencia profesional, de la más reciente a la más antigua.
export const jobs: Job[] = [
  {
    company: "Tres Astronautas",
    role: "Senior Software Engineer",
    period: "Noviembre 2025 – Noviembre 2026",
    location: "Bogota D.C., Colombia (Remoto)",
    stack: ["Go", "Nest.js", "Next.js", "React Native", "Expo", "Tailwind CSS", "NativeWind", "Socket.IO", "PostgreSQL", "Prisma ORM", "MongoDB", "Kafka", "Transactional Outbox", "ISO 8583", "PCI DSS", "Hexagonal Architecture", "Redis", "SOLID principles", "PayPal", "Braintree", "Yappy", "Jest", "React Testing Library", "SDD (Spec-Driven Development)", "TDD (Test-Driven Development)", "BDD (Behavior-Driven Development)", "APISIX", "Keycloak", "gRPC"],
    highlights: [
      {
        title: "Fintech y core transaccional",
        text: "Desarrollé microservicios en Golang para el core transaccional de una plataforma de gestión de fondos de empleados en Colombia, con cumplimiento PCI DSS, integrando el protocolo ISO 8583, un motor de reglas en memoria y una arquitectura orientada a eventos con Kafka, el patrón Transactional Outbox y DLQ, con comunicación interna entre servicios sobre gRPC, logrando una latencia p99 menor a 500 ms bajo carga alta.",
      },
      {
        title: "Plataformas multi-tenant y móviles",
        text: "Construí una solución multi-tenant con una plataforma web (Next.js) y dos apps móviles (React Native/Expo), con Socket.IO, Device Binding, verificación OTP y persistencia híbrida (PostgreSQL/MongoDB).",
      },
      {
        title: "Soluciones empresariales a la medida",
        text: "Desarrollé plataformas con NestJS, Prisma ORM y PostgreSQL, con autenticación centralizada SSO/RBAC, soporte multi-idioma (i18n) y un motor de cálculo térmico para recomendar equipos de forma automática.",
      },
      {
        title: "Modernización, seguridad y observabilidad",
        text: "Migré servicios legacy a Arquitectura Hexagonal y optimicé consultas en MongoDB, reduciendo la latencia en 65%. Implementé logging estructurado, trazabilidad distribuida, rate limiting y protecciones contra inyección NoSQL.",
      },
      {
        title: "Documentación técnica y arquitectura",
        text: "Elaboré documentación técnica en varios proyectos: arquitectura C4, atributos de calidad, modelo de dominio, flujos y vistas del sistema, y backlog funcional, trabajando de la mano con el cliente y el equipo de producto para levantar requerimientos.",
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
    period: "Abril 2024 – Diciembre 2025",
    location: "Ciudad de Guatemala, Guatemala (Remoto)",
    stack: ["Node.js", "TypeScript", "Next.js", "Expo", "React Native", "Tailwind CSS", "NativeWind", "PostgreSQL", "Knex", "Hasura (GraphQL)", "RabbitMQ", "Hexagonal Architecture", "CQRS and Event Sourcing", "Jest", "Playwright", "Docker Swarm", "GitHub Actions", "SOLID principles", "TDD (Test-Driven Development)"],
    highlights: [
      {
        title: "Arquitectura y modernización",
        text: "Diseñé el desacople de un monolito legacy en microservicios orientados a eventos, aplicando Arquitectura Hexagonal, CQRS, Event Sourcing y mensajería asíncrona con RabbitMQ.",
      },
      {
        title: "Ingeniería de producto e impacto en el negocio",
        text: "Entregué apps móviles multiplataforma para gestión de propiedades y procesamiento de pagos, junto con motores de cotización y reservas, abriendo nuevas fuentes de ingreso que aumentaron las ventas en 40%.",
      },
      {
        title: "Calidad de software y pruebas",
        text: "Estandaricé la adopción de TDD y suites de pruebas automatizadas (unitarias, de integración y E2E) con Jest y Playwright, acortando los ciclos de salida a producción en 30%.",
      },
    ],
    projects: [{ slug: "uncierre", title: "UnCierre" }],
  },
  {
    company: "OL-Software",
    role: "Mid-level Software Engineer",
    period: "Junio 2025 – Octubre 2025",
    location: "Cali, Colombia (Remoto)",
    stack: ["Next.js", "Expo", "React Native", "Nest.js", "PostgreSQL", "Prisma ORM", "Jest", "TDD (Test-Driven Development)", "React Testing Library", "Supertest", "Turborepo", "SOLID principles"],
    highlights: [
      {
        title: "Frontend y multiplataforma",
        text: "Construí interfaces web y móviles unificadas para aplicaciones médicas y educativas con Next.js, React Native y Expo, creando una librería de componentes reutilizables compartida entre plataformas.",
      },
      {
        title: "Migración de backend y calidad",
        text: "Migré funcionalidades clave del monolito a microservicios escalables en Nest.js, adoptando prácticas estrictas de TDD y pruebas unitarias automatizadas con Jest para asegurar la mantenibilidad del código.",
      },
    ],
    projects: [{ slug: "comfandi-digital", title: "Productos digitales de Comfandi" }],
  },
  {
    company: "MarketXM",
    role: "Fullstack Developer",
    period: "Abril 2023 – Abril 2024",
    location: "Bogota D.C., Colombia (Remoto)",
    stack: ["AWS", "Event-driven microservices", "Blockchain", "Clean Architecture", "Hexagonal Architecture", "SOLID principles", "Redis", "CouchDB", "Node.js", "TypeScript", "React", "Tailwind CSS"],
    highlights: [
      {
        title: "Fintech y blockchain",
        text: "Construí módulos clave de una plataforma B2B de gestión de colaterales en mercados de derivados OTC, integrando tecnología blockchain para la liquidación automática de activos.",
      },
      {
        title: "Modernización de arquitectura y backend en la nube",
        text: "Lideré la migración de sistemas backend monolíticos a microservicios orientados a eventos en AWS, aplicando Clean Architecture, Arquitectura Hexagonal y principios SOLID.",
      },
    ],
  },
  {
    company: "Gigamonos",
    role: "Fullstack Developer",
    period: "Enero 2023 – Abril 2023",
    location: "Bogota D.C., Colombia (Remoto)",
    stack: ["GitHub Actions", "AWS", "CI/CD pipelines", "React", "styled-components", "PostgreSQL", "Python", "Flask", "SQLAlchemy"],
    highlights: [
      {
        title: "Ingeniería de producto y analítica",
        text: "Desarrollé una plataforma SaaS B2B de descarbonización con motores de encuestas dinámicas y reportes analíticos automatizados para cuantificar métricas ambientales de empresas.",
      },
      {
        title: "Automatización CI/CD y despliegue",
        text: "Configuré pipelines de integración y entrega continua (CI/CD) con GitHub Actions y servicios de AWS, automatizando suites de pruebas y despliegues a producción.",
      },
    ],
  },
  {
    company: "DAGABOT",
    role: "Junior Electronic Engineer",
    period: "Enero 2022 – Junio 2022",
    location: "Bucaramanga, Colombia (Híbrido)",
    stack: ["C", "PIC microcontrollers", "WordPress"],
    highlights: [
      {
        title: "Sistemas embebidos y firmware",
        text: "Ensamblé y programé robots educativos en lenguaje C para microcontroladores PIC, desarrollando lazos de control de bajo nivel y automatización de hardware.",
      },
      {
        title: "Herramientas internas y formación",
        text: "Implementé una plataforma LMS personalizada en WordPress para agilizar el onboarding técnico interno y dicté talleres prácticos de robótica y lógica computacional.",
      },
    ],
  },
  {
    company: "DyCO Solutions",
    role: "Junior Frontend Developer",
    period: "Julio 2020 – Diciembre 2020",
    location: "Bucaramanga, Colombia (Remoto)",
    stack: ["Firebase", "Cloud Firestore", "React", "Express", "Socket.IO", "PostgreSQL"],
    highlights: [
      {
        title: "Desarrollo full-stack y en la nube",
        text: "Construí una plataforma B2C de gestión de talento con un flujo de asistente virtual, usando Firebase y Cloud Firestore para autenticación, persistencia de datos y sincronización de estado en tiempo real.",
      },
    ],
  },
];

export const education = {
  degree: "Ingeniería Electrónica",
  school: "Universidad de Investigación y Desarrollo (UDI)",
  place: "Bucaramanga, Colombia",
  period: "Febrero 2017 – Febrero 2023",
  honors: [
    "Equipo de robótica #1 de Colombia (Campeón Nacional, 2020).",
    "Tercer mejor equipo de robótica de Latinoamérica (2021).",
    "Mención de honor académica por conferencias y talleres de formación en Inteligencia Artificial para estudiantes universitarios (2021).",
  ],
};
