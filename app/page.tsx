import type { Metadata } from "next";
import Link from "next/link";
import UserCounter from "@/components/UserCounter";
import { SITE_URL, REGISTER_URL, absUrl } from "@/utils/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Fuente única del FAQ: de acá salen tanto el acordeón visible como el
 * schema FAQPage, así el texto no puede desincronizarse (requisito de GEO).
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: "¿Qué es Sponsorship?",
    a: "Una plataforma argentina que conecta marcas con creadores de contenido, influencers, figuras públicas y páginas de redes sociales para gestionar campañas de publicidad de punta a punta: descubrimiento, negociación, contrato y pago.",
  },
  {
    q: "¿Sponsorship es gratis?",
    a: "Usarla no tiene costo de suscripción por ahora. Se cobra una comisión del 5% sobre el monto de cada campaña, que se muestra antes de confirmar el pago.",
  },
  {
    q: "¿Cómo cobran los creadores?",
    a: "Vinculan su cuenta de Mercado Pago una vez. Cada pago aprobado se acredita directo ahí — Sponsorship no administra ni retiene el dinero.",
  },
  {
    q: "¿Sponsorship funciona como un escrow que retiene mi plata?",
    a: "No. El dinero va directo de quien paga a la cuenta de Mercado Pago de quien cobra. En pago por publicación, el cobro se dispara cuando ambas partes aprueban el contenido.",
  },
  {
    q: "¿Qué comisión cobra Sponsorship?",
    a: "5% sobre el monto de la campaña, siempre en pesos argentinos.",
  },
  {
    q: "¿Necesito tener Mercado Pago?",
    a: "Sí, hoy es el único medio de pago dentro de la plataforma, tanto para pagar como para cobrar.",
  },
  {
    q: "¿Sponsorship reemplaza a mi agencia o representante?",
    a: "No. Da la infraestructura para negociar, contratar y cobrar — cada usuario decide con quién trabaja y en qué condiciones.",
  },
  {
    q: "¿Qué tipo de creadores hay en la plataforma?",
    a: "Influencers, figuras públicas, páginas de redes sociales y creadores de contenido UGC.",
  },
  {
    q: "¿Cómo sé si un creador o una marca cumple lo pactado?",
    a: "Cada perfil tiene una reputación pública con calificaciones de campañas anteriores, visible antes de negociar.",
  },
  {
    q: "¿Hay planes pagos?",
    a: "Por ahora usar Sponsorship no tiene costo de suscripción. Estamos preparando planes con herramientas adicionales — próximamente.",
  },
  {
    q: "¿Funciona fuera de Argentina?",
    a: "Hoy está pensada para el mercado argentino: los pagos se procesan en pesos vía Mercado Pago Argentina.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Sponsorship",
      url: `${SITE_URL}/`,
      areaServed: "AR",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Sponsorship",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-AR",
    },
    {
      "@type": "SoftwareApplication",
      name: "Sponsorship",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.sponsorship.com.ar/",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "ARS",
        description:
          "Sin costo de suscripción por ahora; comisión del 5% sobre el monto de cada campaña.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      inLanguage: "es-AR",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="container" role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- 1. HERO ---------- */}
      <section className="section" aria-labelledby="hero-title">
        <div className="section-head">
          <p className="eyebrow">Ya disponible</p>
          <h1 id="hero-title" className="title">
            Formalizá campañas con creadores.{" "}
            <span className="gold">Cobrá por Mercado Pago.</span> Sin WhatsApp
            perdido ni Excel.
          </h1>
          <p className="subtitle">
            Sponsorship conecta marcas y creadores de contenido en Argentina para
            negociar, contratar y cobrar campañas de publicidad en un solo lugar.
          </p>

          <div className="row" style={{ marginTop: 18 }}>
            <a className="btn btn-lg" href={REGISTER_URL}>
              Crear mi perfil
            </a>
            <Link className="btn-quiet" href="#como-funciona">
              Ver cómo funciona
            </Link>
          </div>

          <UserCounter />
        </div>

        <div className="grid three" style={{ marginTop: 24 }}>
          <article className="card">
            <h3 className="title gold" style={{ fontSize: 28, margin: 0 }}>5%</h3>
            <p className="muted">De comisión, visible antes de confirmar el pago.</p>
          </article>
          <article className="card">
            <h3 className="title gold" style={{ fontSize: 28, margin: 0 }}>ARS</h3>
            <p className="muted">Todo en pesos argentinos, vía Mercado Pago.</p>
          </article>
          <article className="card">
            <h3 className="title gold" style={{ fontSize: 28, margin: 0 }}>0</h3>
            <p className="muted">Sponsorship no retiene tu dinero en ningún momento.</p>
          </article>
        </div>
      </section>

      {/* ---------- 2. CÓMO FUNCIONA ---------- */}
      <section className="section" id="como-funciona" aria-labelledby="flow-title">
        <div className="section-head">
          <p className="eyebrow">Cómo funciona</p>
          <h2 id="flow-title" className="title">
            De encontrar el perfil a cobrar la campaña, en cuatro pasos
          </h2>
        </div>

        <div className="steps">
          <ol>
            <li>
              <strong>Explorás y negociás.</strong> Filtrás perfiles por rubro,
              chateás y cerrás condiciones con contraofertas dentro de la plataforma.
            </li>
            <li>
              <strong>Formalizás el contrato.</strong> Cuando ambas partes aceptan,
              el contrato queda generado con los términos acordados.
            </li>
            <li>
              <strong>Seguimiento y publicación.</strong> El creador sube el link de
              lo publicado, la marca lo revisa y aprueba.
            </li>
            <li>
              <strong>Cobrás por Mercado Pago.</strong> En pago por publicación, el
              cobro se libera automáticamente al aprobarse cada entrega. En pago
              único, se abona el 100% al aceptar el contrato. Al cerrar la campaña,
              ambas partes se califican.
            </li>
          </ol>
        </div>
      </section>

      {/* ---------- 3 + 4. MARCAS / CREADORES ---------- */}
      <section className="section" aria-labelledby="aud-title">
        <div className="section-head">
          <h2 id="aud-title" className="title">Dos lados, la misma infraestructura</h2>
          <p className="subtitle">
            Tu agencia sos vos: Sponsorship pone las herramientas, vos decidís con
            quién trabajás.
          </p>
        </div>

        <div className="grid two">
          <article className="card">
            <h3>Para marcas</h3>
            <ul className="bullets">
              <li>Encontrá creadores reales filtrando por rubro, no por rumores de DM.</li>
              <li>
                Negociá con contraofertas y dejá todo asentado en un contrato, no en
                una captura de WhatsApp.
              </li>
              <li>Vas a ver la comisión antes de confirmar el pago — sin letra chica.</li>
              <li>Elegís pagar todo junto o por cada publicación aprobada.</li>
            </ul>
            <p style={{ marginTop: 16 }}>
              <a className="btn" href={REGISTER_URL}>Crear mi perfil</a>
            </p>
          </article>

          <article className="card">
            <h3>Para creadores</h3>
            <ul className="bullets">
              <li>Vinculás tu Mercado Pago una sola vez y cobrás directo a tu cuenta.</li>
              <li>Negociás tus condiciones con contraofertas, no con «después vemos».</li>
              <li>
                En pago por publicación, cobrás automáticamente cuando la marca
                aprueba tu entrega.
              </li>
              <li>Construís una reputación pública con cada campaña finalizada.</li>
            </ul>
            <p style={{ marginTop: 16 }}>
              <a className="btn" href={REGISTER_URL}>Crear mi perfil</a>
            </p>
          </article>
        </div>
      </section>

      {/* ---------- 5. PAGOS Y TRANSPARENCIA ---------- */}
      <section className="section" id="pagos" aria-labelledby="pay-title">
        <div className="section-head">
          <p className="eyebrow">Pagos y transparencia</p>
          <h2 id="pay-title" className="title">¿Cómo funciona el pago?</h2>
          <p className="subtitle">
            Sponsorship usa Mercado Pago para todos los cobros, en pesos argentinos.
            Antes de pagar, ves con claridad cuánto es la comisión de la plataforma
            (5%) y cuánto recibe el creador — sin sorpresas. En campañas con pago por
            publicación, el cobro se dispara automáticamente recién cuando la marca
            aprueba lo publicado. Sponsorship no retiene tu dinero en ningún momento:
            va directo a la cuenta de Mercado Pago de quien cobra.
          </p>
        </div>

        <div className="grid three">
          <article className="card">
            <h3>Pago único</h3>
            <p className="muted">
              Se abona el 100% al aceptar el contrato. Sirve para campañas cortas o de
              una sola entrega.
            </p>
          </article>
          <article className="card">
            <h3>Pago por publicación</h3>
            <p className="muted">
              El cobro se dispara recién cuando la marca aprueba cada publicación
              entregada. Es la modalidad que da una protección real y verificable para
              ambos lados.
            </p>
          </article>
          <article className="card">
            <h3>Comisión del 5%</h3>
            <p className="muted">
              Se muestra en vivo antes de confirmar, junto con el neto que recibe el
              creador. Siempre en pesos argentinos.
            </p>
          </article>
        </div>
      </section>

      {/* ---------- 7. REPUTACIÓN ---------- */}
      <section className="section" aria-labelledby="rep-title">
        <div className="section-head">
          <p className="eyebrow">Reputación</p>
          <h2 id="rep-title" className="title">
            La confianza se construye con campañas cerradas, no con promesas
          </h2>
          <p className="subtitle">
            Al finalizar cada campaña, la marca y el creador se califican mutuamente.
            Esa calificación queda en el perfil público y es visible antes de empezar a
            negociar, así cada parte decide con información concreta.
          </p>
        </div>

        <div className="grid three">
          <article className="feature">
            <h3>Calificación de las dos partes</h3>
            <p className="muted">
              Marca y creador se puntúan al cerrar la campaña. Nadie construye
              reputación de un solo lado.
            </p>
          </article>
          <article className="feature">
            <h3>Historial visible</h3>
            <p className="muted">
              El perfil muestra las campañas finalizadas y sus calificaciones antes de
              que abras una negociación.
            </p>
          </article>
          <article className="feature">
            <h3>Sin números inflados</h3>
            <p className="muted">
              La reputación sale de campañas que efectivamente pasaron por la
              plataforma.
            </p>
          </article>
        </div>
      </section>

      {/* ---------- 8. FAQ ---------- */}
      <section className="section" id="faq" aria-labelledby="faq-title">
        <div className="section-head">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-title" className="title">
            Todo lo que conviene saber antes de empezar
          </h2>
        </div>

        <div className="accordion">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- 9. CTA FINAL ---------- */}
      <section className="section">
        <div className="cta-band">
          <h2 className="title">Empezá tu primera campaña hoy</h2>
          <p className="subtitle">
            Crear la cuenta no tiene costo. Vas a poder explorar perfiles, negociar
            condiciones y formalizar el contrato desde el primer día.
          </p>
          <div className="actions">
            <a className="btn btn-lg" href={REGISTER_URL}>
              Crear mi perfil
            </a>
          </div>
        </div>
      </section>

      <link rel="canonical" href={absUrl("/")} />
    </main>
  );
}
