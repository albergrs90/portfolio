import { useLocation, Link } from "react-router-dom";

export const AboutDetail = () => {
  const location = useLocation();

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 p-8">
      <nav className="mb-6">
        <Link to="/" className="text-slate-400 hover:text-white underline">
          ← Volver al inicio
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Sobre mí (ruta detallada)
      </h1>

      <p className="text-slate-400 mb-6">
        Has accedido a la ruta detallada a través de: {"`"}{location.pathname}{"`"}
      </p>

      <p className="text-slate-400">
        Aquí podrías mostrar un perfil más completo, currículum descargable,
        o secciones adicionales que no caben en la página principal.
      </p>

      <div className="mt-8 p-6 bg-slate-800 rounded-lg">
        <h2 className="font-semibold mb-4">Información adicional</h2>
        <ul className="space-y-3 text-slate-300">
          <li>Experiencia profesional</li>
          <li>Formación académica</li>
          <li>Habilidades destacadas</li>
          <li>Proyectos destacados</li>
        </ul>
      </div>
    </div>
  );
};