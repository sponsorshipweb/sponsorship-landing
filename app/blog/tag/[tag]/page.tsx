import Link from "next/link";
import { getByTag } from "@/utils/mdx";

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getByTag(params.tag);
  const pretty = "#" + decodeURIComponent(params.tag);

  return (
    <main className="container section" role="main" aria-labelledby="tag-title">
      <header className="section-head">
        <p className="eyebrow">Tag</p>
        <h1 id="tag-title" className="title">{pretty}</h1>
      </header>

      <section className="grid three" role="list" aria-label={`Artículos con ${pretty}`}>
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
