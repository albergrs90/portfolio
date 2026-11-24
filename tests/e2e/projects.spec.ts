import { test, expect } from "@playwright/test";

const PROJECT_SLUGS = ["bettinganalyzer", "recruiterai", "berta", "lumina"];

test.describe("Catálogo de proyectos", () => {
  test("muestra el listado de proyectos en /projects", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /Cuatro productos/ })).toBeVisible();

    for (const slug of PROJECT_SLUGS) {
      const projectLink = page.getByRole("link", { name: new RegExp(slug, "i") }).first();
      await expect(projectLink).toBeVisible();
    }
  });

  test("abre el detalle de cada proyecto y muestra su contenido", async ({ page }) => {
    for (const slug of PROJECT_SLUGS) {
      await page.goto("/projects");
      await page.waitForLoadState("networkidle");

      const projectLink = page.getByRole("link", { name: new RegExp(slug, "i") }).first();
      await expect(projectLink).toBeVisible();
      await projectLink.click();

      await expect(page).toHaveURL(`/projects/${slug}`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("heading", { name: /El reto/ })).toBeVisible();
      await expect(page.getByRole("heading", { name: /Qué construí/ })).toBeVisible();
      await expect(page.getByRole("heading", { name: /El resultado/ })).toBeVisible();
      await expect(page.getByRole("heading", { name: /Stack/ })).toBeVisible();
    }
  });

  test("el botón Volver a proyectos regresa al catálogo", async ({ page }) => {
    await page.goto("/projects/bettinganalyzer");
    await expect(page).toHaveURL("/projects/bettinganalyzer");

    await page.getByRole("link", { name: /Volver a proyectos/ }).click();
    await expect(page).toHaveURL("/projects");
    await expect(page.getByRole("heading", { name: /Cuatro productos/ })).toBeVisible();
  });

  test("la navegación Anterior/Siguiente entre proyectos funciona", async ({ page }) => {
    await page.goto("/projects/bettinganalyzer");

    await page.getByRole("link", { name: /Siguiente/ }).click();
    await expect(page.url()).toMatch(/\/projects\/(recruiterai|berta|lumina)/);

    await page.getByRole("link", { name: /Anterior/ }).click();
    await expect(page).toHaveURL("/projects/bettinganalyzer");
  });

  test("los enlaces externos (demo/repo) se abren en pestaña nueva", async ({ page }) => {
    await page.goto("/projects/bettinganalyzer");

    const demoLink = page.getByRole("link", { name: /Ver demo/ }).first();
    await expect(demoLink).toHaveAttribute("target", "_blank");

    const repoLink = page.getByRole("link", { name: /Código/ }).first();
    await expect(repoLink).toHaveAttribute("target", "_blank");
  });
});
