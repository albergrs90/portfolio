import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import foto from "../images/fotolinkedin.webp";
import { PROJECTS } from "../data/projects";
import { DEFAULT_DESCRIPTION, usePageMeta } from "../hooks/usePageMeta";
import { BTN_PRIMARY, BTN_SECONDARY } from "./ui";

const HERO_STATS = [
  { value: "8+", label: "años de experiencia" },
  { value: "+15 h", label: "ahorradas por semana" },
  { value: "AYESA", label: "donde trabajo hoy" },
  { value: "4", label: "productos publicados" },
];

const FEATURED = PROJECTS.find((project) => project.slug === "recruiterai");

export const Hero = () => {
  usePageMeta(
    "Alberto García Ríos | Desarrollador Full-Stack .NET & React",
    DEFAULT_DESCRIPTION,
  );

  const sectionRef = useRef<HTMLElement>(null);

  // Foco suave que sigue al cursor. Solo en puntero fino y sin movimiento
  // reducido: en táctil no aporta y en móvil costaría frames.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      });
    };

    element.addEventListener("pointermove", onMove);
    return () => {
      element.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="grain relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36"
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="spotlight pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-canvas"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Disponible · Sevilla / remoto
            </p>

            <h1 className="mt-8 font-display text-[clamp(2.9rem,7vw,5.6rem)] leading-[0.96] tracking-[-0.035em] text-ink">
              <span className="title-line">
                <span>Del problema</span>
              </span>
              <span className="title-line">
                <span style={{ animationDelay: "90ms" }}>al software</span>
              </span>
              <span className="title-line">
                <span
                  className="italic text-ink/90"
                  style={{ animationDelay: "180ms" }}
                >
                  en producción.
                </span>
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-muted">
              Desarrollador full-stack con 8+ años en .NET Core, React y SQL
              Server. Aplicaciones corporativas y productos propios, de la
              primera reunión al despliegue.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/projects" className={BTN_PRIMARY}>
                Ver proyectos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/como-trabajo" className={BTN_SECONDARY}>
                Cómo trabajo
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
              <div className="overflow-hidden rounded-xl border border-line-strong bg-raised">
                <img
                  src={foto}
                  alt="Retrato de Alberto García Ríos"
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              {FEATURED && (
                <Link
                  to={`/projects/${FEATURED.slug}`}
                  className="group absolute -bottom-7 -left-5 hidden w-60 rounded-xl border border-line-strong bg-canvas/90 p-3 backdrop-blur-md transition-colors hover:border-white/25 sm:block"
                >
                  <img
                    src={FEATURED.cover.src}
                    alt={FEATURED.cover.alt}
                    width={FEATURED.cover.width}
                    height={FEATURED.cover.height}
                    loading="lazy"
                    className="aspect-[16/10] w-full rounded-lg border border-line object-cover"
                  />
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Caso de estudio
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-ink">
                        {FEATURED.name}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="mb-0.5 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-y-6 border-t border-line pt-6 sm:grid-cols-4 sm:divide-x sm:divide-line">
          {HERO_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={index === 0 ? "sm:pr-6" : "sm:px-6"}
            >
              <dt className="font-display text-2xl leading-none text-ink">
                {stat.value}
              </dt>
              <dd className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
