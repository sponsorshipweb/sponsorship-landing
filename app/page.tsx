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
 *
 * `more` es sólo visual: amplía la respuesta con un artículo del blog sin
 * entrar en el JSON-LD, para que lo marcado siga siendo exactamente lo que
 * se lee en pantalla.
 */
const FAQ: { q: string; a: string; more?: { label: string; href: string } }[] = [
  {
    q: "¿Qué es Sponsorship?",
    a: "Una plataforma argentina que conecta marcas con influencers, figuras públicas y creadores de contenido UGC para gestionar campañas de publicidad de punta a punta: descubrimiento, negociación, contrato y pago por Mercado Pago.",
    more: { label: "Cómo empezar, paso a paso", href: "/blog/como-empezar-en-sponsorship" },
  },
  {
    q: "¿Cuánto cuesta usar Sponsorship?",
    a: "Crear la cuenta y usar la plataforma no tiene costo de suscripción por ahora. Se cobra una comisión del 5% sobre el monto de cada campaña. Aparte de eso, Mercado Pago aplica su propio costo de procesamiento, que varía según la velocidad de acreditación. Los dos conceptos se muestran antes de confirmar el pago.",
    more: {
      label: "El detalle de las dos comisiones",
      href: "/blog/comisiones-en-marketing-de-influencers-argentina",
    },
  },
  {
    q: "¿Sponsorship retiene mi dinero?",
    a: "No. El pago va directo de la cuenta de Mercado Pago de quien paga a la de quien cobra. La plataforma no administra ni retiene esos fondos en ningún momento: no hay una cuenta intermedia donde la plata espere.",
  },
  {
    q: "¿Cómo y cuándo cobra un creador?",
    a: "Vinculás tu cuenta de Mercado Pago una sola vez. Si la campaña es de pago único, cobrás el 100% al aceptar el contrato. Si es de pago por publicación, cobrás automáticamente cuando la marca aprueba cada entrega. Los tiempos de acreditación son los que aplique Mercado Pago a tu cuenta.",
    more: {
      label: "Cómo cobrar con Mercado Pago",
      href: "/blog/como-cobrar-campanas-con-mercado-pago",
    },
  },
  {
    q: "¿Qué pasa si la otra parte no cumple?",
    a: "El orden de los pasos es la protección: en pago por publicación, el cobro de cada entrega se genera recién cuando esa publicación fue confirmada, y no se avanza con entregas nuevas si quedó una confirmada sin pagar. Todo lo acordado queda registrado en el contrato, no en un chat que se puede borrar.",
    more: { label: "Qué pasa si una marca no paga", href: "/blog/que-pasa-si-una-marca-no-paga" },
  },
  {
    q: "¿Necesito tener muchos seguidores para registrarme?",
    a: "No. Los creadores UGC producen contenido para que la marca lo publique en sus propios canales, así que no necesitan audiencia propia. Y para influencers, el match con el rubro de la marca suele pesar más que el número bruto de seguidores.",
    more: { label: "Qué es el contenido UGC", href: "/blog/que-es-el-contenido-ugc" },
  },
  {
    q: "¿Necesito tener Mercado Pago?",
    a: "Sí, hoy es el único medio de pago dentro de la plataforma, tanto para pagar como para cobrar. Todos los contratos se pactan y se cobran en pesos argentinos.",
  },
  {
    q: "¿Cómo sé si un creador o una marca cumple lo pactado?",
    a: "Cada perfil tiene una reputación pública construida con las calificaciones de campañas anteriores, visible antes de empezar a negociar. Al cerrar cada campaña, ambas partes se califican.",
    more: {
      label: "Cómo se construye una reputación verificable",
      href: "/blog/como-construir-reputacion-verificable-como-creador",
    },
  },
  {
    q: "¿Qué tipo de creadores hay en la plataforma?",
    a: "Influencers, figuras públicas —deportistas, periodistas, músicos, actores—, páginas de redes sociales y creadores de contenido UGC. Cada uno es una categoría propia, con su tipo de campaña y su forma de cotizar.",
    more: {
      label: "UGC vs. influencer marketing",
      href: "/blog/ugc-vs-influencer-marketing",
    },
  },
  {
    q: "¿Sponsorship reemplaza a mi agencia o representante?",
    a: "No necesariamente. Da la infraestructura para negociar, contratar y cobrar de forma directa, pero nunca negocia en nombre de nadie. Podés gestionar algunos acuerdos por tu cuenta y otros a través de tu agencia.",
    more: {
      label: "Sponsorship vs. una agencia de influencers",
      href: "/blog/sponsorship-vs-agencia-de-influencers",
    },
  },
  {
    q: "¿Hay planes pagos?",
    a: "Por ahora no: usar la plataforma no tiene costo de suscripción. Estamos preparando planes con herramientas adicionales, y cuando existan el porcentaje de comisión va a depender del plan contratado. Se van a anunciar en el blog antes de activarse.",
    more: { label: "Qué se viene en el roadmap", href: "/blog/roadmap-lanzamientos" },
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
      url: "https://sponsorship.com.ar/",
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
          <p className="eyebrow">Ya disponible en Argentina</p>
          <h1 id="hero-title" className="title">
            Cerrá campañas con contrato.{" "}
            <span className="gold">Cobrá por Mercado Pago.</span>
          </h1>
          <p className="subtitle">
            El acuerdo deja de vivir en un chat: negociás con contraofertas,
            firmás un contrato con lo pactado y el pago se libera cuando la
            entrega está aprobada.
          </p>

          <div className="row" style={{ marginTop: 18 }}>
            <a className="btn btn-lg" href={REGISTER_URL}>
              Crear mi cuenta gratis
            </a>
            <Link className="btn-quiet" href="#como-funciona">
              Ver cómo funciona
            </Link>
          </div>

          <UserCounter />
        </div>

        <div className="grid three reveal" style={{ marginTop: 24 }}>
          <article className="card stat">
            <span className="stat-value">$0</span>
            <span className="stat-label">
              Crear tu cuenta y usar la plataforma no tiene costo de suscripción.
            </span>
          </article>
          <article className="card stat">
            <span className="stat-value">5%</span>
            <span className="stat-label">
              De comisión sobre la campaña, visible antes de confirmar el pago.
            </span>
          </article>
          <article className="card stat">
            <span className="stat-value is-word">Directo</span>
            <span className="stat-label">
              El pago va de una cuenta de Mercado Pago a la otra, en pesos.
            </span>
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

        <div className="steps reveal">
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

        <p className="muted" style={{ marginTop: 18 }}>
          <Link href="/blog/como-usar-sponsorship">
            Ver el flujo completo, paso a paso →
          </Link>
        </p>
      </section>

      {/* ---------- 3 + 4. MARCAS / CREADORES ---------- */}
      <section className="section section-tint" aria-labelledby="aud-title">
        <div className="section-head">
          <h2 id="aud-title" className="title">Dos lados, la misma infraestructura</h2>
          <p className="subtitle">
            Tu agencia sos vos: Sponsorship pone las herramientas, vos decidís con
            quién trabajás.
          </p>
        </div>

        <div className="grid two reveal">
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
              <a className="btn" href={REGISTER_URL}>Crear cuenta de marca</a>
            </p>
            <p className="tiny muted" style={{ marginTop: 10 }}>
              <Link href="/blog/pilar/marcas">Guías para marcas →</Link>
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
              <a className="btn" href={REGISTER_URL}>Crear cuenta de creador</a>
            </p>
            <p className="tiny muted" style={{ marginTop: 10 }}>
              <Link href="/blog/pilar/influencers">Guías para creadores →</Link>
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
            Todos los cobros salen por Mercado Pago, en pesos argentinos. Antes de
            confirmar vas a ver la comisión de la plataforma y el neto que recibe el
            creador. Sponsorship no retiene ese dinero en ningún momento: va directo
            de una cuenta a la otra.
          </p>
        </div>

        <div className="grid three reveal">
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
              Se muestra en vivo antes de confirmar, junto con el costo de
              procesamiento de Mercado Pago y el neto que recibe el creador.
            </p>
          </article>
        </div>
      </section>

      {/* ---------- 7. REPUTACIÓN ---------- */}
      <section className="section section-tint" aria-labelledby="rep-title">
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

        <div className="grid three reveal">
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
              {f.more && (
                <p className="faq-more">
                  <Link href={f.more.href}>{f.more.label} →</Link>
                </p>
              )}
            </details>
          ))}
        </div>
      </section>

      {/* ---------- 9. SEGUIR APRENDIENDO ---------- */}
      <section className="section" id="novedades" aria-labelledby="learn-title">
        <div className="section-head">
          <p className="eyebrow">Novedades y guías</p>
          <h2 id="learn-title" className="title">
            ¿Querés entender el proyecto antes de crear tu cuenta?
          </h2>
          <p className="subtitle">
            Publicamos todo en el blog: cómo funciona cada parte del producto, qué
            estamos construyendo y guías concretas para los dos lados de una campaña.
          </p>
        </div>

        <div className="grid three reveal">
          <article className="feature">
            <h3>
              <Link href="/blog/como-empezar-en-sponsorship">Cómo empezar</Link>
            </h3>
            <p className="muted">
              Qué necesitás para crear la cuenta, vincular Mercado Pago y cerrar tu
              primera campaña.
            </p>
          </article>
          <article className="feature">
            <h3>
              <Link href="/blog/roadmap-lanzamientos">Qué se viene</Link>
            </h3>
            <p className="muted">
              El roadmap público: qué funciona hoy, qué estamos construyendo y cómo
              priorizamos.
            </p>
          </article>
          <article className="feature">
            <h3>
              <Link href="/blog">Todas las guías</Link>
            </h3>
            <p className="muted">
              Para marcas, influencers, figuras públicas y creadores UGC, más pagos,
              contratos y comparativas.
            </p>
          </article>
        </div>
      </section>

      {/* ---------- 10. CTA FINAL ---------- */}
      <section className="section">
        <div className="cta-band">
          <h2 className="title">Empezá tu primera campaña hoy</h2>
          <p className="subtitle">
            Crear la cuenta no tiene costo. Vas a poder explorar perfiles, negociar
            condiciones y formalizar el contrato desde el primer día.
          </p>
          <div className="actions">
            <a className="btn btn-lg" href={REGISTER_URL}>
              Crear mi cuenta gratis
            </a>
          </div>
        </div>
      </section>

      <link rel="canonical" href={absUrl("/")} />
    </main>
  );
}
