"use client";

import Link from "next/link";
import { useCallback } from "react";
import { REGISTER_URL } from "@/utils/seo";

type Props = {
  compact?: boolean;            // versión compacta para el footer
  primaryHref?: string;         // por defecto, registro en la app
  secondaryHref?: string;       // por defecto, índice del blog
  title?: string;
  subtitle?: string;
};

export default function BlogCTA({
  compact = false,
  primaryHref = REGISTER_URL,
  secondaryHref = "/blog",
  title = "Empezá tu primera campaña.",
  subtitle = "Negociá, firmá el contrato y cobrá por Mercado Pago. Comisión del 5%, todo en pesos.",
}: Props) {
  const pushClick = useCallback((label: string) => {
    try {
      (window as any).dataLayer?.push({ event: "blog_cta_click", label });
    } catch {}
  }, []);

  return (
    <section
      className={`blogcta ${compact ? "compact" : ""}`}
      aria-labelledby="blogcta-title"
      role="region"
    >
      <div className="blogcta__inner">
        <div className="blogcta__copy">
          <h2 id="blogcta-title" className="blogcta__title">{title}</h2>
          <p className="blogcta__subtitle">{subtitle}</p>
          {!compact && <p className="blogcta__micro">Actualizamos el blog cada semana.</p>}
        </div>

        <div className="blogcta__actions">
          <a
            href={primaryHref}
            className="btn blogcta__primary"
            onClick={() => pushClick("primary")}
          >
            Crear mi perfil
          </a>

          <Link
            href={secondaryHref}
            className="btn-quiet blogcta__secondary"
            onClick={() => pushClick("secondary")}
            prefetch
            aria-label="Ver todos los artículos del blog"
          >
            Ver todos los artículos
          </Link>
        </div>
      </div>

      <style jsx>{`
        .blogcta{
          margin: 44px auto;
          max-width: 960px; /* ~ md:max-w-4xl */
          border: 1px solid var(--line);
          border-radius: var(--radius-24);
          background: radial-gradient(420px 220px at 50% 0, rgba(255,199,0,.12), transparent 70%), var(--bg-2);
          box-shadow: var(--shadow-2);
          padding: 18px;
        }
        .blogcta.compact{
          margin-top: 32px;
          padding: 16px;
        }
        .blogcta__inner{
          display:flex;
          gap:18px;
          align-items:center;
          justify-content:space-between;
          flex-wrap:wrap;
        }
        .blogcta__copy{
          min-width: 260px;
          flex:1 1 520px;
        }
        .blogcta__title{
          margin:0;
          font-size: clamp(20px, 2.4vw, 26px);
          font-weight: 800;
        }
        .blogcta__subtitle{
          margin:6px 0 0;
          color: var(--muted);
          max-width: 56ch;
        }
        .blogcta__micro{
          margin:8px 0 0;
          color: var(--muted);
          font-size: 12px;
        }

        /* Acciones: en desktop el botón principal queda a la derecha */
        .blogcta__actions{
          display:flex;
          gap:10px;
          align-items:center;
          justify-content:flex-end;
          flex: 1 1 280px;
          min-width: 260px;
        }
        .blogcta__primary{ min-width: 220px; }
        .blogcta__secondary{ white-space: nowrap; }

        @media (max-width: 720px){
          .blogcta__actions{ width:100%; justify-content:stretch; }
          .blogcta__primary, .blogcta__secondary{ flex: 1 1 auto; }
        }
      `}</style>
    </section>
  );
}
