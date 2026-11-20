import { useState, useEffect, useRef } from "react";
import {
  Check,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PageHeader } from "./PageHeader";
import { sendContactMessage } from "../lib/contact";
import type { ContactFailureReason } from "../lib/contact";
import { PROFILE } from "../data/about";
import { usePageMeta } from "../hooks/usePageMeta";
import { trackEvent } from "../utils/analytics";
import { BTN_PRIMARY, CONTAINER, LABEL } from "./ui";

const EMAIL = PROFILE.email;

// Mitigación de spam en cliente (la comprobación real está en la Edge Function).
const SUBMIT_COOLDOWN_MS = 60_000;

// El mapa se carga al pulsar: así no hay cookies de Google ni peticiones de
// terceros en la carga inicial.
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Sevilla, España",
)}&z=12&output=embed`;

const ERROR_MESSAGES: Record<ContactFailureReason, string> = {
  config:
    "El formulario no está disponible ahora mismo. Escríbeme directamente a mi email.",
  "rate-limit":
    "Has enviado varios mensajes seguidos. Espera un minuto antes de volver a intentarlo.",
  validation:
    "Revisa los datos: el email no parece válido o algún campo es demasiado largo.",
  network:
    "No se pudo conectar con el servidor. Comprueba tu conexión o escríbeme directamente.",
  server:
    "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos o escríbeme directamente.",
};

const FIELD =
  "w-full rounded-lg border border-line bg-surface/60 px-4 py-3 text-sm text-ink placeholder:text-white/25 transition-colors hover:border-line-strong focus:border-accent/60 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent/20";

const ROW_ICON = "shrink-0 text-muted";

export const Contact = () => {
  usePageMeta(
    "Contacto · Alberto García Ríos",
    "Escríbeme para una propuesta laboral, un proyecto o una colaboración. Email, teléfono y LinkedIn de Alberto García Ríos, desarrollador full-stack en Sevilla.",
  );

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  // Evita dobles envíos accidentales sin bloquear un reintento tras un fallo.
  const lastSubmitTime = useRef<number>(0);

  // Referencia para el temporizador de "copiado": se inicia al copiar y se
  // limpia correctamente en cada nueva copia o desmontaje.
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    };
  }, []);

  const copyEmail = async () => {
    if (copyTimer.current) {
      clearTimeout(copyTimer.current);
    }

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      trackEvent("contact_copy_email", { location: "contact_page" });
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      trackEvent("contact_click", { method: "mailto_fallback" });
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nombre = String(formData.get("nombre") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const mensaje = String(formData.get("mensaje") ?? "").trim();
    const hp = String(formData.get("hp") ?? "").trim();

    // Honeypot antispam: campo oculto que los bots suelen rellenar. Si tiene
    // valor, se descarta silenciosamente sin notificar al usuario.
    if (hp !== "") {
      return;
    }

    if (!nombre || !email || !mensaje) {
      setError("Por favor completa todos los campos");
      return;
    }

    // Límite de frecuencia del lado del cliente (antispam básico)
    if (Date.now() - lastSubmitTime.current < SUBMIT_COOLDOWN_MS) {
      setError(ERROR_MESSAGES["rate-limit"]);
      return;
    }

    setIsSubmitting(true);

    // Una sola petición: la Edge Function guarda en Supabase y envía el email.
    const result = await sendContactMessage({ nombre, email, mensaje });

    setIsSubmitting(false);

    if (!result.ok) {
      setError(ERROR_MESSAGES[result.reason]);
      return;
    }

    // Solo arrancamos el cooldown cuando el envío se ha confirmado, para que un
    // fallo de red no impida reintentar de inmediato.
    lastSubmitTime.current = Date.now();
    trackEvent("contact_submit", { status: "success" });
    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <PageHeader
        index="05"
        label="Contacto"
        title={
          <>
            Cuéntame el <span className="italic">problema</span>.
          </>
        }
        description="¿Una propuesta laboral, un proyecto en mente o simplemente hablar de tecnología? Escríbeme y te responderé en 24–48 h laborables."
      />

      <div className={CONTAINER}>
        <div className="grid gap-14 pt-14 lg:grid-cols-12 lg:gap-16">
          {/* Formulario primero en móvil */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            {submitted ? (
              <div className="border-t border-line pt-10">
                <CheckCircle
                  className="h-6 w-6 text-emerald-400"
                  aria-hidden="true"
                />
                <h2 className="mt-4 font-display text-3xl text-ink">
                  Mensaje enviado
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  Gracias por escribir. Te responderé lo antes posible al correo
                  que me has dejado.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-white"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="nombre" className={`${LABEL} mb-2.5 block`}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    required
                    maxLength={100}
                    autoComplete="name"
                    aria-describedby={error ? "contact-error" : undefined}
                    placeholder="Tu nombre o empresa"
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`${LABEL} mb-2.5 block`}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    aria-describedby={error ? "contact-error" : undefined}
                    placeholder="correo@ejemplo.com"
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className={`${LABEL} mb-2.5 block`}>
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    maxLength={5000}
                    autoComplete="off"
                    aria-describedby={error ? "contact-error" : undefined}
                    placeholder="Cuéntame qué necesitas..."
                    className={`${FIELD} resize-none`}
                  ></textarea>
                </div>

                {/* Honeypot antispam */}
                <input
                  type="text"
                  name="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                />

                {error && (
                  <div
                    id="contact-error"
                    className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300"
                    role="alert"
                  >
                    <p>{error}</p>
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent("Contacto desde tu portfolio")}`}
                      onClick={() =>
                        trackEvent("contact_click", {
                          method: "email_error_box",
                        })
                      }
                      className="mt-1 inline-block font-medium underline underline-offset-2 hover:text-red-200"
                    >
                      Escríbeme a {EMAIL}
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${BTN_PRIMARY} w-full py-3.5`}
                >
                  <span>{isSubmitting ? "Enviando..." : "Enviar mensaje"}</span>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>

                <p className="font-mono text-[10px] leading-relaxed text-muted">
                  Tus datos se usan solo para responderte. No se comparten con
                  terceros.
                </p>
              </form>
            )}
          </div>

          {/* Otras vías */}
          <aside className="order-2 space-y-10 lg:order-1 lg:col-span-5">
            <div>
              <h2 className="border-b border-line pb-4 font-display text-2xl text-ink">
                Otras formas de contactar
              </h2>

              <ul>
                <li className="flex items-center gap-3 border-b border-line py-3.5">
                  <Mail className={ROW_ICON} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className={LABEL}>Email</p>
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent("Contacto desde tu portfolio")}`}
                      onClick={() =>
                        trackEvent("contact_click", { method: "email" })
                      }
                      className="mt-1 block truncate text-sm text-ink transition-colors hover:text-white"
                    >
                      {EMAIL}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copiado" : "Copiar email"}
                    className="rounded-md p-2 text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
                  >
                    {copied ? (
                      <Check
                        className="h-4 w-4 text-emerald-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                  <span aria-live="polite" className="sr-only">
                    {copied ? "Email copiado al portapapeles" : ""}
                  </span>
                </li>

                <li className="flex items-center gap-3 border-b border-line py-3.5">
                  <Phone className={ROW_ICON} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className={LABEL}>Teléfono</p>
                    <a
                      href={PROFILE.phoneHref}
                      onClick={() =>
                        trackEvent("contact_click", { method: "phone" })
                      }
                      className="mt-1 block text-sm text-ink transition-colors hover:text-white"
                    >
                      {PROFILE.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3 border-b border-line py-3.5">
                  <LinkedinIcon className={`h-4 w-4 ${ROW_ICON}`} />
                  <div className="min-w-0 flex-1">
                    <p className={LABEL}>LinkedIn</p>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("social_profile_click", {
                          platform: "linkedin",
                          location: "contact_page",
                        })
                      }
                      className="mt-1 flex items-center gap-1 text-sm text-ink transition-colors hover:text-white"
                    >
                      alberto-garcia-rios
                      <ExternalLink
                        className="h-3 w-3 shrink-0 text-muted"
                        aria-hidden="true"
                      />
                      <span className="sr-only">
                        (se abre en una pestaña nueva)
                      </span>
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3 border-b border-line py-3.5">
                  <GithubIcon className={`h-4 w-4 ${ROW_ICON}`} />
                  <div className="min-w-0 flex-1">
                    <p className={LABEL}>GitHub</p>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("social_profile_click", {
                          platform: "github",
                          location: "contact_page",
                        })
                      }
                      className="mt-1 flex items-center gap-1 text-sm text-ink transition-colors hover:text-white"
                    >
                      albergrs90
                      <ExternalLink
                        className="h-3 w-3 shrink-0 text-muted"
                        aria-hidden="true"
                      />
                      <span className="sr-only">
                        (se abre en una pestaña nueva)
                      </span>
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-5 space-y-2 text-sm text-muted">
                <p className="flex items-center gap-2.5">
                  <MapPin className={ROW_ICON} aria-hidden="true" />
                  Sevilla, España · Remoto
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className={ROW_ICON} aria-hidden="true" />
                  CET (UTC+1) · Español nativo, inglés B1
                </p>
              </div>
            </div>

            {/* Mapa diferido */}
            <div className="overflow-hidden rounded-xl border border-line bg-raised">
              {mapOpen ? (
                <iframe
                  src={MAP_SRC}
                  title="Mapa de Sevilla"
                  className="aspect-[16/10] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapOpen(true)}
                  className="group flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_35%,rgba(79,124,255,0.12),transparent_65%)] transition-colors hover:bg-white/[0.02]"
                >
                  <MapPin
                    className="h-5 w-5 text-accent transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-ink">
                    Abrir mapa de Sevilla
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    Carga Google Maps solo si lo abres
                  </span>
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
