import { useLocation, Link } from "react-router-dom";

export const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-dvh flex items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Página no encontrada</h1>
      <p className="text-slate-400 mb-6">
        La ruta {"`"}{location.pathname}{"`"} no existe en este portafolio.
      </p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
        Volver al inicio
      </Link>
    </div>
  );
};