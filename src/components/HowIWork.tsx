import {
  ArrowRight,
  Bug,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { GithubIcon } from "./SocialIcons";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { BTN_PRIMARY, CONTAINER, LABEL } from "./ui";

interface Scenario {
  id: string;
  title: string;
  description: string;
  agents: string[];
  icon: ReactNode;
}

const SCENARIOS: Scenario[] = [
  {
    id: "new-project",
    title: "Crear un proyecto",
    description:
      "Empiezo por aclarar los requisitos y las necesidades. Después valoro la arquitectura y las tecnologías antes de implementar.",
    agents: [
      "Business Analyst",
      "Software Architect",
      "React Specialist, .NET Specialist o SQL Server Specialist, según el alcance",
    ],
    icon: <Rocket className="w-6 h-6" aria-hidden="true" />,
  },
  {
    id: "extend-app",
    title: "Ampliar una aplicación existente",
    description:
      "Antes de añadir una funcionalidad reviso la estructura, las convenciones y el impacto del cambio. Después interviene el especialista de la parte afectada.",
    agents: [
      "Codebase Analyst",
      "Especialista técnico correspondiente",
      "QA Engineer",
      "Code Reviewer",
    ],
    icon: <Layers className="w-6 h-6" aria-hidden="true" />,
  },
  {
    id: "debug",
    title: "Investigar y resolver un error",
    description:
      "Primero intento entender y reproducir el problema, reunir evidencias y determinar la causa. Después implemento la corrección y compruebo que funciona sin introducir regresiones.",
    agents: [
      "Bug Investigator",
      "Root Cause Analyst, cuando sea necesario",
      "Especialista técnico correspondiente",
      "QA Engineer",
    ],
    icon: <Bug className="w-6 h-6" aria-hidden="true" />,
  },
  {
    id: "maintenance",
    title: "Mantener o refactorizar una aplicación",
    description:
      "Los cambios de mantenimiento respetan el comportamiento y las convenciones del sistema existente. También valido las áreas que podrían verse afectadas.",
    agents: [
      "Codebase Analyst",
      "Especialista técnico correspondiente",
      "QA Engineer",
      "Code Reviewer",
    ],
    icon: <Wrench className="w-6 h-6" aria-hidden="true" />,
  },
  {
    id: "performance",
    title: "Mejorar el rendimiento",
    description:
      "Busco mediciones o evidencias para identificar el cuello de botella. Después priorizo las mejoras y comparo el resultado cuando es posible.",
    agents: [
      "Performance Engineer",
      "React Specialist, .NET Specialist o SQL Server Specialist, según el origen",
    ],
    icon: <Gauge className="w-6 h-6" aria-hidden="true" />,
  },
  {
    id: "validate",
    title: "Validar un cambio",
    description:
      "Antes de considerar terminado un cambio, reviso si cumple los requisitos, si tiene pruebas adecuadas y si introduce riesgos o regresiones.",
    agents: ["QA Engineer", "Code Reviewer"],
    icon: <ClipboardCheck className="w-6 h-6" aria-hidden="true" />,
  },
];

const AI_POINTS = [
  "OpenCode es mi entorno de trabajo con asistencia de IA.",
  "Elijo los agentes según la tarea; no los utilizo todos en cada desarrollo.",
  "Reviso sus propuestas y valido los resultados antes de incorporarlos.",
];

const ICON_WRAP =
  "text-muted [&>svg]:h-4 [&>svg]:w-4 [&>svg]:stroke-[1.5]";

export const HowIWork = () => {
  usePageMeta(
    "Cómo trabajo · Alberto García Ríos",
    "Cómo afronto un proyecto, una ampliación, un error o una mejora de rendimiento: entender el problema, decidir, implementar y verificar, con apoyo de agentes de IA.",
  );

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <PageHeader
        index="02"
        label="Cómo trabajo"
        title={
          <>
            Así convierto una idea en <span className="italic">software</span>.
          </>
        }
        description="Antes de escribir código, intento entender el problema: qué se necesita, cómo funciona el sistema y qué impacto puede tener el cambio. Después elijo un enfoque, implemento lo necesario y compruebo el resultado con pruebas y revisión."
      />

      <div className={CONTAINER}>
        {/* Escenarios */}
        <Reveal className="pt-14">
          <ul className="grid list-none gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.map((scenario, index) => (
              <li key={scenario.id} className="border-t border-line pt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={ICON_WRAP}>{scenario.icon}</span>
                </div>

                <h2 className="mt-5 font-display text-2xl leading-tight tracking-[-0.01em] text-ink">
                  {scenario.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {scenario.description}
                </p>

                <div className="mt-5 border-t border-line pt-3">
                  <p className={LABEL}>Apoyo</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {scenario.agents.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* IA y OpenCode */}
        <Reveal className="mt-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <section className="lg:col-span-7" aria-labelledby="ai-title">
              <h2
                id="ai-title"
                className="flex items-center gap-3 border-b border-line pb-4 font-display text-3xl tracking-[-0.02em] text-ink"
              >
                <Sparkles
                  className="h-4 w-4 text-muted"
                  aria-hidden="true"
                />
                OpenCode y agentes de IA
              </h2>

              <p className="mt-5 leading-relaxed text-muted">
                Para apoyarme en ese proceso utilizo{" "}
                <strong className="font-medium text-ink">OpenCode</strong> y
                agentes de IA especializados. Los selecciono según el reto
                —por ejemplo, para analizar requisitos, explorar una base de
                código, investigar errores o revisar aspectos de calidad— y
                verifico sus propuestas antes de incorporarlas.
              </p>

              <ul className="mt-6 space-y-3">
                {AI_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="lg:col-span-5" aria-labelledby="orchestration-title">
              <h2
                id="orchestration-title"
                className="flex items-center gap-3 border-b border-line pb-4 font-display text-3xl tracking-[-0.02em] text-ink"
              >
                <Workflow
                  className="h-4 w-4 text-muted"
                  aria-hidden="true"
                />
                Orquestación
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-muted">
                No utilizo todos los agentes en cada tarea. Selecciono los que
                pueden aportar valor según el contexto y, cuando hay varias
                disciplinas o dependencias, puedo apoyarme en un{" "}
                <strong className="font-medium text-ink">Orchestrator</strong>{" "}
                para organizar el trabajo.
              </p>

              <div className="mt-6 flex items-start gap-3 border-t border-line pt-5">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-muted">
                  Cuando el cambio afecta a autenticación, permisos, datos
                  sensibles o configuración, incorporo una revisión con el{" "}
                  <strong className="font-medium text-ink">
                    Security Engineer
                  </strong>
                  .
                </p>
              </div>
            </section>
          </div>
        </Reveal>

        {/* Cierre */}
        <section className="mt-20 border-t border-line pt-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl font-display text-2xl leading-snug tracking-[-0.01em] text-ink sm:text-3xl">
              La IA me ayuda a trabajar;{" "}
              <span className="italic text-muted">
                la responsabilidad sobre las decisiones y el resultado sigue
                siendo mía.
              </span>
            </p>

            <a
              href="https://github.com/albergrs90/software-development-agents"
              target="_blank"
              rel="noopener noreferrer"
              className={`${BTN_PRIMARY} shrink-0`}
            >
              <GithubIcon className="h-4 w-4" />
              Ver mis agentes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
