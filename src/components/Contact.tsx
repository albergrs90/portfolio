import { useState, useEffect, useRef } from "react";
import { Mail, Send, CheckCircle, Code2, Copy, Check } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { supabase } from "../lib/supabase";

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const EMAIL = "alber.grs@gmail.com";
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mitigación de spam: tiempo mínimo entre envíos (lado del cliente)
  const SUBMIT_COOLDOWN_MS = 60_000;
  const lastSubmitTime = useRef<number>(0);

  // Referencia para el temporizador de "copiado": se inicia al copiar y se
  // limpia correctamente en cada nueva copia o desmontaje.
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpiar temporizador al desmontar el componente
  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    };
  }, []);

  const copyEmail = async () => {
    // Limpiar temporizador previo si existe
    if (copyTimer.current) {
      clearTimeout(copyTimer.current);
    }

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const nombre = formData.get("nombre") as string;
      const email = formData.get("email") as string;
      const mensaje = formData.get("mensaje") as string;

      // Honeypot antispam: campo oculto que los bots suelen rellenar. Si tiene
      // valor, se descarta silenciosamente sin notificar al usuario.
      const hp = formData.get("hp");
      if (hp !== null && String(hp).trim() !== "") {
        setIsSubmitting(false);
        return;
      }

      if (!nombre || !email || !mensaje) {
        setError("Por favor completa todos los campos");
        setIsSubmitting(false);
        return;
      }

      // Límite de frecuencia del lado del cliente (antispam básico)
      const now = Date.now();
      if (now - lastSubmitTime.current < SUBMIT_COOLDOWN_MS) {
        setError("Demasiados mensajes. Espera un momento antes de volver a enviar.");
        setIsSubmitting(false);
        return;
      }
      lastSubmitTime.current = now;

      // 1. Guardar en Supabase (solo INSERT; protegido por RLS)
      const { error: dbError } = await supabase
        .from("mensajes")
        .insert([{ nombre, email, mensaje, leido: false }]);

      if (dbError) throw dbError;

      // 2. Enviar email de notificación via Edge Function
      try {
        const { error: fnError } = await supabase.functions.invoke(
          "send-contact-email",
          {
            body: { nombre, email, mensaje },
          },
        );

        if (fnError) {
          console.error("Error al enviar email de notificación:", fnError);
        }
      } catch (fnErr) {
        console.error("Error al invocar Edge Function:", fnErr);
      }

      // 3. Mostrar éxito
      setSubmitted(true);
      form.reset();
    } catch (err: unknown) {
      // err se trata como unknown (nunca `any`). Sus detalles internos no se
      // loguean ni se exponen al usuario; solo se notifica un error genérico.
      void err;
      console.error("Error no controlado en el formulario de contacto");
      setError("Error al enviar tu mensaje. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Contacto y <span className="text-blue-500">Colaboración</span>
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl">
            ¿Tienes una propuesta laboral, un proyecto en mente o quieres hablar
            de tecnología? Escríbeme y te responderé lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">
                Información directa
              </h3>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-3 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent("Contacto desde tu portfolio")}`}
                      className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-white transition-colors hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      {EMAIL}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={
                        copied ? "Email copiado" : "Copiar email"
                      }
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <span aria-live="polite" className="sr-only">
                    {copied ? "Email copiado al portapapeles" : ""}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80">
                <h4 className="text-sm font-medium text-slate-400 mb-4">
                  Perfiles profesionales
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/albergrs90"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:text-white hover:border-blue-500/40 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <GithubIcon className="w-4 h-4" /> <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    ¡Mensaje enviado con éxito!
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Gracias por ponerte en contacto. Te responderé lo antes
                    posible a tu correo electrónico.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                    }}
                    className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-xs font-medium text-slate-400 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      required
                      autoComplete="name"
                      aria-describedby={error ? "contact-error" : undefined}
                      placeholder="Tu nombre o empresa"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      autoComplete="email"
                      aria-describedby={error ? "contact-error" : undefined}
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-xs font-medium text-slate-400 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      required
                      autoComplete="off"
                      aria-describedby={error ? "contact-error" : undefined}
                      placeholder="Cuéntame sobre tu oferta o proyecto..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Honeypot antispam: campo oculto visualmente. Los bots
                      suelen rellenarlo; si llega con valor se descarta como spam. */}
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
                      className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-28 border-t border-slate-800/80 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Code2 className="w-5 h-5 text-blue-500" />
            <span>
              Alberto<span className="text-blue-500">.dev</span>
            </span>
          </div>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Alberto García Ríos. Construido con
            React, TypeScript y Tailwind CSS.
          </p>
        </div>
      </footer>
    </section>
  );
};
