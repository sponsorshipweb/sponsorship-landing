import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllSlugs, getPostBySlug } from "@/utils/mdx";
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

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date || undefined,
    dateModified: post.updated || post.date || undefined,
    author: { "@type": "Organization", name: post.author || "Sponsorship" },
    mainEntityOfPage: absUrl(post.url),
    inLanguage: "es-AR",
  };

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

      <BlogCTA />
    </main>
  );
}
