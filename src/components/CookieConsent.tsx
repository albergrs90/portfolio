import { Link } from "react-router-dom";
import { useConsent } from "../hooks/useConsent";
import { setStoredConsent } from "../utils/consent";

/**
 * Aviso mínimo de cookies analíticas. GA4 no se inicializa hasta que el
 * usuario acepta; si rechaza, no se carga ningún script de Google.
 */
export const CookieConsent = () => {
  const consent = useConsent();

  if (consent !== null) return null;

  return (
    <section
      aria-label="Consentimiento de cookies analíticas"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-[420px] rounded-xl border border-line-strong bg-raised/95 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px]"
    >
      <h2 className="text-sm font-medium text-ink">Cookies analíticas</h2>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">
        Uso Google Analytics para saber qué páginas se visitan. Solo se activa
        si lo aceptas.{" "}
        <Link
          to="/privacidad"
          className="underline underline-offset-2 transition-colors hover:text-ink"
        >
          Más información
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setStoredConsent("granted")}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-ink px-3 py-2.5 text-xs font-medium text-canvas transition-colors hover:bg-white"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => setStoredConsent("denied")}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-line-strong px-3 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-white/[0.04]"
        >
          Solo necesarias
        </button>
      </div>
    </section>
  );
};
