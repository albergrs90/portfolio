import { Terminal, Database, Code2, CheckCircle2 } from "lucide-react";

export const About = () => {
  const highlights = [
    "Experiencia sólida en desarrollo Full-Stack con .NET Core y React.",
    "Diseño y optimización de bases de datos relacionales con SQL Server.",
    "Enfoque en código limpio, mantenible y escalable.",
    "Capacidad para adaptarme a retos tanto corporativos como freelance.",
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-slate-900/50 border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sobre <span className="text-blue-500">mí</span>
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl">
            Conoce un poco más sobre mi trayectoria y mi forma de entender el
            desarrollo de software.
          </p>
        </div>

        {/* Contenido en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Izquierda: Texto Descriptivo */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-semibold text-white tracking-tight">
              Desarrollador Full-Stack enfocado en la eficiencia y la calidad de
              código
            </h3>

            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              Soy desarrollador web especializado en el ecosistema{" "}
              <strong className="text-white">.NET Core</strong> para la creación
              de APIs y lógica de negocio robusta, y{" "}
              <strong className="text-white">React</strong> en el frontend para
              ofrecer interfaces dinámicas y cuidadas.
            </p>

            <p className="text-slate-400 leading-relaxed text-base">
              A lo largo de mi trayectoria he trabajado intensamente con bases
              de datos relacionales como{" "}
              <strong className="text-slate-300">SQL Server</strong>,
              garantizando un rendimiento óptimo y una arquitectura de datos
              sólida. Mi objetivo es aportar valor real tanto a empresas
              tecnológicas como a particulares que buscan soluciones digitales a
              medida.
            </p>

            {/* Lista de puntos clave */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Tarjeta / Resumen Técnico */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span>Stack Principal</span>
              </h4>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Backend</h5>
                    <p className="text-xs text-slate-400">
                      .NET Core · C# · APIs RESTful
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Frontend</h5>
                    <p className="text-xs text-slate-400">
                      React · TypeScript · Tailwind CSS
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Base de Datos</h5>
                    <p className="text-xs text-slate-400">
                      SQL Server · Modelado · Consultas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
