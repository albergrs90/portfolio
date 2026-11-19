// Captura las imágenes de portada y detalle de los proyectos enlazados.
//
// Uso:
//   npm run screenshots
//   npm run screenshots -- --only=bettinganalyzer
//
// Requiere Playwright (`npm i -D playwright`) y un navegador instalado. El
// script usa Chrome o Edge del sistema si están disponibles; si no, cae al
// Chromium de Playwright (`npx playwright install chromium`).
//
// Salida:
//   public/projects/<slug>/cover.jpg      → tarjeta del portfolio
//   public/projects/<slug>/detail-1.jpg   → caso de estudio
//   public/projects/<slug>/detail-2.jpg   → caso de estudio
//   public/projects/<slug>/mobile.jpg     → vista móvil

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const PROJECTS = [
  {
    slug: "bettinganalyzer",
    // El modo demo genera apuestas de ejemplo para poder capturar el dashboard
    // sin depender de un PDF real.
    url: "https://bettinganalyzer.netlify.app/?demo=1",
    settleMs: 3000,
    detailRatios: [0.45, 1],
    // El panel avanzado está cerrado por defecto; lo abrimos para la segunda
    // captura de detalle.
    prepare: async (page) => {
      const toggle = page.locator('button[aria-controls="advanced-panel"]');
      if ((await toggle.count()) > 0) {
        await toggle.first().click();
        await page.waitForTimeout(600);
      }
    },
  },
  {
    slug: "recruiterai",
    url: "https://recruiteria.netlify.app/",
    settleMs: 3500,
    // La app ocupa casi una pantalla: solo hay una vista de detalle útil.
    detailRatios: [1],
  },
  {
    slug: "berta",
    url: "https://bertaquiromasajista.netlify.app/",
    settleMs: 2500,
    detailRatios: [0.38, 0.72],
  },
  {
    slug: "lumina",
    url: "https://facturagenerator.netlify.app/",
    settleMs: 2500,
    detailRatios: [0.38, 0.72],
  },
];

const OUTPUT_DIR = path.resolve("public/projects");
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function launchBrowser() {
  for (const channel of ["chrome", "msedge"]) {
    try {
      const browser = await chromium.launch({ channel });
      console.log(`Navegador: ${channel}`);
      return browser;
    } catch {
      // Probamos el siguiente.
    }
  }

  console.warn(
    "No se encontró Chrome ni Edge. Usando Chromium de Playwright " +
      "(instálalo con: npx playwright install chromium).",
  );
  return chromium.launch();
}

async function waitForContent(page, url, settleMs) {
  await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(settleMs);

  const { title, length } = await page.evaluate(() => ({
    title: document.title,
    length: document.body.innerText.trim().length,
  }));

  if (length < 80) {
    throw new Error(
      `La página "${title}" parece vacía (${length} caracteres de texto).`,
    );
  }

  return { title, length };
}

async function scrollShot(page, top) {
  await page.evaluate((y) => window.scrollTo(0, y), top);
  await page.waitForTimeout(600);
}

async function captureProject(browser, project) {
  const dir = path.join(OUTPUT_DIR, project.slug);
  await fs.mkdir(dir, { recursive: true });

  const context = await browser.newContext({
    viewport: DESKTOP,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: "light",
    locale: "es-ES",
  });

  const page = await context.newPage();
  console.log(`\n→ ${project.url}`);
  const { title, length } = await waitForContent(page, project.url, project.settleMs);
  console.log(`  "${title}" (${length} caracteres de texto)`);

  await scrollShot(page, 0);
  await page.screenshot({
    path: path.join(dir, "cover.jpg"),
    type: "jpeg",
    quality: 82,
    animations: "disabled",
  });

  // Acciones opcionales que cambian la altura de la página (por ejemplo,
  // desplegar un panel) antes de calcular los scrolls de detalle.
  if (project.prepare) {
    await project.prepare(page);
  }

  const maxScroll = await page.evaluate(() =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
  );

  for (const [index, ratio] of project.detailRatios.entries()) {
    await scrollShot(page, Math.round(maxScroll * ratio));
    await page.screenshot({
      path: path.join(dir, `detail-${index + 1}.jpg`),
      type: "jpeg",
      quality: 82,
      animations: "disabled",
    });
  }

  await context.close();

  const mobileContext = await browser.newContext({
    viewport: MOBILE,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
    colorScheme: "light",
    locale: "es-ES",
  });

  const mobilePage = await mobileContext.newPage();
  await waitForContent(mobilePage, project.url, project.settleMs);
  await mobilePage.screenshot({
    path: path.join(dir, "mobile.jpg"),
    type: "jpeg",
    quality: 78,
    animations: "disabled",
  });
  await mobileContext.close();

  const files = await fs.readdir(dir);
  for (const file of files) {
    const stats = await fs.stat(path.join(dir, file));
    console.log(`  ${file.padEnd(14)} ${(stats.size / 1024).toFixed(1)} KB`);
  }
}

async function main() {
  const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice("--only=".length) : null;
  const projects = only
    ? PROJECTS.filter((project) => project.slug === only)
    : PROJECTS;

  if (only && projects.length === 0) {
    throw new Error(
      `No existe el proyecto "${only}". Slugs disponibles: ${PROJECTS.map(
        (project) => project.slug,
      ).join(", ")}`,
    );
  }

  // Solo se regeneran las carpetas de los proyectos seleccionados; el resto
  // de public/ no se toca.
  for (const project of projects) {
    await fs.rm(path.join(OUTPUT_DIR, project.slug), {
      recursive: true,
      force: true,
    });
  }

  const browser = await launchBrowser();

  try {
    for (const project of projects) {
      await captureProject(browser, project);
    }
  } finally {
    await browser.close();
  }

  console.log("\nListo. Imágenes en public/projects/<slug>/.");
}

main().catch((error) => {
  console.error("\nError capturando las imágenes:");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
