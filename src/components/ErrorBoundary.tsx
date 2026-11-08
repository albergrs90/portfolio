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
          <div className="p-8 text-center text-red-400">
            <h2 className="text-xl font-bold text-white mb-2">
              Algo salió mal al renderizar esta página
            </h2>
            <p className="text-slate-300 mb-4">
              Se produjo un error inesperado. Intenta recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
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
