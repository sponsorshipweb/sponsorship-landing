// @ts-nocheck
// app/rss.xml/route.ts
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const SITE_URL = "https://sponsorship.com.ar";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function listPosts() {
  try {
    const files = await fs.readdir(BLOG_DIR);
    return files
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => {
        const slug = f.replace(/\.mdx?$/, "");
        return {
          slug,
          title: slug,
          date: new Date().toISOString(),
          description: "",
        };
      });
  } catch {
    return [];
  }
}

export async function GET() {
  const posts = await listPosts();

  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.description ? `<description><![CDATA[${p.description}]]></description>` : ""}
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sponsorship — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Noticias y guías de Sponsorship.</description>
    <language>es</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
