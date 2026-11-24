import { test, expect } from "@playwright/test";

const MOBILE = { width: 390, height: 844 };
const MAIN_ROUTES = ["/", "/about", "/como-trabajo", "/skills", "/projects", "/contact", "/privacidad"];

test.describe("Responsive y diseño", () => {
  test("las rutas principales renderizan correctamente en móvil, tablet y desktop", async ({ page }) => {
    const viewports = [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1280, height: 720 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);

      for (const route of MAIN_ROUTES) {
        await page.goto(route);
        await page.waitForLoadState("networkidle");

        await expect(page.getByRole("banner")).toBeVisible();
        await expect(page.getByRole("contentinfo")).toBeVisible();
        await expect(page.getByRole("main")).toBeVisible();

        if (vp.width <= 768) {
          const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
          const windowWidth = await page.evaluate(() => window.innerWidth);
          expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 2);
        }
      }
    }
  });

  test.describe("menú móvil", () => {
    test("se abre y cierra correctamente", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await page.goto("/");

      const menuButton = page.getByRole("button", { name: /Abrir menú/ });
      await expect(menuButton).toBeVisible();

      await menuButton.click();

      // Scope al menú móvil para evitar duplicados con el footer
      const mobileMenu = page.locator("#mobile-menu");
      await expect(mobileMenu.getByRole("link", { name: /Sobre mí/ })).toBeVisible();
      await expect(mobileMenu.getByRole("link", { name: /Proyectos/ })).toBeVisible();
      await expect(mobileMenu.getByRole("link", { name: /Contacto/ })).toBeVisible();

      await mobileMenu.getByRole("link", { name: /Proyectos/ }).click();
      await expect(page).toHaveURL("/projects");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });

    test("se cierra al pulsar Escape", async ({ page }) => {
      await page.setViewportSize(MOBILE);
      await page.goto("/");

      await page.getByRole("button", { name: /Abrir menú/ }).click();
      const mobileMenu = page.locator("#mobile-menu");
      await expect(mobileMenu.getByRole("link", { name: /Sobre mí/ })).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(mobileMenu.getByRole("link", { name: /Sobre mí/ })).toBeHidden();
    });
  });

  test("la cuadrícula de proyectos se adapta al ancho de pantalla", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: /Cuatro productos/ })).toBeVisible();

    await page.setViewportSize(MOBILE);
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: /Cuatro productos/ })).toBeVisible();
  });

  test("la página de detalle de proyecto es usable en móvil", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/projects/bettinganalyzer");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: /El reto/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Qué construí/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /El resultado/ })).toBeVisible();

    await expect(page.getByRole("link", { name: /Ver demo/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Código/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Anterior/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Siguiente/ })).toBeVisible();
  });

  test("el formulario de contacto es usable en móvil", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/contact");

    await expect(page.getByRole("heading", { name: /problema/ })).toBeVisible();
    await expect(page.getByLabel(/Nombre/)).toBeVisible();
    await expect(page.getByLabel(/Correo electrónico/)).toBeVisible();
    await expect(page.getByLabel(/Mensaje/)).toBeVisible();
    await expect(page.getByRole("button", { name: /Enviar mensaje/ })).toBeVisible();
  });
});
