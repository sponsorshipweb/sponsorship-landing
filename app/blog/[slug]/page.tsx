import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllPostsMeta, getAllSlugs, getPostBySlug } from "@/utils/mdx";
import { absUrl } from "@/utils/seo";
import BlogCTA from "@/components/cta/BlogCTA";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const title = post.ogTitle || post.title;
  const description = post.ogDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: post.canonical || post.url },
    openGraph: {
      type: "article",
      title,
      description,
      url: post.url,
      publishedTime: post.date || undefined,
      modifiedTime: post.updated || post.date || undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getAllPostsMeta()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated =
    related.length > 0
      ? related
      : getAllPostsMeta()
          .filter((p) => p.slug !== post.slug)
          .slice(0, 3);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date || undefined,
      dateModified: post.updated || post.date || undefined,
      author: { "@type": "Organization", name: post.author || "Sponsorship" },
      mainEntityOfPage: absUrl(post.url),
      inLanguage: "es-AR",
    },
  ];

  if (post.faq && post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      inLanguage: "es-AR",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <main className="container section" role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="section-head">
        <p className="eyebrow">
          <Link href={`/blog/categoria/${encodeURIComponent(post.category)}`}>
            {post.category}
          </Link>{" "}
          · {post.readingTime}
        </p>
        <h1 className="title">{post.title}</h1>
        {post.excerpt && <p className="subtitle">{post.excerpt}</p>}
      </header>

      <article className="prose">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
            },
          }}
        />
      </article>

      {post.faq && post.faq.length > 0 && (
        <section aria-labelledby="post-faq-title" style={{ marginTop: 40, maxWidth: "72ch", marginInline: "auto" }}>
          <h2 id="post-faq-title" className="title" style={{ fontSize: 24 }}>
            Preguntas frecuentes
          </h2>
          <div className="accordion" style={{ marginTop: 16 }}>
            {post.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {post.tags?.length > 0 && (
        <div className="chips" style={{ marginTop: 24 }}>
          {post.tags.map((t) => (
            <Link key={t} className="chip" href={`/blog/tag/${encodeURIComponent(t)}`}>
              #{t}
            </Link>
          ))}
        </div>
      )}

      <p style={{ marginTop: 24 }}>
        <Link className="btn-quiet" href="/blog">
          ← Volver al blog
        </Link>
      </p>

      {fallbackRelated.length > 0 && (
        <section aria-labelledby="related-title" style={{ marginTop: 44 }}>
          <h2 id="related-title" className="eyebrow" style={{ marginBottom: 14 }}>
            Seguí leyendo
          </h2>
          <div className="grid three">
            {fallbackRelated.map((p) => (
              <article key={p.slug} className="feature">
                <h3 style={{ margin: "6px 0 6px" }}>
                  <Link href={p.url} prefetch>{p.title}</Link>
                </h3>
                <p className="muted">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <BlogCTA />
    </main>
  );
}
