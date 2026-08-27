import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFaq = { q: string; a: string };

/** Los 6 pilares de contenido del blog. */
export const PILLARS = [
  "marcas",
  "influencers",
  "figuras-publicas",
  "ugc",
  "pagos-seguridad",
  "producto-comparativas",
] as const;

export type Pillar = (typeof PILLARS)[number];

/** Etiqueta legible de cada pilar, para breadcrumbs y encabezados. */
export const PILLAR_LABELS: Record<Pillar, string> = {
  marcas: "Para Marcas",
  influencers: "Para Influencers",
  "figuras-publicas": "Para Figuras Públicas",
  ugc: "Para Creadores UGC",
  "pagos-seguridad": "Pagos y Seguridad",
  "producto-comparativas": "Producto y Comparativas",
};

function isPillar(v: unknown): v is Pillar {
  return typeof v === "string" && (PILLARS as readonly string[]).includes(v);
}

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
  /** Pilar de contenido; agrupa artículos relacionados. */
  pillar?: Pillar;
  /** Resumen de 2-3 líneas mostrado arriba del artículo. */
  tldr?: string;
  /** Dato citable, destacado en un recuadro propio. */
  datoClave?: string;
  /** Texto del CTA contextual al pie del artículo. */
  ctaText?: string;
  /** Minutos de lectura declarados en el frontmatter (pisan el cálculo automático). */
  readingTimeMinutes?: number;
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
    pillar: isPillar(data.pillar) ? data.pillar : undefined,
    tldr: data.tldr ? String(data.tldr) : undefined,
    datoClave: data.datoClave ? String(data.datoClave) : undefined,
    ctaText: data.ctaText ? String(data.ctaText) : undefined,
    readingTimeMinutes: Number.isFinite(Number(data.readingTimeMinutes))
      ? Number(data.readingTimeMinutes)
      : undefined,
    readingTime: data.readingTimeMinutes
      ? `${Number(data.readingTimeMinutes)} min de lectura`
      : readingTimeOf(content),
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

export function getByPillar(pillar: string): PostMeta[] {
  const target = decodeURIComponent(pillar).toLowerCase();
  return getAllPostsMeta().filter((p) => p.pillar === target);
}

/**
 * Otros artículos del mismo pilar, para el bloque de relacionados.
 * Si el pilar tiene pocos, completa con los más recientes de otros pilares.
 */
export function getRelated(slug: string, limit = 3): PostMeta[] {
  const all = getAllPostsMeta();
  const post = all.find((p) => p.slug === slug);
  if (!post) return [];

  const samePillar = all.filter(
    (p) => p.slug !== slug && p.pillar && p.pillar === post.pillar
  );
  if (samePillar.length >= limit) return samePillar.slice(0, limit);

  const chosen = new Set(samePillar.map((p) => p.slug));
  const filler = all.filter((p) => p.slug !== slug && !chosen.has(p.slug));
  return [...samePillar, ...filler].slice(0, limit);
}

export function getAllPillars(): Pillar[] {
  const used = new Set(
    getAllPostsMeta()
      .map((p) => p.pillar)
      .filter((p): p is Pillar => Boolean(p))
  );
  return PILLARS.filter((p) => used.has(p));
}
