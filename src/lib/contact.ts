// Cliente mínimo del formulario de contacto.
//
// Deliberadamente NO usa @supabase/supabase-js: el guardado en base de datos y
// el envío del correo los hace la Edge Function `send-contact-email`. Así el
// SDK (~40 KB gzip) no viaja al navegador y las credenciales de escritura
// (service_role) nunca salen del servidor.

export interface ContactPayload {
  nombre: string;
  email: string;
  mensaje: string;
  /** Honeypot: debe ir vacío. */
  hp?: string;
}

export type ContactFailureReason =
  | "config"
  | "rate-limit"
  | "validation"
  | "network"
  | "server";

export type ContactResult =
  | { ok: true; saved: boolean; emailed: boolean }
  | { ok: false; reason: ContactFailureReason };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const TIMEOUT_MS = 15_000;

const ENDPOINT = SUPABASE_URL
  ? `${SUPABASE_URL.replace(/\/+$/, "")}/functions/v1/send-contact-email`
  : null;

/**
 * La anon key es pública por diseño y aquí solo actúa como cabecera de gateway,
 * para que el formulario funcione aunque la función tenga verify_jwt activo.
 * La escritura la hace service_role dentro de la función, nunca el navegador.
 */
function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (SUPABASE_ANON_KEY) {
    headers.apikey = SUPABASE_ANON_KEY;
    headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
  }

  return headers;
}

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (!ENDPOINT) {
    return { ok: false, reason: "config" };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (response.status === 429) {
      return { ok: false, reason: "rate-limit" };
    }

    if (response.status === 400 || response.status === 413) {
      return { ok: false, reason: "validation" };
    }

    if (!response.ok) {
      return { ok: false, reason: "server" };
    }

    const data = (await response.json().catch(() => ({}))) as {
      saved?: unknown;
      emailed?: unknown;
    };

    return {
      ok: true,
      saved: data.saved === true,
      emailed: data.emailed === true,
    };
  } catch {
    return { ok: false, reason: "network" };
  }
}
