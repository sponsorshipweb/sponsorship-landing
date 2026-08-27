import type { PostFaq as Faq } from "@/utils/mdx";

/**
 * Renderiza las preguntas del frontmatter. El FAQPage JSON-LD se emite
 * desde la página con este mismo array, así el marcado nunca declara
 * preguntas que no estén visibles en pantalla.
 */
export default function PostFaq({ items }: { items: Faq[] }) {
  if (!items?.length) return null;

  return (
    <section className="post-faq" aria-labelledby="post-faq-title">
      <h2 id="post-faq-title" className="post-faq-title">
        Preguntas frecuentes
      </h2>
      <div className="accordion">
        {items.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
