import Link from "next/link";
import { getAllPostsMeta } from "@/utils/mdx";
import { absUrl } from "@/utils/seo";
import BlogCTA from "@/components/cta/BlogCTA";

export const dynamic = "force-static";

const PAGE_SIZE = 6;

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export default async function BlogIndex({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string };
}) {
  const q = (searchParams?.q || "").trim().toLowerCase();
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10));

  let posts = getAllPostsMeta();

  // featured arriba (tag "featured" o field featured)
  const featured = posts.filter((p) => p.featured).slice(0, 3);
  const rest = posts.filter((p) => !p.featured);

  // búsqueda simple por título o tag
  const matches = (t: string) => t.toLowerCase().includes(q);
  const filtered = q
    ? rest.filter((p) => matches(p.title) || p.tags?.some((t) => matches(t)))
    : rest;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const categories = uniq(posts.map((p) => p.category)).sort();
  const tags = uniq(posts.flatMap((p) => p.tags || [])).sort();

  return (
    <main className="container section" role="main" aria-labelledby="blog-title">
      <header className="section-head">
        <p className="eyebrow">Blog</p>
        <h1 id="blog-title" className="title">Aprendé, validá y escalá con Sponsorship</h1>
        <p className="subtitle">Guías, metodología y actualizaciones reales del producto.</p>
      </header>

      {/* Featured */}
      {featured.length > 0 && (
        <section aria-label="Destacados" className="grid three" style={{ marginBottom: 18 }}>
          {featured.map((p) => (
            <article key={p.slug} className="feature">
              <h3 style={{ margin: "6px 0 6px" }}>
                <Link href={p.url} prefetch>{p.title}</Link>
              </h3>
              <p className="muted">{p.excerpt}</p>
              <p className="tiny muted" style={{ marginTop: 8 }}>
                {p.category} · {p.readingTime}
              </p>
            </article>
          ))}
        </section>
      )}

      {/* Buscador */}
      <form action="/blog" method="get" style={{ margin: "16px 0 10px" }} role="search" aria-label="Buscar en el blog">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por título o tag…"
          aria-label="Buscar por título o tag"
        />
      </form>

      {/* Filtros rápidos */}
      <div className="grid two" style={{ margin: "8px 0 18px" }} aria-label="Filtros de blog">
        <div className="chips">
          {categories.map((c) => (
            <Link key={c} className="chip" href={`/blog/categoria/${encodeURIComponent(c)}`} prefetch>
              {c}
            </Link>
          ))}
        </div>
        <div className="chips" style={{ justifyContent: "flex-end" }}>
          {tags.map((t) => (
            <Link key={t} className="chip" href={`/blog/tag/${encodeURIComponent(t)}`} prefetch>
              #{t}
            </Link>
          ))}
        </div>
      </div>

      {/* Listado paginado */}
      <section className="grid three" role="list" aria-label="Listado de artículos">
        {pageItems.map((p) => (
          <article key={p.slug} className="feature" role="listitem">
            <h3 style={{ margin: "6px 0 6px" }}>
              <Link href={p.url} prefetch>{p.title}</Link>
            </h3>
            <p className="muted">{p.excerpt}</p>
            <p className="tiny muted" style={{ marginTop: 8 }}>
              {p.category} · {p.readingTime}
            </p>
          </article>
        ))}
      </section>

      {/* Paginación */}
      <nav aria-label="Paginación" className="grid two" style={{ marginTop: 18 }}>
        <div>
          {page > 1 && (
            <Link className="btn-quiet" href={`/blog?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`} prefetch>
              ← Anteriores
            </Link>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          {page < totalPages && (
            <Link className="btn-quiet" href={`/blog?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}`} prefetch>
              Más artículos →
            </Link>
          )}
        </div>
      </nav>

      {/* CTA del blog */}
      <BlogCTA />

      {/* Canonical del índice */}
      <link rel="canonical" href={absUrl("/blog")} />
    </main>
  );
}
