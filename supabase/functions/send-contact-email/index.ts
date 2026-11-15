// supabase/functions/send-contact-email/index.ts
//
// Recibe el formulario de contacto, lo guarda en Supabase y notifica por email.
// Ambas acciones son independientes a propósito: si una falla, la otra se
// intenta igualmente para no perder el mensaje. Solo se devuelve error cuando
// las dos fallan. El navegador ya no habla directamente con PostgREST ni carga
// el SDK de Supabase: todo pasa por esta función.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const MAX_BODY_CHARS = 20_000;
const LIMITS = { nombre: 100, email: 254, mensaje: 5_000 } as const;
const RATE_LIMIT_WINDOW_MS = 60_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUPABASE_BASE = Deno.env.get("SUPABASE_URL")?.replace(/\/+$/, "");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_TO_EMAIL = Deno.env.get("RESEND_TO_EMAIL");
const RESEND_FROM_EMAIL =
  Deno.env.get("RESEND_FROM_EMAIL") ??
  "Portfolio Contact <onboarding@resend.dev>";

function corsHeaders(origin: string | null): Record<string, string> {
  // Por defecto abierto para no romper el formulario. Si defines ALLOWED_ORIGIN
  // (separado por comas) se restringe a esos orígenes.
  const configured = Deno.env.get("ALLOWED_ORIGIN");
  let allowOrigin = "*";

  if (configured && configured !== "*") {
    const allowed = configured
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    allowOrigin = origin && allowed.includes(origin) ? origin : (allowed[0] ?? "*");
  }

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

/** Evita inyección de HTML en el cuerpo del correo. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

type SaveResult = { ok: true } | { ok: false; error: string };

/** Inserta el mensaje con service_role (omite RLS, nunca está en el frontend). */
async function saveMessage(row: {
  nombre: string;
  email: string;
  mensaje: string;
}): Promise<SaveResult> {
  if (!SUPABASE_BASE || !SERVICE_ROLE_KEY) {
    return {
      ok: false,
      error: "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY",
    };
  }

  try {
    const response = await fetch(`${SUPABASE_BASE}/rest/v1/mensajes`, {
      method: "POST",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Content-Profile": "portfolio",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ...row, leido: false }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return { ok: false, error: `PostgREST ${response.status}: ${detail}` };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/** Límite real en servidor: un mensaje por minuto y email. */
async function isRateLimited(email: string): Promise<boolean> {
  if (!SUPABASE_BASE || !SERVICE_ROLE_KEY) return false;

  try {
    const url = new URL(`${SUPABASE_BASE}/rest/v1/mensajes`);
    url.searchParams.set("email", `eq.${email}`);
    url.searchParams.set(
      "created_at",
      `gte.${new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()}`,
    );
    url.searchParams.set("select", "id");
    url.searchParams.set("limit", "1");

    const response = await fetch(url, {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Accept-Profile": "portfolio",
      },
    });

    if (!response.ok) return false;

    const rows: unknown = await response.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch {
    // Si la comprobación falla no bloqueamos un envío legítimo.
    return false;
  }
}

async function sendEmail(data: {
  nombre: string;
  email: string;
  mensaje: string;
}): Promise<boolean> {
  if (!RESEND_API_KEY || !RESEND_TO_EMAIL) {
    console.error("Faltan RESEND_API_KEY o RESEND_TO_EMAIL");
    return false;
  }

  const resend = new Resend(RESEND_API_KEY);
  const nombreSeguro = escapeHtml(data.nombre);
  const emailSeguro = escapeHtml(data.email);
  const mensajeSeguro = escapeHtml(data.mensaje);
  const asunto = `Nuevo mensaje de contacto: ${data.nombre.replace(/[\r\n]+/g, " ")}`;

  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [RESEND_TO_EMAIL],
      reply_to: data.email,
      subject: asunto,
      text: [
        "Nuevo mensaje de contacto",
        "",
        `Nombre: ${data.nombre}`,
        `Email: ${data.email}`,
        "",
        data.mensaje,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${nombreSeguro}</p>
          <p><strong>Email:</strong> ${emailSeguro}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${mensajeSeguro}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">Enviado desde tu portafolio</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", JSON.stringify(error));
      return false;
    }

    return true;
  } catch (error) {
    // Un fallo del SDK no debe invalidar un mensaje ya guardado en Supabase.
    console.error(
      "Excepción al enviar el email:",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));
  const respond = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return respond({ error: "Método no permitido" }, 405);
  }

  try {
    const raw = await req.text();

    if (raw.length > MAX_BODY_CHARS) {
      return respond({ error: "El mensaje es demasiado largo" }, 413);
    }

    let payload: unknown;

    try {
      payload = JSON.parse(raw);
    } catch {
      return respond({ error: "JSON inválido" }, 400);
    }

    const body =
      payload && typeof payload === "object"
        ? (payload as Record<string, unknown>)
        : {};

    // Honeypot: los bots rellenan el campo oculto. Respondemos éxito falso para
    // no darles pistas, pero no guardamos ni enviamos nada.
    if (asText(body.hp) !== "") {
      return respond({ success: true, saved: false, emailed: false });
    }

    const nombre = asText(body.nombre);
    const email = asText(body.email);
    const mensaje = asText(body.mensaje);

    if (!nombre || !email || !mensaje) {
      return respond(
        { error: "Faltan campos requeridos: nombre, email, mensaje" },
        400,
      );
    }

    if (
      nombre.length > LIMITS.nombre ||
      email.length > LIMITS.email ||
      mensaje.length > LIMITS.mensaje
    ) {
      return respond({ error: "Alguno de los campos supera el tamaño máximo" }, 400);
    }

    if (!EMAIL_PATTERN.test(email)) {
      return respond({ error: "El email no tiene un formato válido" }, 400);
    }

    if (await isRateLimited(email)) {
      return respond(
        { error: "Demasiados envíos seguidos. Inténtalo de nuevo en un minuto." },
        429,
      );
    }

    // Guardado y email son best-effort independientes: el mensaje no se pierde
    // si falla una de las dos partes.
    const saved = await saveMessage({ nombre, email, mensaje });
    if (!saved.ok) {
      console.error("No se pudo guardar el mensaje en Supabase:", saved.error);
    }

    const emailed = await sendEmail({ nombre, email, mensaje });

    if (!saved.ok && !emailed) {
      return respond(
        { error: "No se pudo guardar ni enviar el mensaje" },
        500,
      );
    }

    return respond({ success: true, saved: saved.ok, emailed });
  } catch (error) {
    // No se devuelven detalles internos al cliente.
    console.error(
      "Error no controlado en send-contact-email:",
      error instanceof Error ? error.message : error,
    );
    return respond({ error: "Error interno del servidor" }, 500);
  }
});
