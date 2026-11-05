import { useState } from "react";
import { Menu, X, Code2, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Marca */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <Code2 className="w-6 h-6 text-blue-500" />
            <span>
              Alberto<span className="text-blue-500">.dev</span>
            </span>
          </Link>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors">
              Sobre mí
            </Link>
            <Link to="/skills" className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors">
              Tecnologías
            </Link>
            <Link to="/projects" className="text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors">
              Proyectos
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
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
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
          <Link to="/about" key="about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50">
            Sobre mí
          </Link>
          <Link to="/skills" key="skills" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50">
            Tecnologías
          </Link>
          <Link to="/projects" key="projects" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50">
            Proyectos
          </Link>
          <Link to="/contact" key="contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50">
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
};