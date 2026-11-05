import { useParams, Link } from "react-router-dom";

export const ProjectsDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 p-8">
      <nav className="mb-6">
        <Link to="/projects" className="text-slate-400 hover:text-white underline">
          ← Volver a proyectos
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Detalle del proyecto {"`"}{projectId}{"`"}
      </h1>

      <p className="text-slate-400">
        Esta es la página de detalle del proyecto {projectId}. En una aplicación
        real mostrarías la información completa, imágenes, tecnologías usadas, etc.
      </p>
    </div>
  );
};