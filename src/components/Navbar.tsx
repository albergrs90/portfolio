import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { GithubIcon } from "./SocialIcons";
import { PROFILE } from "../data/about";
import { useScrolled } from "../hooks/useScrolled";
import { trackEvent } from "../utils/analytics";

interface NavLink {
  to: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { to: "/about", label: "Sobre mí" },
  { to: "/como-trabajo", label: "Cómo trabajo" },
  { to: "/skills", label: "Tecnologías" },
  { to: "/projects", label: "Proyectos" },
  { to: "/contact", label: "Contacto" },
];

const isActive = (pathname: string, to: string) =>
  pathname === to || (to === "/projects" && pathname.startsWith("/projects"));

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled();
  const { pathname } = useLocation();

  // Cerrar el menú móvil al cambiar de ruta mediante el botón atrás/adelante
  // del navegador (popstate) o al presionar Escape.
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || isOpen
          ? "border-b border-line bg-canvas/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1180px] items-center justify-between px-6 lg:px-8">
        {/* Marca */}
        <Link
          to="/"
          className="flex items-center gap-3 text-ink"
          aria-label="Alberto García Ríos, inicio"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line-strong font-display text-lg italic leading-none">
            AG
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            Alberto García <span className="text-muted">Ríos</span>
          </span>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className="group relative py-2 text-[13px] font-medium transition-colors"
              >
                <span
                  className={
                    active ? "text-ink" : "text-muted group-hover:text-ink"
                  }
                >
                  {link.label}
                </span>
                <span
                  className={`absolute inset-x-0 bottom-0.5 h-px origin-left bg-ink transition-transform duration-200 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Acciones desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("social_profile_click", {
                platform: "github",
                location: "navbar",
              })
            }
            className="hidden text-muted transition-colors hover:text-ink lg:block"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <Link
            to="/contact"
            onClick={() =>
              trackEvent("cta_contact_click", { location: "navbar_desktop" })
            }
            className="rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-canvas transition-colors hover:bg-white"
          >
            Hablemos
          </Link>
        </div>

        {/* Botón móvil */}
        <button
          onClick={toggleMenu}
          className="-mr-2 p-2 text-muted transition-colors hover:text-ink md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div id="mobile-menu" className="border-t border-line md:hidden">
          <nav className="mx-auto flex w-full max-w-[1180px] flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(pathname, link.to) ? "page" : undefined}
                className={`border-b border-line py-3 text-sm ${
                  isActive(pathname, link.to) ? "text-ink" : "text-muted"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => {
                setIsOpen(false);
                trackEvent("cta_contact_click", { location: "navbar_mobile" });
              }}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-canvas"
            >
              Hablemos
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
