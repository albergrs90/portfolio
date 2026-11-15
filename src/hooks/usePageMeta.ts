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
