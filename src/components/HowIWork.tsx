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
import { usePageMeta } from "../hooks/usePageMeta";

interface Scenario {
  id: string;
  title: string;
  description: string;
  agents: string[];
  icon: ReactNode;
  colorClass: string;
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
    colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
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
    colorClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
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
    colorClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
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
    colorClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
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
    colorClass: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  {
    id: "validate",
    title: "Validar un cambio",
    description:
      "Antes de considerar terminado un cambio, reviso si cumple los requisitos, si tiene pruebas adecuadas y si introduce riesgos o regresiones.",
    agents: ["QA Engineer", "Code Reviewer"],
    icon: <ClipboardCheck className="w-6 h-6" aria-hidden="true" />,
    colorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];

const AI_POINTS = [
  "OpenCode es mi entorno de trabajo con asistencia de IA.",
  "Elijo los agentes según la tarea; no los utilizo todos en cada desarrollo.",
  "Reviso sus propuestas y valido los resultados antes de incorporarlos.",
];

export const HowIWork = () => {
  usePageMeta(
    "Cómo trabajo · Alberto García Ríos",
    "Cómo afronto un proyecto, una ampliación, un error o una mejora de rendimiento: entender el problema, decidir, implementar y verificar, con apoyo de agentes de IA.",
  );

  return (
    <section
      id="how-i-work"
      aria-labelledby="how-i-work-title"
      className="py-20 md:py-28 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1
            id="how-i-work-title"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Así convierto una idea en{" "}
            <span className="text-blue-500">software</span>
          </h1>
          <p className="mt-3 text-slate-400 text-lg max-w-3xl leading-relaxed">
            Antes de escribir código, intento entender el problema: qué se
            necesita, cómo funciona el sistema y qué impacto puede tener el
            cambio. Después elijo un enfoque, implemento lo necesario y
            compruebo el resultado con pruebas y revisión.
          </p>
        </div>

        {/* Escenarios de trabajo */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none">
          {SCENARIOS.map((scenario) => (
            <li key={scenario.id}>
              <article className="h-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col hover:border-slate-700/80 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl border ${scenario.colorClass}`}
                  >
                    {scenario.icon}
                  </div>
                  <h2 className="text-lg font-bold text-white">
                    {scenario.title}
                  </h2>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed flex-1">
                  {scenario.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                    Apoyo de agentes
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {scenario.agents.join(" · ")}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* IA y OpenCode */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" aria-hidden="true" />
              <span>OpenCode y agentes de IA</span>
            </h2>

            <p className="mt-4 text-slate-400 leading-relaxed">
              Para apoyarme en ese proceso utilizo{" "}
              <strong className="text-white">OpenCode</strong> y agentes de IA
              especializados. Los selecciono según el reto —por ejemplo, para
              analizar requisitos, explorar una base de código, investigar
              errores o revisar aspectos de calidad— y verifico sus propuestas
              antes de incorporarlas.
            </p>

            <ul className="mt-5 space-y-2.5">
              {AI_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Workflow
                className="w-5 h-5 text-cyan-400"
                aria-hidden="true"
              />
              <span>Orquestación de agentes</span>
            </h2>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              No utilizo todos los agentes en cada tarea. Selecciono los que
              pueden aportar valor según el contexto y, cuando hay varias
              disciplinas o dependencias, puedo apoyarme en un{" "}
              <strong className="text-slate-200">Orchestrator</strong> para
              organizar el trabajo.
            </p>
          </div>
        </div>

        {/* Seguridad como práctica transversal */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 sm:p-5">
          <ShieldCheck
            className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-sm text-slate-400 leading-relaxed">
            Cuando el tipo de cambio lo requiere —por ejemplo, si afecta a
            autenticación, permisos, datos sensibles o configuración— incorporo
            una revisión con el{" "}
            <strong className="text-slate-200">Security Engineer</strong>.
          </p>
        </div>

        {/* Cierre y enlace a GitHub */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-xl">
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
            <span className="font-semibold text-blue-400">
              La IA me ayuda a trabajar;
            </span>{" "}
            la responsabilidad sobre las decisiones y el resultado sigue siendo
            mía.
          </p>

          <a
            href="https://github.com/albergrs90/software-development-agents"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Ver mis agentes en GitHub</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
