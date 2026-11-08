import { Terminal, ArrowRight, Database, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import fotoFondo from "../images/fotolinkedin.webp";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Imagen de fondo (tu foto) */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fotoFondo})` }}
      />

      {/* Overlay oscuro muy suave: permite ver tu foto de fondo mientras
           mantiene la legibilidad del texto y los colores del diseño. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      {/* Fondo decorativo con degradado suave (mantén el acento azul actual) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Badge de Disponibilidad */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 mb-8 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Disponible para proyectos y oportunidades</span>
          </div>

          {/* Titular Principal */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Desarrollador Web <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Full-Stack
            </span>
          </h1>

          {/* Subtítulo / Bio Breve */}
          <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl">
            Especializado en construir aplicaciones web robustas, escalables y
            eficientes. Transformo ideas en software de alto rendimiento
            utilizando arquitecturas modernas.
          </p>

          {/* Badges del Core Tech Stack */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-200 text-sm font-medium">
              <Terminal className="w-4 h-4 text-purple-400" />
              .NET Core
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-200 text-sm font-medium">
              <Code2 className="w-4 h-4 text-cyan-400" />
              React
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-200 text-sm font-medium">
              <Database className="w-4 h-4 text-amber-400" />
              SQL
            </span>
          </div>

          {/* Botones de Acción (CTAs) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/projects"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25"
            >
              <span>Ver Proyectos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium px-6 py-3.5 rounded-xl transition-all"
            >
              <span>Contactar</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
