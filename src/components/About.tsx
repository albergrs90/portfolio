import {
  ArrowRight,
  Clock,
  Download,
  GraduationCap,
  Languages as LanguagesIcon,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import foto from "../images/fotolinkedin.webp";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PROJECTS } from "../data/projects";
import {
  EDUCATION,
  EXPERIENCE,
  FACTS,
  LANGUAGES,
  PRINCIPLES,
  PROFILE,
} from "../data/about";
import { usePageMeta } from "../hooks/usePageMeta";

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const SECONDARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const ICON_BUTTON =
  "inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-3 text-slate-300 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export const About = () => {
  usePageMeta(
    "Sobre mí · Alberto García Ríos",
    "Trayectoria de Alberto García Ríos: 8+ años como desarrollador full-stack en Sevilla, con .NET Core, React, SQL Server, Azure y agentes de IA aplicados al desarrollo.",
  );

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecera: posición, historia y foto */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Perfil
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Sobre <span className="text-blue-500">mí</span>
            </h1>

            <p className="mt-6 text-xl font-semibold leading-snug text-white sm:text-2xl">
              Desarrollador full-stack en Sevilla. Construyo aplicaciones web
              que la gente usa a diario y las mantengo cuando cambian las
              reglas.
            </p>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-300">
              <p>
                Empecé en 2013 haciendo interfaces para los equipos de soporte
                de SITEL. Desde 2021 trabajo en{" "}
                <strong className="text-white">AYESA</strong> con{" "}
                <strong className="text-white">React</strong>,{" "}
                <strong className="text-white">.NET Core</strong> y{" "}
                <strong className="text-white">SQL Server</strong>: aplicaciones
                corporativas de operaciones, horas, proyectos y RRHH que usa
                toda la empresa.
              </p>
              <p className="text-slate-400">
                Fuera del horario de oficina mantengo productos propios con el
                mismo stack, pero con todas las decisiones encima de la mesa:
                producto, datos, diseño y despliegue. Me interesa el punto donde
                la IA acelera el desarrollo sin quitarle criterio a quien lo
                firma.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-3">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4"
                >
                  <dt className="text-lg font-bold text-white">{fact.value}</dt>
                  <dd className="mt-0.5 text-[11px] leading-tight text-slate-400">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={PROFILE.cv} download className={PRIMARY_BUTTON}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Descargar CV
              </a>
              <Link to="/contact" className={SECONDARY_BUTTON}>
                Hablemos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de LinkedIn de Alberto García Ríos"
                className={ICON_BUTTON}
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de GitHub de Alberto García Ríos"
                className={ICON_BUTTON}
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-500/10 blur-2xl"
                aria-hidden="true"
              />
              <img
                src={foto}
                alt="Retrato de Alberto García Ríos"
                width={1024}
                height={1024}
                className="relative aspect-square w-full rounded-2xl border border-slate-800 object-cover shadow-2xl"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-slate-700/60 bg-slate-950/85 p-3 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">
                  {PROFILE.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {PROFILE.role} · {PROFILE.modality}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trayectoria */}
        <section className="mt-20" aria-labelledby="experience-title">
          <h2
            id="experience-title"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Trayectoria
          </h2>
          <p className="mt-2 max-w-2xl text-slate-400">
            Trece años construyendo software para empresas, con las métricas que
            puedo defender.
          </p>

          <ol className="mt-10 space-y-8">
            {EXPERIENCE.map((item, index) => (
              <li
                key={item.id}
                className="grid grid-cols-[auto_1fr] gap-5 sm:gap-6"
              >
                <div className="flex flex-col items-center pt-1.5">
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full ring-4 ${
                      item.current
                        ? "bg-blue-500 ring-blue-500/20"
                        : "bg-slate-600 ring-slate-700/30"
                    }`}
                    aria-hidden="true"
                  />
                  {index < EXPERIENCE.length - 1 && (
                    <span
                      className="mt-2 w-px flex-1 bg-slate-800"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="pb-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.period}
                    </p>
                    {item.current && (
                      <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-300">
                        Actualidad
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1 text-lg font-bold text-white">
                    {item.role}{" "}
                    <span className="font-medium text-slate-300">
                      · {item.company}
                    </span>
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.location}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.summary}
                  </p>

                  {item.bullets.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-600"
                            aria-hidden="true"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Principios */}
        <section className="mt-20" aria-labelledby="principles-title">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="principles-title"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Cómo tomo decisiones
              </h2>
              <p className="mt-2 max-w-2xl text-slate-400">
                Tres reglas que se repiten en todos los proyectos, también en
                los míos.
              </p>
            </div>
            <Link
              to="/como-trabajo"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Ver cómo trabajo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <div
                key={principle.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-blue-500/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Formación e idiomas */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <section
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
            aria-labelledby="education-title"
          >
            <h2
              id="education-title"
              className="flex items-center gap-2 text-lg font-bold text-white"
            >
              <GraduationCap
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
              Formación
            </h2>
            <ul className="mt-4 space-y-3">
              {EDUCATION.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <span className="w-10 shrink-0 pt-0.5 text-xs font-semibold text-slate-500">
                    {item.year}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.institution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="flex flex-col gap-6"
            aria-labelledby="languages-title"
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <h2
                id="languages-title"
                className="flex items-center gap-2 text-lg font-bold text-white"
              >
                <LanguagesIcon
                  className="h-5 w-5 text-slate-400"
                  aria-hidden="true"
                />
                Idiomas
              </h2>
              <ul className="mt-4 space-y-3">
                {LANGUAGES.map((language) => (
                  <li
                    key={language.id}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-slate-200">{language.name}</span>
                    <span className="text-xs text-slate-500">
                      {language.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white">Dónde estoy</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
                <li className="flex items-center gap-2.5">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  {PROFILE.location} · {PROFILE.modality}
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock
                    className="h-4 w-4 shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  CET (UTC+1) · Disponible para proyectos
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Prueba: proyectos */}
        <section className="mt-20" aria-labelledby="proof-title">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="proof-title"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Prueba, no adjetivos
              </h2>
              <p className="mt-2 max-w-2xl text-slate-400">
                Tres productos donde tomé todas las decisiones: problema,
                arquitectura, diseño y despliegue.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Todos los proyectos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PROJECTS.filter((project) => project.featured).map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: project.accent }}
                >
                  {project.kind}
                </span>
                <h3 className="mt-1.5 font-bold text-white">{project.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                  {project.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
                  Ver caso
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="mt-20 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            ¿Hablamos?
          </h2>
          <p className="mt-2 max-w-xl text-slate-400">
            Si buscas a alguien que entienda el problema antes de escribir la
            primera línea, escríbeme y te cuento cómo trabajo.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Contacto desde tu portfolio")}`}
              className={PRIMARY_BUTTON}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={SECONDARY_BUTTON}
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
            <a href={PROFILE.cv} download className={SECONDARY_BUTTON}>
              <Download className="h-4 w-4" aria-hidden="true" />
              CV en PDF
            </a>
          </div>
        </section>
      </div>
    </section>
  );
};
