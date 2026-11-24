import { test, expect } from "@playwright/test";

const PUBLIC_ROUTES = [
  { path: "/", name: "Inicio" },
  { path: "/about", name: "Sobre mí" },
  { path: "/como-trabajo", name: "Cómo trabajo" },
  { path: "/skills", name: "Tecnologías" },
  { path: "/projects", name: "Proyectos" },
  { path: "/contact", name: "Contacto" },
  { path: "/privacidad", name: "Privacidad" },
];

const NAV_LABELS = ["Sobre mí", "Cómo trabajo", "Tecnologías", "Proyectos", "Contacto"];

test.describe("Aplicación completa", () => {
  test("carga la homepage y muestra los elementos principales", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);

    await expect(page.locator("h1").first()).toContainText(/Del problema/);
    await expect(page.getByRole("link", { name: /Ver proyectos/ })).toBeVisible();
    await expect(page.locator("a", { hasText: /Cómo trabajo/ }).filter({ visible: true }).first()).toBeVisible();

    // El navbar debe estar presente
    await expect(page.getByRole("banner")).toBeVisible();

    // En móvil los enlaces del navbar están dentro del menú hamburguesa;
    // en desktop/tablet están directamente en el banner.
    const menuButton = page.getByRole("button", { name: /Abrir menú/ });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      const mobileMenu = page.locator("#mobile-menu");
      for (const label of NAV_LABELS) {
        await expect(mobileMenu.getByRole("link", { name: label })).toBeVisible();
      }
    } else {
      const navbar = page.getByRole("banner");
      for (const label of NAV_LABELS) {
        await expect(navbar.getByRole("link", { name: label })).toBeVisible();
      }
    }

    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("cada ruta pública renderiza sin errores", async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
    }
  });

  test("no muestra errores de JavaScript en consola al navegar por las rutas principales", async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);
    }

    expect(consoleErrors, `Errores de consola: ${JSON.stringify(consoleErrors, null, 2)}`).toEqual([]);
    expect(pageErrors, `Errores de página: ${JSON.stringify(pageErrors, null, 2)}`).toEqual([]);
  });

  test("no tiene peticiones HTTP fallidas (4xx/5xx) en las rutas principales", async ({ page }) => {
    const failedRequests: string[] = [];

    page.on("response", (response) => {
      if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
    });

    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");
    }

    expect(failedRequests, `Peticiones fallidas: ${JSON.stringify(failedRequests, null, 2)}`).toEqual([]);
  });

  test("el menú de navegación funciona y cambia la URL", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // En móvil abrir el menú hamburguesa para acceder a los enlaces del navbar
    const menuButton = page.getByRole("button", { name: /Abrir menú/ });
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }

    const mobileMenu = page.locator("#mobile-menu");
    const navbarLinks = await menuButton.isVisible()
      ? mobileMenu.getByRole("link")
      : page.getByRole("banner").getByRole("link");

    await navbarLinks.filter({ hasText: /Sobre mí/ }).first().click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { name: /Ocho años/ })).toBeVisible();

    // Volver a inicio para seguir navegando
    await page.goto("/");
    if (await menuButton.isVisible()) await menuButton.click();

    const links = await menuButton.isVisible()
      ? mobileMenu.getByRole("link")
      : page.getByRole("banner").getByRole("link");

    await links.filter({ hasText: /Proyectos/ }).first().click();
    await expect(page).toHaveURL("/projects");
    await expect(page.getByRole("heading", { name: /Cuatro productos/ })).toBeVisible();

    await page.goto("/");
    if (await menuButton.isVisible()) await menuButton.click();

    const links2 = await menuButton.isVisible()
      ? mobileMenu.getByRole("link")
      : page.getByRole("banner").getByRole("link");

    await links2.filter({ hasText: /Contacto/ }).first().click();
    await expect(page).toHaveURL("/contact");
    await expect(page.getByRole("heading", { name: /problema/ })).toBeVisible();
  });

  test("el enlace antiguo /process redirige a /como-trabajo", async ({ page }) => {
    await page.goto("/process");
    await expect(page).toHaveURL("/como-trabajo");
    await expect(page.getByRole("heading", { name: /Así convierto/ })).toBeVisible();
  });

  test("muestra la página 404 para rutas inexistentes", async ({ page }) => {
    await page.goto("/esta-ruta-no-existe-12345");
    await expect(page.getByRole("heading", { name: /Esta página no existe/ })).toBeVisible();
    await expect(page.getByText(/Error 404/)).toBeVisible();
  });

  test("el logotipo del navbar lleva al inicio", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: /Alberto García Ríos, inicio/ }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: /Del problema/ })).toBeVisible();
  });
});
