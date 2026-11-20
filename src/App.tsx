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
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import { CookieConsent } from "./components/CookieConsent";

const Projects = lazy(() =>
  import("./components/Projects").then((mod) => ({ default: mod.Projects })),
);
const About = lazy(() =>
  import("./components/About").then((mod) => ({ default: mod.About })),
);
const Skills = lazy(() =>
  import("./components/Skills").then((mod) => ({ default: mod.Skills })),
);
const ProjectsDetail = lazy(() =>
  import("./components/ProjectsDetail").then((mod) => ({
    default: mod.ProjectsDetail,
  })),
);
const HowIWork = lazy(() =>
  import("./components/HowIWork").then((mod) => ({ default: mod.HowIWork })),
);
const Contact = lazy(() =>
  import("./components/Contact").then((mod) => ({ default: mod.Contact })),
);
const Privacy = lazy(() =>
  import("./components/Privacy").then((mod) => ({ default: mod.Privacy })),
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
      >
        Saltar al contenido
      </a>
      <div className="flex min-h-dvh flex-col bg-canvas text-ink antialiased selection:bg-accent selection:text-canvas">
        <Navbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 focus:outline-none"
        >
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="p-8 font-mono text-xs text-muted">
                  Cargando…
                </div>
              }
            >
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
                <Route path="/privacidad" element={<Privacy />} />
                {/* Ruta 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </Router>
  );
}

export default App;
