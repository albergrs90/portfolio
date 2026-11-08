import { useState, useEffect, useCallback } from "react";
import { Menu, X, Code2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon } from "./SocialIcons";

interface NavLink {
  to: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { to: "/about", label: "Sobre mí" },
  { to: "/skills", label: "Tecnologías" },
  { to: "/projects", label: "Proyectos" },
  { to: "/contact", label: "Contacto" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Cerrar el menú móvil al cambiar de ruta mediante el botón atrás/adelante
  // del navegador (popstate) o al presionar Escape. Los enlaces del menú
  // móvil cierran al hacer clic a través de su onClick individual.
  useEffect(() => {
    const handlePopState = () => setIsOpen(false);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Marca */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl tracking-tight"
          >
            <Code2 className="w-6 h-6 text-blue-500" />
            <span>
              Alberto<span className="text-blue-500">.dev</span>
            </span>
          </Link>

          {/* Menú Desktop (generado desde NAV_LINKS) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Enlaces a Redes / Contacto Directo */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/albergrs90"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-2"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contactar</span>
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white p-2"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desplegable Menú Móvil (generado desde NAV_LINKS) */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
