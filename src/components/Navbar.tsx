import { useState } from "react";
import { Menu, X, Code2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon } from "./SocialIcons";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/about"
              className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors"
            >
              Sobre mí
            </Link>
            <Link
              to="/skills"
              className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors"
            >
              Tecnologías
            </Link>
            <Link
              to="/projects"
              className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors"
            >
              Proyectos
            </Link>
            <Link
              to="/contact"
              className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors"
            >
              Contacto
            </Link>
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
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
              aria-label="Abrir menú"
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

      {/* Desplegable Menú Móvil */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/about"
            key="about"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50"
          >
            Sobre mí
          </Link>
          <Link
            to="/skills"
            key="skills"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50"
          >
            Tecnologías
          </Link>
          <Link
            to="/projects"
            key="projects"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50"
          >
            Proyectos
          </Link>
          <Link
            to="/contact"
            key="contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50"
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
};
