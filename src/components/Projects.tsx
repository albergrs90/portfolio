import { ExternalLink, Code2 } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

export const Projects = () => {
  const projectsList: Project[] = [
    {
      title: "SmartMatch HR (Recruiter AI)",
      description:
        "Aplicación web full-stack diseñada para analizar currículums de candidatos frente a los requisitos de una oferta de empleo utilizando IA, optimizando los procesos de selección técnica.",
      tags: ["React", ".NET Core", "TypeScript", "Tailwind CSS", "Supabase"],
      githubUrl: "https://github.com/albergrs90",
      featured: true,
    },
    {
      title: "Gestión y Automatización de Gimnasios",
      description:
        "Plataforma colaborativa orientada al registro, control y automatización de rutinas de entrenamiento, gestión de usuarios y métricas de rendimiento físico.",
      tags: ["React", "TypeScript", "SQL Server", "Tailwind CSS"],
      githubUrl: "https://github.com/albergrs90/GymAutomation",
      featured: true,
    },
    {
      title: "Berta Quiromasajista (Web Comercial)",
      description:
        "Sitio web comercial profesional con panel de administración integrado y gestión de reservas y servicios para un negocio real de quiromasaje.",
      tags: ["React", "Tailwind CSS", "Supabase", "Netlify"],
      githubUrl: "https://github.com/albergrs90",
      liveUrl: "https://bertaquiromasajista.netlify.app/",
      featured: true,
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-slate-900/50 border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Proyectos <span className="text-blue-500">Destacados</span>
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl">
            Una selección de aplicaciones web y desarrollos recientes
            construidos con .NET Core, React y bases de datos relacionales.
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/40 transition-all group shadow-lg"
            >
              <div>
                {/* Cabecera de la tarjeta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-500/20 group-hover:bg-blue-600/20 transition-colors">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      aria-label="Ver repositorio en GitHub"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-400 transition-colors p-1"
                        aria-label="Ver demo en vivo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Título y Descripción */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tecnologías / Badges */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800/80 text-slate-300 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
