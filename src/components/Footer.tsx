import { Code2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PROFILE } from "../data/about";

const FOOTER_LINKS = [
  { to: "/about", label: "Sobre mí" },
  { to: "/como-trabajo", label: "Cómo trabajo" },
  { to: "/skills", label: "Tecnologías" },
  { to: "/projects", label: "Proyectos" },
  { to: "/contact", label: "Contacto" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-white"
            >
              <Code2 className="h-5 w-5 text-blue-500" aria-hidden="true" />
              <span>
                Alberto<span className="text-blue-500">.dev</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Desarrollador full-stack en Sevilla. Aplicaciones web con .NET
              Core, React y SQL Server, y agentes de IA aplicados al desarrollo.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-slate-800 p-2 text-slate-400 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-slate-800 p-2 text-slate-400 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label={`Escribir a ${PROFILE.email}`}
                className="rounded-lg border border-slate-800 p-2 text-slate-400 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav
            className="md:col-span-3"
            aria-label="Enlaces del pie de página"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Navegación
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Contacto
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.phoneHref}
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {PROFILE.phoneDisplay}
                </a>
              </li>
              <li>
                {PROFILE.location} · {PROFILE.modality}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. Hecho con React,
            TypeScript y Tailwind CSS.
          </p>
          <p>
            {PROFILE.location} · {PROFILE.modality}
          </p>
        </div>
      </div>
    </footer>
  );
};
