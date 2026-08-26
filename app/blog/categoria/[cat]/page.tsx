import Link from "next/link";
import { getByCategory } from "@/utils/mdx";

export default function CategoryPage({ params }: { params: { cat: string } }) {
  const posts = getByCategory(params.cat);
  const pretty = decodeURIComponent(params.cat);

  return (
    <main className="container section" role="main" aria-labelledby="cat-title">
      <header className="section-head">
        <p className="eyebrow">Categoría</p>
        <h1 id="cat-title" className="title">{pretty}</h1>
      </header>

      <section className="grid three" role="list" aria-label={`Artículos de ${pretty}`}>
        {posts.map((p) => (
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
    </main>
  );
}
