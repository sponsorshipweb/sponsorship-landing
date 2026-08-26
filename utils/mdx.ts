import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFaq = { q: string; a: string };

export type PostMeta = {
  slug: string;
  url: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  author?: string;
  roleFocus?: string;
  category: string;
  tags: string[];
  cover?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  faq?: PostFaq[];
  featured?: boolean;
  readingTime: string;
};

export type Post = PostMeta & { content: string };

/** ~200 palabras por minuto, redondeado hacia arriba. */
function readingTimeOf(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min de lectura`;
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/i.test(f));
}

function parseFile(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = String(data.slug || file.replace(/\.mdx?$/i, ""));

  return {
    slug,
    url: `/blog/${slug}`,
    title: String(data.title || slug),
    excerpt: String(data.excerpt || ""),
    date: String(data.date || ""),
    updated: data.updated ? String(data.updated) : undefined,
    author: data.author ? String(data.author) : undefined,
    roleFocus: data.roleFocus ? String(data.roleFocus) : undefined,
    category: String(data.category || "General"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    canonical: data.canonical ? String(data.canonical) : undefined,
    ogTitle: data.ogTitle ? String(data.ogTitle) : undefined,
    ogDescription: data.ogDescription ? String(data.ogDescription) : undefined,
    faq: Array.isArray(data.faq) ? (data.faq as PostFaq[]) : undefined,
    featured: Boolean(data.featured),
    readingTime: readingTimeOf(content),
    content,
  };
}

/** Todos los posts, más nuevos primero. */
export function getAllPosts(): Post[] {
  return listFiles()
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Metadata de todos los posts (sin el cuerpo MDX). */
export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | null {
  const target = decodeURIComponent(slug).toLowerCase();
  return getAllPosts().find((p) => p.slug.toLowerCase() === target) || null;
}

export function getByCategory(cat: string): PostMeta[] {
  const target = decodeURIComponent(cat).toLowerCase();
  return getAllPostsMeta().filter((p) => p.category.toLowerCase() === target);
}

export function getByTag(tag: string): PostMeta[] {
  const target = decodeURIComponent(tag).toLowerCase();
  return getAllPostsMeta().filter((p) =>
    (p.tags || []).some((t) => t.toLowerCase() === target)
  );
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getAllPostsMeta().map((p) => p.category))).sort();
}

export function getAllTags(): string[] {
  return Array.from(new Set(getAllPostsMeta().flatMap((p) => p.tags || []))).sort();
}
