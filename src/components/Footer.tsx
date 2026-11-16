import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PROFILE } from "../data/about";
import { CONTAINER } from "./ui";

const FOOTER_LINKS = [
  { to: "/about", label: "Sobre mí" },
  { to: "/como-trabajo", label: "Cómo trabajo" },
  { to: "/skills", label: "Tecnologías" },
  { to: "/projects", label: "Proyectos" },
  { to: "/contact", label: "Contacto" },
];

const SOCIAL_LINK =
  "text-muted transition-colors hover:text-ink";

export const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div
        className={`${CONTAINER} flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between`}
      >
        <Link to="/" className="flex items-center gap-3" aria-label="Inicio">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong font-display text-base italic leading-none text-ink">
            AG
          </span>
          <span className="text-sm text-ink">
            Alberto García <span className="text-muted">Ríos</span>
          </span>
        </Link>

        <nav aria-label="Enlaces del pie de página">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={SOCIAL_LINK}
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={SOCIAL_LINK}
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label={`Escribir a ${PROFILE.email}`}
            className={SOCIAL_LINK}
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div
          className={`${CONTAINER} flex flex-col gap-1 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
          <p>
            {PROFILE.location} · {PROFILE.modality}
          </p>
        </div>
      </div>
    </footer>
  );
};
