import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNoIndex, usePageMeta } from "../hooks/usePageMeta";
import { BTN_PRIMARY, BTN_SECONDARY, CONTAINER } from "./ui";

export const NotFound = () => {
  const location = useLocation();

  usePageMeta(
    "Página no encontrada · Alberto García Ríos",
    "La página que buscas no existe. Vuelve al inicio o explora los proyectos del portfolio.",
  );
  useNoIndex();

  return (
    <div className="flex min-h-[70dvh] flex-col justify-center py-28">
      <div className={CONTAINER}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none tracking-[-0.03em] text-ink sm:text-7xl">
          Esta página no <span className="italic">existe</span>.
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-muted">
          La ruta{" "}
          <code className="break-all rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-ink">
            {location.pathname}
          </code>{" "}
          no forma parte del portfolio.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className={BTN_PRIMARY}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>
          <Link to="/projects" className={BTN_SECONDARY}>
            Ver proyectos
          </Link>
        </div>
      </div>
    </div>
  );
};
