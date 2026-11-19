export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectHighlight {
  title: string;
  text: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: number;
  role: string;
  kind: "Producto propio" | "Cliente real";
  status: "En producción" | "Demo";
  /** Color de marca del proyecto, usado como acento en la tarjeta y el detalle. */
  accent: string;
  stack: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  mobile: ProjectImage;
  links: {
    live?: string;
    repo?: string;
  };
  challenge: string;
  highlights: ProjectHighlight[];
  metrics: ProjectMetric[];
  limitations: string[];
  nextSteps: string[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "bettinganalyzer",
    name: "BettingAnalyzer",
    tagline:
      "Tus apuestas de Bwin convertidas en ROI, rachas y evolución, sin subir el PDF",
    summary:
      "Analizador exclusivo para el historial de apuestas de Bwin: lee el PDF con OCR local y calcula beneficio, yield, win rate, rachas y evolución diaria, con filtros por período y exportación a CSV.",
    year: 2026,
    role: "Diseño y desarrollo frontend",
    kind: "Producto propio",
    status: "En producción",
    accent: "#3b82f6",
    stack: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "PDF.js",
      "Tesseract.js",
      "Framer Motion",
    ],
    cover: {
      src: "/projects/bettinganalyzer/cover.jpg",
      alt: "Panel de BettingAnalyzer con beneficio neto, ROI, win rate y evolución acumulada",
      width: 1440,
      height: 900,
    },
    gallery: [
      {
        src: "/projects/bettinganalyzer/detail-1.jpg",
        alt: "Tabla de apuestas filtradas de BettingAnalyzer con estado, mercado, cuota y ganancias",
        width: 1440,
        height: 900,
      },
      {
        src: "/projects/bettinganalyzer/detail-2.jpg",
        alt: "Análisis avanzado de BettingAnalyzer con distribución de resultados, mercados y rachas",
        width: 1440,
        height: 900,
      },
    ],
    mobile: {
      src: "/projects/bettinganalyzer/mobile.jpg",
      alt: "Vista móvil de BettingAnalyzer con las métricas principales",
      width: 780,
      height: 1688,
    },
    links: {
      live: "https://bettinganalyzer.netlify.app/",
      repo: "https://github.com/albergrs90/Analizador-Apuestas-Deportivas",
    },
    challenge:
      "Bwin entrega el historial de apuestas como un PDF que no se puede filtrar ni sumar. Pasarlo a mano a una hoja de cálculo es lento y propenso a errores, y subir tickets con datos personales a un servicio externo no era una opción. El reto era extraer la información de un PDF real de Bwin y devolver métricas de apuestas fiables sin backend.",
    highlights: [
      {
        title: "OCR 100% local",
        text: "PDF.js renderiza cada página a canvas y Tesseract.js la reconoce en español dentro del navegador; el PDF de Bwin nunca se sube a un servidor.",
      },
      {
        title: "Parser exclusivo de Bwin",
        text: "El texto OCR se normaliza y se divide por talones para extraer estado, fecha, mercado, evento, importe, cuota y ganancias. Si el documento no es un historial de Bwin, se rechaza con un aviso claro.",
      },
      {
        title: "Métricas de apuestas",
        text: "Beneficio neto, ROI/yield, win rate, stake y cuota medios, rachas máximas y actual, apuestas por semana y días activos, con funciones puras y tests unitarios.",
      },
      {
        title: "Del dato al análisis",
        text: "Filtros por período y estado, búsqueda, tabla paginada, evolución acumulada, desglose por mercado y exportación a CSV del subconjunto filtrado.",
      },
    ],
    metrics: [
      { value: "100%", label: "OCR en el navegador" },
      { value: "0", label: "PDF enviados a un servidor" },
      { value: "1", label: "operador soportado: Bwin" },
    ],
    limitations: [
      "Solo admite el formato de historial de Bwin: los PDFs de otros operadores se rechazan.",
      "La calidad del OCR depende del PDF: páginas borrosas o giradas pueden introducir errores de lectura.",
      "No conserva el historial entre sesiones; cada PDF se procesa y se descarta al recargar.",
    ],
    nextSteps: [
      "Soporte para más operadores, con un parser independiente por formato.",
      "Persistencia local del historial para comparar meses sin volver a subir el PDF.",
      "Exportación a Excel y enlace compartible del análisis.",
      "Fixtures de PDFs reales anonimizados para ampliar los tests del parser.",
    ],
    featured: true,
  },
  {
    slug: "recruiterai",
    name: "RecruiterAI",
    tagline: "De una oferta y cinco CV a un ranking de candidatos razonado",
    summary:
      "Herramienta que extrae el texto de los PDF en el navegador y usa Gemini Flash para puntuar a cada candidato por skills, experiencia y fit cultural, con preguntas de entrevista.",
    year: 2026,
    role: "Diseño y desarrollo full-stack",
    kind: "Producto propio",
    status: "En producción",
    accent: "#818cf8",
    stack: [
      "React",
      "TypeScript",
      "Supabase",
      "Gemini Flash",
      "PDF.js",
      "Tailwind CSS",
    ],
    cover: {
      src: "/projects/recruiterai/cover.jpg",
      alt: "Pantalla de RecruiterAI con el formulario para pegar una oferta y subir currículums en PDF",
      width: 1440,
      height: 900,
    },
    gallery: [
      {
        src: "/projects/recruiterai/detail-1.jpg",
        alt: "Formulario de currículums y estado vacío del ranking en RecruiterAI",
        width: 1440,
        height: 900,
      },
    ],
    mobile: {
      src: "/projects/recruiterai/mobile.jpg",
      alt: "Vista móvil de RecruiterAI",
      width: 780,
      height: 1688,
    },
    links: {
      live: "https://recruiteria.netlify.app/",
      repo: "https://github.com/albergrs90/RecruiterAI",
    },
    challenge:
      "Revisar decenas de currículums a mano para una oferta es lento e inconsistente: cada revisor pondera distinto y las preguntas de entrevista se improvisan. La herramienta debía devolver un ranking explicable en una sola pasada y sin que los PDF acabaran almacenados en un servidor propio.",
    highlights: [
      {
        title: "Extracción en cliente",
        text: "PDF.js lee hasta cinco currículums en el navegador; el PDF original no se sube a ningún backend.",
      },
      {
        title: "LLM aislado en una Edge Function",
        text: "La función analyze-resumes construye el prompt con la oferta y los textos, llama a Gemini Flash y valida la respuesta antes de devolverla.",
      },
      {
        title: "Ranking explicable",
        text: "Cada candidato recibe puntuación global, skills, experiencia, fit cultural, recomendación y preguntas de entrevista.",
      },
      {
        title: "Estados de progreso reales",
        text: "La UI refleja extracción, análisis y preparación del ranking, con timeout de dos minutos y errores específicos.",
      },
    ],
    metrics: [
      { value: "5", label: "CV por análisis" },
      { value: "4", label: "dimensiones de scoring" },
      { value: "0", label: "PDF subidos a un servidor" },
    ],
    limitations: [
      "No conserva un historial de análisis entre sesiones.",
      "La calidad del ranking depende del texto extraído: un PDF escaneado sin OCR no se puede leer.",
      "No hay cuotas de uso por usuario más allá del tamaño del lote.",
    ],
    nextSteps: [
      "Historial de análisis por oferta y exportación del ranking a CSV.",
      "OCR para currículums escaneados.",
      "Comparativa de modelos y elección de proveedor.",
    ],
    featured: true,
  },
  {
    slug: "berta",
    name: "Berta Masajista",
    tagline: "Web comercial para un negocio real, con contenido editable sin código",
    summary:
      "Sitio de quiromasaje con diseño a medida y un panel privado que actualiza textos, horarios, servicios y tarifas en producción a través de Supabase.",
    year: 2026,
    role: "Diseño y desarrollo full-stack",
    kind: "Cliente real",
    status: "En producción",
    accent: "#d4b483",
    stack: [
      "React",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Recharts",
      "Netlify",
    ],
    cover: {
      src: "/projects/berta/cover.jpg",
      alt: "Portada de la web de Berta Masajista con su identidad visual dorada",
      width: 1440,
      height: 900,
    },
    gallery: [
      {
        src: "/projects/berta/detail-1.jpg",
        alt: "Sección de servicios de la web de Berta Masajista",
        width: 1440,
        height: 900,
      },
      {
        src: "/projects/berta/detail-2.jpg",
        alt: "Sección de tarifas y contacto de Berta Masajista",
        width: 1440,
        height: 900,
      },
    ],
    mobile: {
      src: "/projects/berta/mobile.jpg",
      alt: "Vista móvil de la web de Berta Masajista",
      width: 780,
      height: 1688,
    },
    links: {
      live: "https://bertaquiromasajista.netlify.app/",
    },
    challenge:
      "Un negocio local necesitaba una web con identidad propia y capacidad de cambiar precios, horarios y textos sin depender de un desarrollador ni de un CMS pesado. El objetivo era convertir visitas en conversaciones de WhatsApp, no en formularios que nadie contesta.",
    highlights: [
      {
        title: "Contenido en producción",
        text: "Un panel con Supabase Auth escribe en site_settings: los cambios se publican al instante y sin redeploy.",
      },
      {
        title: "Diseño a medida",
        text: "Cormorant Garamond e Inter con una paleta dorada, lejos de la plantilla genérica de negocio local.",
      },
      {
        title: "Conversión directa",
        text: "Cada llamada a la acción abre WhatsApp con un mensaje prerrellenado según el contexto.",
      },
      {
        title: "Base legal y semántica",
        text: "Aviso RGPD, privacidad, jerarquía de encabezados y metadatos pensados para búsqueda local.",
      },
    ],
    metrics: [
      { value: "0", label: "redeploys para publicar cambios" },
      { value: "1", label: "panel privado de administración" },
      { value: "0", label: "dependencia de un CMS externo" },
    ],
    limitations: [
      "El cierre de la cita ocurre en WhatsApp: no hay calendario ni pago online.",
      "El panel y el sitio comparten proyecto de Supabase, sin entorno de staging.",
    ],
    nextSteps: [
      "Reserva online con disponibilidad real y confirmación automática.",
      "Galería de trabajos y testimonios de clientes.",
      "Medición de conversión de los CTAs de WhatsApp.",
    ],
    featured: true,
  },
  {
    slug: "lumina",
    name: "Lumina Invoice",
    tagline: "Facturas profesionales en PDF, sin cuenta y sin enviar datos",
    summary:
      "Generador de facturas que funciona por completo en el navegador: plantillas, logo, impuestos y moneda, con exportación a PDF y persistencia local.",
    year: 2026,
    role: "Diseño y desarrollo frontend",
    kind: "Producto propio",
    status: "Demo",
    accent: "#34d399",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "jsPDF",
      "html2canvas",
      "Zustand",
    ],
    cover: {
      src: "/projects/lumina/cover.jpg",
      alt: "Editor de facturas de Lumina Invoice con la vista previa del documento",
      width: 1440,
      height: 900,
    },
    gallery: [
      {
        src: "/projects/lumina/detail-1.jpg",
        alt: "Formulario de datos del emisor y del cliente en Lumina Invoice",
        width: 1440,
        height: 900,
      },
      {
        src: "/projects/lumina/detail-2.jpg",
        alt: "Vista previa de la factura generada con Lumina Invoice",
        width: 1440,
        height: 900,
      },
    ],
    mobile: {
      src: "/projects/lumina/mobile.jpg",
      alt: "Vista móvil del editor de facturas de Lumina Invoice",
      width: 780,
      height: 1688,
    },
    links: {
      live: "https://facturagenerator.netlify.app/",
      repo: "https://github.com/albergrs90/Lumina-Invoice-Generator",
    },
    challenge:
      "Emitir una factura no debería exigir crear una cuenta ni confiar los datos fiscales a un servicio desconocido. El reto era construir una herramienta completa de facturación que funcionara sin backend y produjera un PDF con calidad de imprenta.",
    highlights: [
      {
        title: "PDF en el cliente",
        text: "jsPDF y html2canvas componen el documento en el navegador; no hay backend ni subida de datos.",
      },
      {
        title: "Tres identidades visuales",
        text: "Estilos Moderno, Corporate y Creativo, con logo, moneda e IVA configurables.",
      },
      {
        title: "Persistencia real",
        text: "Zustand guarda la factura en curso y un historial de los últimos clientes en localStorage.",
      },
      {
        title: "Cálculo completo",
        text: "Conceptos, cantidades, subtotal, impuestos y total, con validación de los campos obligatorios.",
      },
    ],
    metrics: [
      { value: "100%", label: "en el navegador" },
      { value: "3", label: "estilos de factura" },
      { value: "0", label: "cuentas o servidores" },
    ],
    limitations: [
      "El historial vive en el navegador: no se sincroniza entre dispositivos.",
      "Compartir copia la URL actual; todavía no serializa la factura en el enlace.",
    ],
    nextSteps: [
      "Enlace compartible con la factura serializada.",
      "Carga diferida de jsPDF y html2canvas para reducir el bundle inicial.",
      "Plantillas guardadas e importación/exportación en JSON.",
    ],
    featured: true,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((project) => project.slug === slug);
