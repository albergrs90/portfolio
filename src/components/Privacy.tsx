import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { CONTAINER } from "./ui";
import { PROFILE } from "../data/about";
import { usePageMeta } from "../hooks/usePageMeta";

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) => (
  <section aria-labelledby={id}>
    <h2 id={id} className="font-display text-2xl text-ink">
      {title}
    </h2>
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
      {children}
    </div>
  </section>
);

export const Privacy = () => {
  usePageMeta(
    "Privacidad · Alberto García Ríos",
    "Información sobre el tratamiento de datos personales, cookies analíticas y servicios externos utilizados en el portfolio de Alberto García Ríos.",
  );

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <PageHeader
        index="06"
        label="Privacidad"
        title={
          <>
            Datos y <span className="italic">cookies</span>.
          </>
        }
        description="Qué datos recibo, para qué los uso, quién los procesa y cómo puedes cambiar tu elección sobre las cookies analíticas."
      />

      <div className={CONTAINER}>
        <div className="max-w-3xl space-y-10 pt-14">
          <Section id="responsable" title="Responsable">
            <p>
              Alberto García Ríos, con domicilio en Sevilla, España. Puedes
              escribirme a{" "}
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-ink underline underline-offset-2 transition-colors hover:text-white"
              >
                {PROFILE.email}
              </a>
              .
            </p>
          </Section>

          <Section id="datos" title="Qué datos trato">
            <p>
              Los que envías en el formulario de contacto: nombre, correo
              electrónico y mensaje. También los datos técnicos que los
              proveedores de alojamiento y seguridad registran al acceder al
              sitio, como la dirección IP o el agente de usuario.
            </p>
          </Section>

          <Section id="finalidad" title="Para qué y con qué base">
            <p>
              Uso tus datos únicamente para responder a tu consulta y, si
              procede, mantener el contacto profesional. La base jurídica es tu
              consentimiento al enviar el formulario. No los utilizo para
              marketing ni los vendo.
            </p>
          </Section>

          <Section id="conservacion" title="Cuánto tiempo">
            <p>
              Conservo los mensajes hasta 12 meses desde el último contacto,
              salvo que solicites su supresión antes.
            </p>
          </Section>

          <Section id="destinatarios" title="Quién los procesa">
            <p>
              El sitio se aloja en Netlify. El formulario guarda los mensajes en
              Supabase y los envía por correo mediante Resend. Estos proveedores
              actúan como encargados del tratamiento y solo acceden a los datos
              necesarios para prestar el servicio. No se ceden a terceros con
              otras finalidades.
            </p>
          </Section>

          <Section id="cookies" title="Cookies y servicios externos">
            <p>
              Google Analytics 4 solo se carga si aceptas las cookies
              analíticas. Puedes cambiar tu elección con el botón «Cookies» del
              pie de página. El mapa de Google se carga únicamente al pulsar
              «Abrir mapa» y puede instalar cookies de Google. El resto del
              sitio no usa cookies propias; solo guardo en el almacenamiento
              local del navegador tu elección de consentimiento.
            </p>
          </Section>

          <Section id="derechos" title="Tus derechos">
            <p>
              Puedes solicitar el acceso, la rectificación, la supresión, la
              oposición, la limitación del tratamiento o la portabilidad de tus
              datos escribiendo a{" "}
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-ink underline underline-offset-2 transition-colors hover:text-white"
              >
                {PROFILE.email}
              </a>
              . También puedes presentar una reclamación ante la Agencia
              Española de Protección de Datos en{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 transition-colors hover:text-white"
              >
                www.aepd.es
              </a>
              .
            </p>
          </Section>

          <Section id="seguridad" title="Seguridad">
            <p>
              El formulario envía los datos por HTTPS y la base de datos
              restringe el acceso público. Ningún sistema es infalible, pero
              aplico medidas razonables para proteger la información.
            </p>
          </Section>

          <p className="border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Última actualización: noviembre de 2026
          </p>
        </div>
      </div>
    </div>
  );
};
