import { createClient } from "@supabase/supabase-js";

// Solo se expone la clave pública (anon) en el frontend. Nunca se incluye
// una clave service_role: omite RLS y otorga acceso administrativo total.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan las variables de entorno de Supabase: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: "portfolio" },
});