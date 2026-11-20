# Portfolio — Alberto García Ríos

Portfolio personal de Alberto García Ríos, desarrollador full-stack .NET & React.

- **Producción:** <https://albertogrdev.netlify.app/>
- **Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4 y React Router 7.
- **Formulario:** Supabase Edge Function (Deno) + Resend. Sin SDK de Supabase en el navegador.

## Requisitos

- Node.js 22 LTS o superior.
- npm.

## Desarrollo

```bash
npm install
cp .env.example .env   # PowerShell: Copy-Item .env.example .env
npm run dev
```

Rellena `.env` con las variables de la siguiente sección. Sin las variables de
Supabase el sitio funciona, pero el formulario de contacto muestra que el envío
no está disponible.

## Variables de entorno

| Variable                   | Obligatoria | Uso                                                                 |
| -------------------------- | ----------- | ------------------------------------------------------------------- |
| `VITE_SUPABASE_URL`        | Sí          | URL del proyecto de Supabase que atiende el formulario.              |
| `VITE_SUPABASE_ANON_KEY`   | Sí          | Clave pública (`anon`) usada como cabecera del gateway.              |
| `VITE_GA_MEASUREMENT_ID`   | No          | ID de GA4 (`G-XXXXXXXXXX`). Sin él no se carga analítica.            |

Las variables `VITE_*` se incrustan en el bundle durante el build: si cambias
una, vuelve a desplegar. No pongas secretos aquí; la `service_role` solo vive en
los secretos de la Edge Function.

## Scripts

| Script              | Qué hace                                            |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo con HMR.                     |
| `npm run build`     | Comprueba tipos y genera `dist/`.                   |
| `npm run preview`   | Sirve el build de producción en local.              |
| `npm run lint`      | ESLint sobre todo el proyecto.                      |
| `npm run screenshots` | Capturas de las rutas con Playwright.             |

## Formulario de contacto

Flujo: navegador → Edge Function `send-contact-email` → Supabase (tabla
`portfolio.mensajes`) + Resend (aviso por correo). La función guarda y envía de
forma independiente: si falla una parte, la otra se intenta igualmente.

### Puesta en marcha en Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Aplica la migración `supabase/migrations/001_contact_messages_rls.sql` desde
   el SQL Editor o con `npx supabase db push`.
3. Expón el esquema `portfolio` en **Project Settings → API → Exposed schemas**.
   En local, añade `"portfolio"` a `api.schemas` en `supabase/config.toml`.
4. Configura Resend: crea una API key y verifica el dominio remitente. Mientras
   no tengas dominio verificado, `onboarding@resend.dev` solo puede enviar a la
   cuenta propietaria.
5. Despliega la función y define sus secretos:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase functions deploy send-contact-email
npx supabase secrets set \
  RESEND_API_KEY=re_xxxxxxxxx \
  RESEND_TO_EMAIL=tu@correo.com \
  RESEND_FROM_EMAIL="Portfolio <contacto@tudominio.com>" \
  ALLOWED_ORIGIN=https://albertogrdev.netlify.app
```

`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` los inyecta Supabase
automáticamente en la función. `ALLOWED_ORIGIN` acepta varios orígenes separados
por comas; si se omite, CORS queda abierto.

## Despliegue en Netlify

El repositorio está pensado para Netlify:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node:** 22 LTS

`public/_redirects` contiene la regla de SPA (`/* /index.html 200`), necesaria
para que rutas como `/projects/berta` funcionen al entrar directamente. Define
las variables `VITE_*` en **Site configuration → Environment variables** antes
de desplegar.

> Si cambias de hosting, replica la regla de SPA. En GitHub Pages además hay que
> ajustar `base` en Vite y `basename` en el Router.

## Analítica y privacidad

- Google Analytics 4 solo se inicializa en builds de producción
  (`import.meta.env.PROD`) y después de que el usuario acepte el aviso de
  cookies.
- La elección se guarda en `localStorage` con la clave
  `portfolio-analytics-consent`.
- `/privacidad` documenta el tratamiento de datos y el botón **Cookies** del pie
  permite cambiar o retirar el consentimiento. Al retirarlo se borran las
  cookies `_ga`, `_ga_*` y `_gid`.
- Para probar el aviso en local: `localStorage.removeItem("portfolio-analytics-consent")`
  y recarga.

## Estructura

```
src/
  components/   Vistas y piezas de interfaz
  data/         Contenido de proyectos y perfil
  hooks/        Metadatos, scroll, consentimiento
  lib/          Cliente del formulario de contacto
  utils/        Analítica y almacenamiento de consentimiento
supabase/
  functions/send-contact-email/
  migrations/
public/         Fuentes, imágenes, CV, favicon y _redirects
```

## Comprobaciones antes de publicar

```bash
npm run lint
npm run build
```

Después, revisa en producción el formulario real (guarda en Supabase y llega el
correo) y el aviso de cookies en una ventana privada.
