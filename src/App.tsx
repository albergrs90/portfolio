import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
      <Navbar />

      {/* Contenido temporal para comprobar scroll y margen */}
      <main className="pt-24 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-3xl font-bold text-slate-200">
          Navbar Integrada Correctamente
        </h1>
        <p className="text-slate-400 mt-2">
          Listo para construir la sección Hero.
        </p>
      </main>
    </div>
  );
}

export default App;
