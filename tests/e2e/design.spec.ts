import { test, expect } from "@playwright/test";

test.describe("Diseño y estructura", () => {
  test("la homepage tiene todos sus bloques de diseño", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);

    await expect(page.locator("h1").first()).toContainText(/Del problema/);
    await expect(page.getByText(/Desarrollador full-stack/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Ver proyectos/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Cómo trabajo/ }).first()).toBeVisible();
    await expect(page.getByText("8+").first()).toBeVisible();
    await expect(page.getByText(/años de experiencia/)).toBeVisible();
    await expect(page.getByText("4").first()).toBeVisible();
    await expect(page.getByText(/productos publicados/)).toBeVisible();
    await expect(page.getByAltText(/Retrato de Alberto García Ríos/).first()).toBeVisible();
  });

  test("la página Sobre mí tiene sus secciones de diseño", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /Ocho años/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Trayectoria/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Cómo tomo decisiones/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Formación/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Idiomas y ubicación/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Prueba, no adjetivos/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Descargar CV/ })).toBeVisible();
  });

  test("la página Cómo trabajo muestra sus escenarios", async ({ page }) => {
    await page.goto("/como-trabajo");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /Así convierto/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Crear un proyecto/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ampliar una aplicación existente/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Investigar y resolver un error/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Mejorar el rendimiento/ })).toBeVisible();
  });

  test("la página Tecnologías muestra las categorías de stack", async ({ page }) => {
    await page.goto("/skills");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);

    await expect(page.getByRole("heading", { name: /Las herramientas con las que trabajo/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Backend/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Frontend/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Bases de datos/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Plataforma e IA/ })).toBeVisible();
    await expect(page.getByText(/\.NET Core/)).toBeVisible();
    await expect(page.getByText(/React/)).toBeVisible();
    await expect(page.getByText(/SQL Server/)).toBeVisible();
    await expect(page.getByText(/Azure/).first()).toBeVisible();
  });

  test("la página Contacto tiene formulario y vías alternativas", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /problema/ })).toBeVisible();
    await expect(page.getByLabel(/Nombre/)).toBeVisible();
    await expect(page.getByLabel(/Correo electrónico/)).toBeVisible();
    await expect(page.getByLabel(/Mensaje/)).toBeVisible();
    await expect(page.getByRole("button", { name: /Enviar mensaje/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Otras formas de contactar/ })).toBeVisible();

    // LinkedIn y GitHub pueden aparecer en varios lugares; tomamos el primero visible
    await expect(page.getByRole("link", { name: /LinkedIn/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /GitHub/ }).first()).toBeVisible();
  });

  test("la página Privacidad tiene todas sus secciones", async ({ page }) => {
    await page.goto("/privacidad");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /Datos y cookies/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Responsable/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Qué datos trato/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Tus derechos/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Seguridad/ })).toBeVisible();
  });

  test("el footer tiene todos los enlaces y redes sociales", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();

    const footerLinks = footer.getByRole("link");
    const count = await footerLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);

    await expect(footer.getByRole("link", { name: /GitHub/ })).toBeVisible();
    await expect(footer.getByRole("link", { name: /LinkedIn/ })).toBeVisible();
    await expect(footer.getByRole("link", { name: /Escribir a/ })).toBeVisible();
  });

  test("las imágenes de los proyectos tienen fuente válida", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute("src");
      expect(src).toBeTruthy();
      expect(src).not.toBe("");
    }
  });
});
