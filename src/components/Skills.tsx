import { Terminal, Code2, Database, Wrench, ShieldCheck } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: string[];
}

export const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Backend",
      icon: <Terminal className="w-6 h-6 text-purple-400" />,
      description:
        "Desarrollo de APIs RESTful, lógica de negocio y arquitectura del lado del servidor.",
      skills: [
        ".NET Core",
        "C#",
        "Entity Framework",
        "REST APIs",
        "Clean Architecture",
      ],
    },
    {
      title: "Frontend",
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      description:
        "Creación de interfaces de usuario interactivas, modernas y adaptativas.",
      skills: [
        "React",
        "TypeScript",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "HTML5 / CSS3",
      ],
    },
    {
      title: "Bases de Datos",
      icon: <Database className="w-6 h-6 text-amber-400" />,
      description:
        "Diseño relacional, modelado de datos y optimización de consultas.",
      skills: [
        "SQL Server",
        "T-SQL",
        "Diseño de tablas",
        "Procedimientos Almacenados",
        "Optimización",
      ],
    },
    {
      title: "Herramientas y Control de Versiones",
      icon: <Wrench className="w-6 h-6 text-emerald-400" />,
      description: "Ecosistema de desarrollo local y colaboración en equipo.",
      skills: [
        "Git",
        "GitHub",
        "Visual Studio 2022",
        "VS Code",
        "Postman / Swagger",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tecnologías y <span className="text-blue-500">Habilidades</span>
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl">
            Herramientas y tecnologías que utilizo en mi día a día para
            construir proyectos de principio a fin.
          </p>
        </div>

        {/* Grid de Tarjetas de Tecnologías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700/80 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/50 group-hover:scale-105 transition-transform">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Lista de Chips / Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium hover:border-blue-500/40 hover:text-blue-400 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500/70" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
