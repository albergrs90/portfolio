import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon } from "./SocialIcons";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";
import { PROJECTS } from "../data/projects";
import type { Project } from "../data/projects";
import { usePageMeta } from "../hooks/usePageMeta";
import { trackEvent } from "../utils/analytics";
import { CONTAINER } from "./ui";

const STATUS_DOT: Record<string, string> = {
  "En producción": "bg-emerald-400",
  Demo: "bg-amber-400",
};

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="relative z-20 flex items-center gap-1">
    {project.links.repo && (
      <a
        href={project.links.repo}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("project_repo_click", {
            project_name: project.name,
            location: "projects_list",
          })
        }
        aria-label={`Repositorio de ${project.name} en GitHub`}
        className="rounded-md p-2 text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
      >
        <GithubIcon className="h-4 w-4" />
      </a>
    )}
    {project.links.live && (
      <a
        href={project.links.live}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("project_demo_click", {
            project_name: project.name,
            location: "projects_list",
          })
        }
        aria-label={`Abrir la demo de ${project.name}`}
        className="rounded-md p-2 text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    )}
  </div>
);

const ProjectMeta = ({ project }: { project: Project }) => (
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
);

const FeaturedProject = ({ project }: { project: Project }) => (
  <article className="group relative grid gap-8 lg:grid-cols-12 lg:items-center">
    <Link
      to={`/projects/${project.slug}`}
      className="absolute inset-0 z-10 rounded-xl"
    >
      <span className="sr-only">Ver el caso de estudio de {project.name}</span>
    </Link>

    <div className="overflow-hidden rounded-xl border border-line bg-raised transition-colors group-hover:border-line-strong lg:col-span-8">
      <img
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
      />
    </div>

    <div className="lg:col-span-4">
      <ProjectMeta project={project} />

      <h2 className="mt-4 font-display text-4xl leading-none tracking-[-0.02em] text-ink">
        {project.name}
      </h2>
      <p className="mt-3 text-sm font-medium leading-relaxed text-ink">
        {project.tagline}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {project.stack.slice(0, 4).join(" · ")}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Ver caso
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </span>
        <ProjectLinks project={project} />
      </div>
    </div>
  </article>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="group relative flex flex-col">
    <Link
      to={`/projects/${project.slug}`}
      className="absolute inset-0 z-10 rounded-xl"
    >
      <span className="sr-only">Ver el caso de estudio de {project.name}</span>
    </Link>

    <div className="overflow-hidden rounded-xl border border-line bg-raised transition-colors group-hover:border-line-strong">
      <img
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
      />
    </div>

    <div className="mt-4 flex flex-1 flex-col">
      <ProjectMeta project={project} />

      <h2 className="mt-3 font-display text-3xl leading-none tracking-[-0.02em] text-ink">
        {project.name}
      </h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-ink">
        {project.tagline}
      </p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {project.stack.slice(0, 3).join(" · ")}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Ver caso
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </span>
        <ProjectLinks project={project} />
      </div>
    </div>
  </article>
);

export const Projects = () => {
  usePageMeta(
    "Proyectos · Alberto García Ríos",
    "Casos de estudio de BettingAnalyzer, RecruiterAI, Berta Masajista y Lumina Invoice: problema, decisiones técnicas, resultados y qué haría después.",
  );

  const featured = PROJECTS.filter((project) => project.featured);
  const [first, ...rest] = featured;

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <PageHeader
        index="04"
        label="Proyectos"
        title={
          <>
            Cuatro productos, <span className="italic">cuatro problemas</span>.
          </>
        }
        description="Productos propios y proyectos de cliente, en producción o con demo pública. Cada ficha cuenta el problema, las decisiones técnicas y qué haría después."
      />

      <div className={CONTAINER}>
        {first && (
          <Reveal className="pt-14">
            <FeaturedProject project={first} />
          </Reveal>
        )}

        <div className="mt-16 grid gap-12 border-t border-line pt-14 md:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};
