import { Link, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Info,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { NotFound } from "./NotFound";
import { Reveal } from "./Reveal";
import { PROJECTS, getProjectBySlug } from "../data/projects";
import { usePageMeta } from "../hooks/usePageMeta";
import { BTN_PRIMARY, BTN_SECONDARY, CONTAINER, LABEL } from "./ui";

const STATUS_DOT: Record<string, string> = {
  "En producción": "bg-emerald-400",
  Demo: "bg-amber-400",
};

const SectionTitle = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => (
  <h2
    id={id}
    className="border-b border-line pb-4 font-display text-3xl tracking-[-0.02em] text-ink"
  >
    {children}
  </h2>
);

export const ProjectsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  usePageMeta(
    project
      ? `${project.name} · ${project.tagline} | Alberto García Ríos`
      : "Proyecto no encontrado · Alberto García Ríos",
    project?.summary,
  );

  if (!project) {
    return <NotFound />;
  }

  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className={CONTAINER}>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-lg text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a proyectos
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status] ?? "bg-white/30"}`}
                aria-hidden="true"
              />
              {project.status}
            </span>
            <span className="text-white/20" aria-hidden="true">
              /
            </span>
            <span>{project.kind}</span>
            <span className="text-white/20" aria-hidden="true">
              /
            </span>
            <span>{project.year}</span>
          </div>

          <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-ink">
            {project.tagline}
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_PRIMARY}
              >
                Ver demo
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_SECONDARY}
              >
                <GithubIcon className="h-4 w-4" />
                Código
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            )}
          </div>
        </header>

        <figure className="mt-10 overflow-hidden rounded-xl border border-line bg-raised">
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            fetchPriority="high"
            decoding="async"
            className="h-auto w-full"
          />
        </figure>

        <dl className="mt-10 grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {[
            { label: "Rol", value: project.role },
            { label: "Año", value: String(project.year) },
            { label: "Tipo", value: project.kind },
            { label: "Estado", value: project.status },
          ].map((item) => (
            <div
              key={item.label}
              className="border-b border-line py-4 pr-4 sm:border-b-0 sm:border-r sm:pl-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className={LABEL}>{item.label}</dt>
              <dd className="mt-1.5 text-sm text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <Reveal className="mt-20">
          <section aria-labelledby="challenge-title">
            <SectionTitle id="challenge-title">El reto</SectionTitle>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted">
              {project.challenge}
            </p>
          </section>
        </Reveal>

        <Reveal className="mt-16">
          <section aria-labelledby="highlights-title">
            <SectionTitle id="highlights-title">Qué construí</SectionTitle>
            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div key={highlight.title} className="border-t border-line pt-5">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <h3 className="font-medium text-ink">{highlight.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {highlight.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-16">
          <section aria-labelledby="metrics-title">
            <SectionTitle id="metrics-title">El resultado</SectionTitle>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="border-t border-line pt-5">
                  <p className="font-display text-4xl leading-none tracking-[-0.02em] text-ink">
                    {metric.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {project.gallery.length > 0 && (
          <Reveal className="mt-16">
            <section aria-labelledby="gallery-title">
              <SectionTitle id="gallery-title">Vistas del proyecto</SectionTitle>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {project.gallery.map((image) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full rounded-lg border border-line bg-raised"
                  />
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <Reveal className="mt-16">
          <section aria-labelledby="mobile-title">
            <SectionTitle id="mobile-title">Responsive</SectionTitle>
            <div className="mt-6 flex flex-col items-start gap-8 sm:flex-row">
              <img
                src={project.mobile.src}
                alt={project.mobile.alt}
                width={project.mobile.width}
                height={project.mobile.height}
                loading="lazy"
                decoding="async"
                className="w-full max-w-[220px] shrink-0 rounded-[1.75rem] border border-line bg-raised"
              />
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                El mismo contenido y la misma jerarquía en móvil, con navegación
                táctil y sin scroll horizontal.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-16">
          <section className="grid gap-12 border-t border-line pt-10 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2.5 font-display text-2xl text-ink">
                <Info className="h-4 w-4 text-muted" aria-hidden="true" />
                Limitaciones
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.limitations.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="mt-2.5 h-px w-3 shrink-0 bg-white/25"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2.5 font-display text-2xl text-ink">
                <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" />
                Siguientes pasos
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.nextSteps.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="mt-2.5 h-px w-3 shrink-0 bg-white/25"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-16">
          <section aria-labelledby="stack-title">
            <SectionTitle id="stack-title">Stack</SectionTitle>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line px-2.5 py-1 text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <nav
          className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
          aria-label="Más proyectos"
        >
          <Link
            to={`/projects/${previous.slug}`}
            className="group rounded-xl border border-line p-5 transition-colors hover:border-line-strong"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Anterior
            </span>
            <span className="mt-2 flex items-center gap-2 font-display text-2xl text-ink">
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
              {previous.name}
            </span>
          </Link>

          <Link
            to={`/projects/${next.slug}`}
            className="group rounded-xl border border-line p-5 text-left transition-colors hover:border-line-strong sm:text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Siguiente
            </span>
            <span className="mt-2 flex items-center gap-2 font-display text-2xl text-ink sm:justify-end">
              {next.name}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
};
