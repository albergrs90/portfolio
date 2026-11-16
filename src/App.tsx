import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { NotFound } from "./components/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";

const Projects = lazy(() => import("./components/Projects").then((mod) => ({ default: mod.Projects })));
const About = lazy(() => import("./components/About").then((mod) => ({ default: mod.About })));
const Skills = lazy(() => import("./components/Skills").then((mod) => ({ default: mod.Skills })));const ProjectsDetail = lazy(
  () => import("./components/ProjectsDetail").then((mod) => ({ default: mod.ProjectsDetail }))
);
const HowIWork = lazy(() =>
  import("./components/HowIWork").then((mod) => ({ default: mod.HowIWork }))
);
const Contact = lazy(() => import("./components/Contact").then((mod) => ({ default: mod.Contact })));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-dvh flex-col bg-canvas text-ink antialiased selection:bg-accent selection:text-canvas">
        <Navbar />
        <main className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<div className="p-8 font-mono text-xs text-muted">Cargando…</div>}>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/como-trabajo" element={<HowIWork />} />
                {/* Enlaces antiguos a /process */}
                <Route
                  path="/process"
                  element={<Navigate to="/como-trabajo" replace />}
                />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectsDetail />} />
                <Route path="/contact" element={<Contact />} />
                {/* Ruta 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
