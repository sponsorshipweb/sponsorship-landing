import Link from "next/link";
import { absUrl } from "@/utils/seo";

export type Crumb = { name: string; href?: string };

/**
 * Migas + BreadcrumbList JSON-LD. El último ítem no lleva link (es la página actual)
 * pero sí entra en el schema, que es lo que Google espera.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: absUrl(c.href) } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <ol>
          {items.map((c, i) => (
            <li key={`${c.name}-${i}`}>
              {c.href ? (
                <Link href={c.href}>{c.name}</Link>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
