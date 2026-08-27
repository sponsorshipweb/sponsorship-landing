import { absUrl, APP_URL } from "@/utils/seo";

/**
 * Organization + WebSite se declaran una sola vez para toda la sección del blog,
 * en lugar de repetirse en cada artículo.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${absUrl("/")}#organization`,
        name: "Sponsorship",
        url: APP_URL,
        description:
          "Marketplace argentino que conecta marcas con influencers, figuras públicas y creadores UGC para gestionar campañas con contrato y cobro por Mercado Pago.",
        areaServed: { "@type": "Country", name: "Argentina" },
      },
      {
        "@type": "WebSite",
        "@id": `${absUrl("/")}#website`,
        name: "Blog de Sponsorship",
        url: absUrl("/"),
        inLanguage: "es-AR",
        publisher: { "@id": `${absUrl("/")}#organization` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
