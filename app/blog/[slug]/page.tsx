import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getAllSlugs,
  getPostBySlug,
  getRelated,
  PILLAR_LABELS,
} from "@/utils/mdx";
import { absUrl } from "@/utils/seo";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import TldrBox from "@/components/blog/TldrBox";
import DatoClave from "@/components/blog/DatoClave";
import PostFaq from "@/components/blog/PostFaq";
import CitationBox from "@/components/blog/CitationBox";
import ShareButtons from "@/components/blog/ShareButtons";
import BlogCTA from "@/components/blog/BlogCTA";

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
  const description = post.ogDescription || post.tldr || post.excerpt;

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

  const related = getRelated(post.slug, 3);
  const absolute = absUrl(post.url);
  const year = (post.updated || post.date || "").slice(0, 4) || "2026";
  const pillarLabel = post.pillar ? PILLAR_LABELS[post.pillar] : post.category;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.tldr || post.excerpt,
      datePublished: post.date || undefined,
      dateModified: post.updated || post.date || undefined,
      author: { "@type": "Organization", name: post.author || "Equipo Sponsorship" },
      publisher: {
        "@type": "Organization",
        name: "Sponsorship",
        url: absUrl("/"),
      },
      mainEntityOfPage: absolute,
      articleSection: pillarLabel,
      inLanguage: "es-AR",
    },
  ];

  // El FAQPage sólo se declara si las preguntas se renderizan en pantalla.
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
    <main className="container section post-page" role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
          ...(post.pillar
            ? [{ name: pillarLabel, href: `/blog/pilar/${post.pillar}` }]
            : []),
          { name: post.title },
        ]}
      />

      <header className="section-head">
        <p className="eyebrow">
          {post.pillar ? (
            <Link href={`/blog/pilar/${post.pillar}`}>{pillarLabel}</Link>
          ) : (
            <Link href={`/blog/categoria/${encodeURIComponent(post.category)}`}>
              {post.category}
            </Link>
          )}{" "}
          · {post.readingTime}
        </p>
        <h1 className="title">{post.title}</h1>
        <p className="post-byline muted">
          Por {post.author || "Equipo Sponsorship"}
          {post.updated ? ` · Actualizado ${post.updated}` : ""}
        </p>
      </header>

      {post.tldr && <TldrBox text={post.tldr} />}

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

      {post.datoClave && <DatoClave text={post.datoClave} />}

      {post.faq && post.faq.length > 0 && <PostFaq items={post.faq} />}

      <CitationBox title={post.title} url={absolute} year={year} />

      <ShareButtons title={post.title} url={absolute} />

      {post.tags?.length > 0 && (
        <div className="chips" style={{ marginTop: 28 }}>
          {post.tags.map((t) => (
            <Link key={t} className="chip" href={`/blog/tag/${encodeURIComponent(t)}`}>
              #{t}
            </Link>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section className="post-related" aria-labelledby="related-title">
          <h2 id="related-title" className="eyebrow" style={{ marginBottom: 14 }}>
            Seguí leyendo{post.pillar ? ` · ${pillarLabel}` : ""}
          </h2>
          <div className="grid three">
            {related.map((p) => (
              <article key={p.slug} className="feature">
                <h3 style={{ margin: "6px 0 6px" }}>
                  <Link href={p.url} prefetch>
                    {p.title}
                  </Link>
                </h3>
                <p className="muted">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <BlogCTA pillar={post.pillar} text={post.ctaText} />
    </main>
  );
}
