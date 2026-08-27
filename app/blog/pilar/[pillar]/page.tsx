import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getByPillar,
  PILLARS,
  PILLAR_LABELS,
  type Pillar,
} from "@/utils/mdx";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return PILLARS.map((pillar) => ({ pillar }));
}

const DESCRIPTIONS: Record<Pillar, string> = {
  marcas:
    "Guías para marcas que quieren lanzar campañas con creadores: brief, selección, medición de ROI y detección de métricas infladas.",
  influencers:
    "Cómo cobrar, cuánto cobrar y cómo negociar: guías para influencers que gestionan sus propios acuerdos con marcas.",
  "figuras-publicas":
    "Deportistas, periodistas, músicos y actores: cómo gestionar acuerdos publicitarios propios sin depender de un representante.",
  ugc: "Contenido UGC: qué es, cómo cobrarlo sin audiencia propia y en qué se diferencia del influencer marketing.",
  "pagos-seguridad":
    "Cómo funcionan los contratos, el cobro por Mercado Pago y las protecciones del flujo de pago en una campaña.",
  "producto-comparativas":
    "Cómo funciona Sponsorship y en qué se diferencia de gestionar campañas por WhatsApp, Excel o una agencia.",
};

function isPillar(v: string): v is Pillar {
  return (PILLARS as readonly string[]).includes(v);
}

export function generateMetadata({
  params,
}: {
  params: { pillar: string };
}): Metadata {
  if (!isPillar(params.pillar)) return {};
  const label = PILLAR_LABELS[params.pillar];

  return {
    title: `${label} — Blog de Sponsorship`,
    description: DESCRIPTIONS[params.pillar],
    alternates: { canonical: `/blog/pilar/${params.pillar}` },
  };
}

export default function PillarPage({ params }: { params: { pillar: string } }) {
  if (!isPillar(params.pillar)) notFound();

  const pillar = params.pillar;
  const posts = getByPillar(pillar);
  const label = PILLAR_LABELS[pillar];

  return (
    <main className="container section" role="main" aria-labelledby="pillar-title">
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: label },
        ]}
      />

      <header className="section-head">
        <p className="eyebrow">Pilar</p>
        <h1 id="pillar-title" className="title">
          {label}
        </h1>
        <p className="subtitle">{DESCRIPTIONS[pillar]}</p>
      </header>

      <section className="grid three" role="list" aria-label={`Artículos de ${label}`}>
        {posts.map((p) => (
          <article key={p.slug} className="feature" role="listitem">
            <h2 style={{ margin: "6px 0 6px", fontSize: 18 }}>
              <Link href={p.url} prefetch>
                {p.title}
              </Link>
            </h2>
            <p className="muted">{p.excerpt}</p>
            <p className="tiny muted" style={{ marginTop: 8 }}>
              {p.readingTime}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
