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
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";
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
import { BTN_GHOST, BTN_PRIMARY, BTN_SECONDARY, CONTAINER, LABEL } from "./ui";
import { trackEvent } from "../utils/analytics";

export const About = () => {
  usePageMeta(
    "Sobre mí · Alberto García Ríos",
    "Trayectoria de Alberto García Ríos: 8+ años como desarrollador full-stack en Sevilla, con .NET Core, React, SQL Server, Azure y agentes de IA aplicados al desarrollo.",
  );

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <PageHeader
        index="01"
        label="Sobre mí"
        title={
          <>
            Ocho años llevando software a{" "}
            <span className="italic">producción</span>.
          </>
        }
        description="Empecé en 2013 haciendo interfaces para equipos de soporte y desde 2021 trabajo en aplicaciones corporativas con React, .NET Core y SQL Server. Fuera de la oficina mantengo productos propios donde decido todo."
      />

      <div className={CONTAINER}>
        {/* Historia y retrato */}
        <div className="grid gap-12 pt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="text-pretty text-xl leading-relaxed text-ink sm:text-2xl">
              Construyo aplicaciones web que la gente usa a diario y las
              mantengo cuando cambian las reglas.
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                En <strong className="font-medium text-ink">AYESA</strong>{" "}
                trabajo con React, .NET Core y SQL Server en aplicaciones
                corporativas de operaciones, horas, proyectos y RRHH que usa
                toda la empresa. Ahí aprendí que el software útil es el que
                sigue funcionando dos años después.
              </p>
              <p>
                Fuera del horario de oficina mantengo productos propios con el
                mismo stack, pero con todas las decisiones encima de la mesa:
                producto, datos, diseño y despliegue. Me interesa el punto donde
                la IA acelera el desarrollo sin quitarle criterio a quien lo
                firma.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-display text-2xl leading-none text-ink">
                    {fact.value}
                  </dt>
                  <dd className="mt-1.5 text-[11px] leading-tight text-muted">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.cv}
                download
                className={BTN_PRIMARY}
                onClick={() => trackEvent("download_cv", { location: "hero" })}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Descargar CV
              </a>
              <Link to="/contact" className={BTN_SECONDARY}>
                Hablemos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de LinkedIn de Alberto García Ríos"
                className="rounded-lg border border-line-strong p-3 text-muted transition-colors hover:border-white/25 hover:text-ink"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de GitHub de Alberto García Ríos"
                className="rounded-lg border border-line-strong p-3 text-muted transition-colors hover:border-white/25 hover:text-ink"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="mx-auto max-w-[420px] lg:ml-auto lg:mr-0">
              <div className="overflow-hidden rounded-xl border border-line-strong bg-raised">
                <img
                  src={foto}
                  alt="Retrato de Alberto García Ríos"
                  width={1024}
                  height={1024}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-3">
                <span className="text-sm text-ink">{PROFILE.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {PROFILE.role} · {PROFILE.modality}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Trayectoria */}
        <Reveal className="mt-24">
          <section aria-labelledby="experience-title">
            <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
              <h2
                id="experience-title"
                className="font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl"
              >
                Trayectoria
              </h2>
              <span className={LABEL}>
                {String(EXPERIENCE.length).padStart(2, "0")} etapas
              </span>
            </div>

            <ol className="mt-10 space-y-10">
              {EXPERIENCE.map((item, index) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[auto_1fr] gap-5 sm:gap-7"
                >
                  <div className="flex flex-col items-center pt-2">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        item.current ? "bg-accent" : "bg-white/25"
                      }`}
                      aria-hidden="true"
                    />
                    {index < EXPERIENCE.length - 1 && (
                      <span
                        className="mt-2 w-px flex-1 bg-line"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="pb-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        {item.period}
                      </p>
                      {item.current && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                          · actualidad
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-lg font-medium text-ink">
                      {item.role}{" "}
                      <span className="text-muted">· {item.company}</span>
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {item.location}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                      {item.summary}
                    </p>

                    {item.bullets.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                          >
                            <span
                              className="mt-2.5 h-px w-3 shrink-0 bg-white/25"
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
        </Reveal>

        {/* Principios */}
        <Reveal className="mt-24">
          <section aria-labelledby="principles-title">
            <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="principles-title"
                className="font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl"
              >
                Cómo tomo decisiones
              </h2>
              <Link to="/como-trabajo" className={BTN_GHOST}>
                Ver cómo trabajo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {PRINCIPLES.map((principle, index) => (
                <div key={principle.id} className="border-t border-line pt-5">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-medium text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {principle.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Formación e idiomas */}
        <Reveal className="mt-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <section aria-labelledby="education-title">
              <h2
                id="education-title"
                className="flex items-center gap-2 border-b border-line pb-4 font-display text-2xl text-ink"
              >
                <GraduationCap
                  className="h-4 w-4 text-muted"
                  aria-hidden="true"
                />
                Formación
              </h2>
              <ul>
                {EDUCATION.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-5 border-b border-line py-3.5"
                  >
                    <span className="w-10 shrink-0 font-mono text-[11px] text-muted">
                      {item.year}
                    </span>
                    <div>
                      <p className="text-sm text-ink">{item.title}</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {item.institution}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="languages-title">
              <h2
                id="languages-title"
                className="flex items-center gap-2 border-b border-line pb-4 font-display text-2xl text-ink"
              >
                <LanguagesIcon
                  className="h-4 w-4 text-muted"
                  aria-hidden="true"
                />
                Idiomas y ubicación
              </h2>
              <ul>
                {LANGUAGES.map((language) => (
                  <li
                    key={language.id}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 text-sm"
                  >
                    <span className="text-ink">{language.name}</span>
                    <span className="font-mono text-[11px] text-muted">
                      {language.level}
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-2.5 border-b border-line py-3.5 text-sm text-muted">
                  <MapPin
                    className="h-3.5 w-3.5 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  {PROFILE.location} · {PROFILE.modality}
                </li>
                <li className="flex items-center gap-2.5 border-b border-line py-3.5 text-sm text-muted">
                  <Clock
                    className="h-3.5 w-3.5 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  CET (UTC+1) · Disponible para proyectos
                </li>
              </ul>
            </section>
          </div>
        </Reveal>

        {/* Proyectos */}
        <Reveal className="mt-24">
          <section aria-labelledby="proof-title">
            <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="proof-title"
                className="font-display text-3xl tracking-[-0.02em] text-ink sm:text-4xl"
              >
                Prueba, no adjetivos
              </h2>
              <Link to="/projects" className={BTN_GHOST}>
                Todos los proyectos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROJECTS.filter((project) => project.featured).map((project) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-xl border border-line bg-raised transition-colors group-hover:border-line-strong">
                    <img
                      src={project.cover.src}
                      alt={project.cover.alt}
                      width={project.cover.width}
                      height={project.cover.height}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                    />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        {project.kind}
                      </p>
                      <h3 className="mt-1 text-sm font-medium text-ink">
                        {project.name}
                      </h3>
                    </div>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <section className="mt-24 border-t border-line pt-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-4xl tracking-[-0.02em] text-ink sm:text-5xl">
                ¿Hablamos?
              </h2>
              <p className="mt-3 max-w-md text-muted">
                Si buscas a alguien que entienda el problema antes de escribir
                la primera línea, escríbeme.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Contacto desde tu portfolio")}`}
                className={BTN_PRIMARY}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Escríbeme
              </a>
              <a href={PROFILE.cv} download className={BTN_SECONDARY}>
                <Download className="h-4 w-4" aria-hidden="true" />
                CV en PDF
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
