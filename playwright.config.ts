import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración de Playwright para el portfolio de Alberto García Ríos.
 *
 * Levanta automáticamente el servidor de Vite (`npm run dev`) antes de ejecutar
 * las pruebas y lo detiene al terminar. Así no necesitas tener la app corriendo
 * manualmente.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report" }],
    ["json", { outputFolder: "test-results", outputFile: "results.json" }],
    ["junit", { outputFolder: "test-results", outputFile: "results.xml" }],
  ],

  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: "desktop",
      use: devices["Desktop Chrome"],
    },
    {
      name: "mobile",
      use: devices["Pixel 7"],
    },
    {
      name: "tablet",
      use: devices["iPad Mini"],
    },
  ],

  webServer: {
    command: "npm run dev",
    port: 5173,
    baseURL: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
