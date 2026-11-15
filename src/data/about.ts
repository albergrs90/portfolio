export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  bullets: string[];
}

export interface Principle {
  id: string;
  title: string;
  text: string;
}

export interface EducationItem {
  id: string;
  year: string;
  title: string;
  institution: string;
}

export const PROFILE = {
  name: "Alberto García Ríos",
  role: "Desarrollador Full-Stack",
  location: "Sevilla, España",
  modality: "Remoto",
  email: "alber.grs@gmail.com",
  phoneDisplay: "657 637 620",
  phoneHref: "tel:+34657637620",
  linkedin: "https://www.linkedin.com/in/alberto-garcia-rios-7042125b/",
  github: "https://github.com/albergrs90",
  cv: "/cv/alberto-garcia-rios-cv.pdf",
} as const;

export const FACTS = [
  { value: "8+", label: "años de experiencia" },
  { value: "Sevilla", label: "trabajo en remoto" },
  { value: "3", label: "productos publicados" },
] as const;

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "ayesa",
    role: "Desarrollador Full Stack",
    company: "AYESA",
    period: "jun 2021 — actualidad",
    location: "Sevilla",
    current: true,
    summary:
      "Aplicaciones corporativas que la empresa usa a diario: operaciones, imputación de horas, proyectos y RRHH.",
    bullets: [
      "React + .NET Core en aplicaciones internas de operaciones, horas, proyectos y RRHH.",
      "Orquesto agentes de IA para paralelizar testing, documentación y revisión de seguridad.",
      "Automatizaciones con Selenium + C#: +15 h/semana y un 40 % menos de errores de onboarding.",
      "Optimización de consultas SQL Server, con hasta un 35 % menos de tiempo de respuesta.",
      "Azure AD/SSO, CI/CD en Azure DevOps y mentoría de desarrolladores junior.",
    ],
  },
  {
    id: "sitel",
    role: "Desarrollador Frontend",
    company: "SITEL Ibérica",
    period: "feb 2013 — feb 2021",
    location: "Sevilla",
    summary:
      "Interfaces de uso interno para equipos de soporte, desde HTML/CSS hasta aplicaciones con JavaScript moderno.",
    bullets: [
      "Manuales digitales interactivos para agentes: un 25 % menos de tiempo de consulta.",
      "Evolución de HTML/CSS a JavaScript ES6+ y Tailwind CSS, con documentación para más de 200 agentes.",
    ],
  },
  {
    id: "simosa",
    role: "Técnico Microinformático",
    company: "SIMOSA IT / ABENGOA",
    period: "ene 2012 — jul 2012",
    location: "Sevilla",
    summary: "Soporte técnico y gestión de usuarios en entorno corporativo.",
    bullets: [],
  },
];

export const PRINCIPLES: Principle[] = [
  {
    id: "understand",
    title: "Entiendo antes de tocar código",
    text: "Requisitos, flujo y convenciones primero. Si no sé qué falla hoy, tampoco sé qué habrá que arreglar mañana.",
  },
  {
    id: "automate",
    title: "Automatizo lo repetitivo",
    text: "Selenium, CI/CD y agentes para testing y documentación. En AYESA son +15 h/semana que vuelven al producto.",
  },
  {
    id: "harden",
    title: "Lo que entrego tiene que aguantar",
    text: "Pruebas, revisión y mirada de seguridad. Un cambio pequeño y verificado antes que uno grande y frágil.",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "copilot",
    year: "2026",
    title: "Inteligencia Artificial en entornos Microsoft Copilot",
    institution: "OpenWebinars",
  },
  {
    id: "web",
    year: "2021",
    title: "Certificado de Profesionalidad — Desarrollo Web",
    institution: "Formatec",
  },
  {
    id: "dotnet",
    year: "2020",
    title: "IFCT011PO — Programación en .NET",
    institution: "Formate.es",
  },
  {
    id: "smr",
    year: "2010",
    title: "CFGM Sistemas Microinformáticos y Redes",
    institution: "I.E.S. Los Alcores",
  },
];

export const LANGUAGES = [
  { id: "es", name: "Español", level: "Nativo" },
  { id: "en", name: "Inglés", level: "B1 técnico · Cambridge" },
] as const;
