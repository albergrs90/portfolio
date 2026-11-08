import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { NotFound } from "./components/NotFound";
import { Contact } from "./components/Contact";
import { ErrorBoundary } from "./components/ErrorBoundary";

const Projects = lazy(() => import("./components/Projects").then((mod) => ({ default: mod.Projects })));
const ProjectsDetail = lazy(
  () => import("./components/ProjectsDetail").then((mod) => ({ default: mod.ProjectsDetail }))
);

function App() {
  return (
    <Router>
      <div className="min-h-dvh bg-slate-950 text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
        <Navbar />
        <main>
          <ErrorBoundary>
            <Suspense fallback={<div className="p-8 text-slate-500">Cargando...</div>}>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectsDetail />} />
                <Route path="/contact" element={<Contact />} />
                {/* Ruta 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  );
}

export default App;
