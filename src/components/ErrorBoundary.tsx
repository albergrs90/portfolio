import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary captura errores de renderizado en su árbol de hijos y muestra
 * una interfaz de fallback en lugar de desmontar toda la aplicación.
 * No captura errores de controladores de eventos, ni asíncronos, ni en
 * useEffect (esos deben manejarse por separado).
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // No se exponen detalles internos al usuario; solo se registran para
    // diagnóstico del desarrollador.
    console.error(
      "[ErrorBoundary] Error de renderizado capturado:",
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="mx-auto max-w-md p-8 text-center">
            <h2 className="font-display text-2xl text-ink">
              Algo salió mal al renderizar esta página
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Se produjo un error inesperado. Intenta recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-white"
            >
              Recargar página
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
