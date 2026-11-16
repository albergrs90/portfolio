import { Terminal, Code2, Database, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { CONTAINER } from "./ui";

interface Skill {
  id: string;
  name: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    icon: <Terminal className="h-4 w-4 text-muted" aria-hidden="true" />,
    description:
      "APIs RESTful, lógica de negocio y arquitectura del lado del servidor.",
    skills: [
      { id: "dotnet-core", name: ".NET Core" },
      { id: "csharp", name: "C# 12+" },
      { id: "aspnet", name: "ASP.NET" },
      { id: "entity-framework", name: "Entity Framework" },
      { id: "rest-apis", name: "REST APIs" },
      { id: "clean-architecture", name: "Clean Architecture" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: <Code2 className="h-4 w-4 text-muted" aria-hidden="true" />,
    description:
      "Interfaces interactivas, accesibles y adaptativas, con foco en el detalle.",
    skills: [
      { id: "react", name: "React" },
      { id: "typescript", name: "TypeScript" },
      { id: "javascript", name: "JavaScript ES6+" },
      { id: "tailwind-css", name: "Tailwind CSS" },
      { id: "html-css", name: "HTML5 / CSS3" },
    ],
  },
  {
    id: "databases",
    title: "Bases de datos",
    icon: <Database className="h-4 w-4 text-muted" aria-hidden="true" />,
    description:
      "Diseño relacional, modelado de datos y optimización de consultas.",
    skills: [
      { id: "sql-server", name: "SQL Server" },
      { id: "t-sql", name: "T-SQL" },
      { id: "table-design", name: "Diseño de tablas" },
      { id: "stored-procedures", name: "Procedimientos almacenados" },
      { id: "optimization", name: "Optimización" },
    ],
  },
  {
    id: "platform",
    title: "Plataforma e IA",
    icon: <Wrench className="h-4 w-4 text-muted" aria-hidden="true" />,
    description:
      "Identidad, entrega continua y agentes que aceleran el trabajo sin quitar criterio.",
    skills: [
      { id: "azure-ad", name: "Azure AD / SSO" },
      { id: "azure-devops", name: "Azure DevOps" },
      { id: "ci-cd", name: "CI/CD" },
      { id: "copilot", name: "GitHub Copilot" },
      { id: "agents", name: "Agentes de IA" },
      { id: "selenium", name: "Selenium" },
      { id: "git", name: "Git" },
    ],
  },
];

export const Skills = () => {
  usePageMeta(
    "Tecnologías · Alberto García Ríos",
    "Stack de Alberto García Ríos: .NET Core, C#, React, TypeScript, SQL Server, Azure AD, Azure DevOps, Git y agentes de IA aplicados al desarrollo.",
  );

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <PageHeader
        index="03"
        label="Tecnologías"
        title={
          <>
            Las herramientas con las que <span className="italic">trabajo</span>.
          </>
        }
        description="Lo que uso en el día a día para construir y mantener aplicaciones de principio a fin. No es una lista de logos: es el stack con el que puedo empezar mañana."
      />

      <div className={CONTAINER}>
        <div className="grid gap-x-12 gap-y-14 pt-14 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, index) => (
            <Reveal key={category.id} delay={index * 60}>
              <section
                className="border-t border-line pt-6"
                aria-labelledby={`skill-${category.id}`}
              >
                <div className="flex items-center gap-2.5">
                  {category.icon}
                  <h2
                    id={`skill-${category.id}`}
                    className="font-display text-2xl tracking-[-0.01em] text-ink"
                  >
                    {category.title}
                  </h2>
                </div>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  {category.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.id}
                      className="rounded-md border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};
