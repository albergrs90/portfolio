import { useState } from "react";
import { Mail, Send, CheckCircle, Code2 } from "lucide-react";
import { GithubIcon } from "./SocialIcons"; // <-- Importamos nuestro icono seguro

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
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
                  <span className="text-sm font-medium text-white">
                    alberto@example.com
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
                    <GithubIcon className="w-4 h-4" />{" "}
                    {/* <-- Usamos el icono seguro */}
                    <span>GitHub</span>
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
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre o empresa"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Cuéntame sobre tu oferta o proyecto..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25"
                  >
                    <span>Enviar Mensaje</span>
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
