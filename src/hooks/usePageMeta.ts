import { useEffect } from "react";

export const DEFAULT_DESCRIPTION =
  "Portafolio de Alberto García Ríos, desarrollador web full-stack especializado en .NET Core, React, TypeScript y SQL Server. Proyectos, stack técnico y contacto.";

/**
 * Título y descripción propios de cada ruta. La app es una SPA: sin esto todas
 * las páginas comparten el título del index.html.
 */
export const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;

    if (!description) return;

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
};

/**
 * Marca la página como `noindex` mientras está montada. Se usa en la 404 y en
 * los slugs de proyecto inexistentes para que no acaben en el índice.
 */
export const useNoIndex = () => {
  useEffect(() => {
    const existing = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const previous = existing?.getAttribute("content") ?? null;
    const meta = existing ?? document.createElement("meta");

    if (!existing) {
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", "noindex, follow");

    return () => {
      if (existing) {
        meta.setAttribute("content", previous ?? "index, follow");
      } else {
        meta.remove();
      }
    };
  }, []);
};
