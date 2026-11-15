import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Info,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { NotFound } from "./NotFound";
import { PROJECTS, getProjectBySlug } from "../data/projects";

const STATUS_STYLES: Record<string, string> = {
  "En producción":
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Demo: "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

const META_BADGE =
  "rounded-full border border-slate-700/70 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300";

export const ProjectsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Título y descripción propios por proyecto; se restauran al desmontar.
  useEffect(() => {
    if (!project) return;

    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? null;

    document.title = `${project.name} · ${project.tagline} | Alberto García Ríos`;
    meta?.setAttribute("content", project.summary);

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [project]);

  if (!project) {
    return <NotFound />;
  }

  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <article className="pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a proyectos
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[project.status]}`}
            >
              {project.status}
            </span>
            <span className={META_BADGE}>{project.kind}</span>
            <span className={META_BADGE}>{project.year}</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {project.name}
          </h1>
          <p
            className="mt-3 text-lg font-medium sm:text-xl"
            style={{ color: project.accent }}
          >
            {project.tagline}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <GithubIcon className="h-4 w-4" />
                Código
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            )}
          </div>
        </header>

        <figure className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
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

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Rol", value: project.role },
            { label: "Año", value: String(project.year) },
            { label: "Tipo", value: project.kind },
            { label: "Estado", value: project.status },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-200">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <section className="mt-14" aria-labelledby="challenge-title">
          <h2
            id="challenge-title"
            className="text-2xl font-bold text-white"
          >
            El reto
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            {project.challenge}
          </p>
        </section>

        <section className="mt-14" aria-labelledby="highlights-title">
          <h2
            id="highlights-title"
            className="text-2xl font-bold text-white"
          >
            Qué construí
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0"
                    style={{ color: project.accent }}
                    aria-hidden="true"
                  />
                  <h3 className="font-semibold text-white">
                    {highlight.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="metrics-title">
          <h2 id="metrics-title" className="text-2xl font-bold text-white">
            El resultado
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <p
                  className="text-3xl font-extrabold tracking-tight"
                  style={{ color: project.accent }}
                >
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section className="mt-14" aria-labelledby="gallery-title">
            <h2 id="gallery-title" className="text-2xl font-bold text-white">
              Vistas del proyecto
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full rounded-xl border border-slate-800"
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-14" aria-labelledby="mobile-title">
          <h2 id="mobile-title" className="text-2xl font-bold text-white">
            Responsive
          </h2>
          <div className="mt-6 flex flex-col items-center gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:flex-row sm:items-start">
            <img
              src={project.mobile.src}
              alt={project.mobile.alt}
              width={project.mobile.width}
              height={project.mobile.height}
              loading="lazy"
              decoding="async"
              className="w-full max-w-[240px] shrink-0 rounded-[1.75rem] border-4 border-slate-800 bg-slate-950"
            />
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              El mismo contenido y la misma jerarquía en móvil, con navegación
              táctil y sin scroll horizontal.
            </p>
          </div>
        </section>

        <section className="mt-14 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <Info className="h-4 w-4 text-slate-400" aria-hidden="true" />
              Limitaciones
            </h2>
            <ul className="mt-3 space-y-2">
              {project.limitations.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-slate-400"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <ArrowRight
                className="h-4 w-4 text-slate-400"
                aria-hidden="true"
              />
              Siguientes pasos
            </h2>
            <ul className="mt-3 space-y-2">
              {project.nextSteps.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-slate-400"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="stack-title">
          <h2 id="stack-title" className="text-2xl font-bold text-white">
            Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-sm font-medium text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <nav
          className="mt-16 grid gap-4 border-t border-slate-800 pt-8 sm:grid-cols-2"
          aria-label="Más proyectos"
        >
          <Link
            to={`/projects/${previous.slug}`}
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Anterior
            </span>
            <span className="mt-1 flex items-center gap-2 font-semibold text-white">
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              {previous.name}
            </span>
          </Link>

          <Link
            to={`/projects/${next.slug}`}
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-left transition-colors hover:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-right"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Siguiente
            </span>
            <span className="mt-1 flex items-center gap-2 font-semibold text-white sm:justify-end">
              {next.name}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
};
