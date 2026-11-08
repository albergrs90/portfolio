-- Habilita Row Level Security (RLS) en la tabla de mensajes de contacto y
-- restringe el acceso: solo se permite INSERT desde el rol `anon`
-- (formulario público de contacto). No se expone SELECT/UPDATE/DELETE al
-- público. El rol service_role omite RLS y solo debe usarse en entornos de
-- servidor de confianza; nunca se incluye en el frontend.

-- Asegurar el esquema (idempotente)
CREATE SCHEMA IF NOT EXISTS portfolio;

-- Tabla de mensajes (idempotente: no falla si ya existe)
CREATE TABLE IF NOT EXISTS portfolio.mensajes (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre text NOT NULL,
  email text NOT NULL,
  mensaje text NOT NULL,
  leido boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE portfolio.mensajes ENABLE ROW LEVEL SECURITY;

-- Política: solo INSERT desde el rol anon (formulario público de contacto)
DROP POLICY IF EXISTS "contact_form_insert_anon" ON portfolio.mensajes;
CREATE POLICY "contact_form_insert_anon"
  ON portfolio.mensajes
  FOR INSERT
  TO anon
  WITH CHECK (true);
