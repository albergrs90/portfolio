import { useLocation, Link } from "react-router-dom";

export const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-slate-400">
        La ruta{" "}
        <code className="break-all rounded bg-slate-900 px-1.5 py-0.5 text-slate-300">
          {location.pathname}
        </code>{" "}
        no existe en este portfolio.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Volver al inicio
        </Link>
        <Link
          to="/projects"
          className="rounded-xl border border-slate-700/70 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Ver proyectos
        </Link>
      </div>
    </div>
  );
};
