import { REGISTER_URL } from "@/utils/seo";
import type { Pillar } from "@/utils/mdx";

/**
 * CTA contextual al pie del artículo.
 *
 * El destino sale de este mapa y no del frontmatter, para poder cambiar el
 * registro de los 26 artículos en un solo lugar.
 *
 * PENDIENTE: cada pilar debería apuntar al registro prefiltrado por tipo de
 * usuario (Marca / Influencer / Figura Pública / Creador UGC). Hoy los cuatro
 * van al registro genérico porque no está confirmado con qué parámetro espera
 * el filtro el backend — en cuanto se confirme, se cambia sólo acá.
 */
const PILLAR_CTA: Record<Pillar, { fallback: string; href: string }> = {
  marcas: {
    fallback: "Creá tu perfil de marca y armá tu primera campaña.",
    href: REGISTER_URL,
  },
  influencers: {
    fallback: "Creá tu perfil de creador y vinculá tu Mercado Pago.",
    href: REGISTER_URL,
  },
  "figuras-publicas": {
    fallback: "Creá tu perfil como figura pública y gestioná tus propios acuerdos.",
    href: REGISTER_URL,
  },
  ugc: {
    fallback: "Creá tu perfil de creador UGC, sin necesidad de audiencia propia.",
    href: REGISTER_URL,
  },
  "pagos-seguridad": {
    fallback: "Formalizá tu próxima campaña con contrato y cobro por Mercado Pago.",
    href: REGISTER_URL,
  },
  "producto-comparativas": {
    fallback: "Probá cómo se ve una negociación con historial, contrato y pago en un lugar.",
    href: REGISTER_URL,
  },
};

const DEFAULT = {
  fallback: "Creá tu cuenta en Sponsorship y cerrá tu primera campaña con contrato.",
  href: REGISTER_URL,
};

export default function BlogCTA({
  pillar,
  text,
}: {
  pillar?: Pillar;
  text?: string;
}) {
  const conf = (pillar && PILLAR_CTA[pillar]) || DEFAULT;

  return (
    <section className="cta-band" aria-labelledby="blog-cta-title">
      <h2 id="blog-cta-title" className="cta-title">
        {text || conf.fallback}
      </h2>
      <p className="muted">
        Tu agencia sos vos: Sponsorship da la infraestructura para negociar,
        contratar y cobrar — nunca negocia en nombre de nadie.
      </p>
      <div className="cta-actions">
        <a className="btn btn-primary" href={conf.href}>
          Crear cuenta
        </a>
        <a className="btn btn-quiet" href="/blog">
          Ver más artículos
        </a>
      </div>
    </section>
  );
}
