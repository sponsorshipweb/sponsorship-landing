"use client";

import { useState } from "react";

type Props = {
  title: string;
  url: string;
  year: string;
};

/**
 * "Cómo citar esta nota" — el texto se arma acá y no en el frontmatter,
 * así la URL sigue a SITE_URL y no queda un dominio hardcodeado en 26 archivos.
 */
export default function CitationBox({ title, url, year }: Props) {
  const [copied, setCopied] = useState(false);
  const citation = `Equipo Sponsorship. "${title}." Sponsorship Blog, ${year}. ${url}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // El portapapeles puede estar bloqueado (permisos, contexto inseguro).
      // El texto igual está visible y seleccionable, así que no rompemos nada.
    }
  }

  return (
    <section className="citation" aria-labelledby="citation-title">
      <div className="citation-head">
        <h2 id="citation-title" className="citation-title">
          Cómo citar esta nota
        </h2>
        <button type="button" className="btn-copy" onClick={copy}>
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <p className="citation-text">{citation}</p>
    </section>
  );
}
