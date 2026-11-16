import type { ReactNode } from "react";
import { CONTAINER } from "./ui";

interface PageHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
}

/** Cabecera común de las rutas internas: índice, título editorial y entradilla. */
export const PageHeader = ({
  index,
  label,
  title,
  description,
  action,
}: PageHeaderProps) => (
  <header className="border-b border-line pb-10">
    <div className={`${CONTAINER} flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between`}>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-white/20">/</span>
          {label}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl leading-[1.03] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  </header>
);
