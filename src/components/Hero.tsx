import {
  ArrowRight,
  Code2,
  Database,
  Mail,
  Terminal,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import fotoFondo from "../images/fotolinkedin.webp";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20"
    >
      {/* Foto de fondo (decorativa) */}
      <div
        className="absolute inset-0 -z-20 bg-slate-950 bg-cover bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url(${fotoFondo})`,
          backgroundPosition: "center 30%",
        }}
        aria-hidden="true"
      />

      {/* Capas oscuras: mantienen la foto presente sin competir con el texto */}
      <div
        className="absolute inset-0 -z-10 bg-slate-950/55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/45 via-slate-950/60 to-slate-950/90"
        aria-hidden="true"
      />

      {/* Fondo decorativo con degradado suave */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Badge de Disponibilidad */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 mb-8 shadow-inner backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="motion-reduce:animate-none animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Disponible para proyectos y oportunidades</span>
          </div>

          {/* Titular Principal */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Desarrollador Web <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Full-Stack
            </span>
          </h1>

          {/* Subtítulo / Bio Breve */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Especializado en construir aplicaciones web robustas, escalables y
            eficientes. Transformo ideas en software de alto rendimiento
            utilizando arquitecturas modernas.
          </p>

          {/* Badges del Core Tech Stack */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-slate-200 text-sm font-medium backdrop-blur-sm">
              <Terminal className="w-4 h-4 text-purple-400" aria-hidden="true" />
              .NET Core
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-slate-200 text-sm font-medium backdrop-blur-sm">
              <Code2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              React
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-slate-200 text-sm font-medium backdrop-blur-sm">
              <Database className="w-4 h-4 text-amber-400" aria-hidden="true" />
              SQL
            </span>
          </div>

          {/* Botones de Acción (CTAs) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/process"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Workflow className="w-4 h-4" aria-hidden="true" />
              <span>Ver mi proceso</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-100 border border-slate-700/70 font-medium px-6 py-3.5 rounded-xl transition-all backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span>Ver proyectos</span>
            </Link>
          </div>

          {/* Contacto discreto */}
          <div className="mt-5">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Contactar</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
