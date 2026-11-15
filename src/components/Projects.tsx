import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon } from "./SocialIcons";
import { PROJECTS } from "../data/projects";

const STATUS_STYLES: Record<string, string> = {
  "En producción":
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Demo: "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

export const Projects = () => {
  const featured = PROJECTS.filter((project) => project.featured);

  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-slate-900/50 border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Proyectos <span className="text-blue-500">seleccionados</span>
          </h1>
          <p className="mt-3 text-slate-400 text-lg max-w-2xl">
            Productos propios y proyectos de cliente, en producción o con demo
            pública. Cada ficha cuenta el problema, las decisiones técnicas y
            qué haría después.
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((project) => (
            <article
              key={project.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl"
            >
              {/* Enlace estirado: toda la tarjeta abre el caso de estudio. Los
                  enlaces externos van por encima con z-20. */}
              <Link
                to={`/projects/${project.slug}`}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span className="sr-only">
                  Ver el caso de estudio de {project.name}
                </span>
              </Link>

              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[project.status]}`}
                  >
                    {project.status}
                  </span>
                  <span className="rounded-full border border-slate-700/70 bg-slate-950/70 px-2.5 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: project.accent }}
                >
                  {project.kind}
                </p>

                <h2 className="mt-2 text-xl font-bold text-white">
                  {project.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-200">
                  {project.tagline}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
                  {project.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
                      Ver caso
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>

                    <div className="relative z-20 flex items-center gap-1">
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Repositorio de ${project.name} en GitHub`}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir la demo de ${project.name}`}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          <ExternalLink
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
