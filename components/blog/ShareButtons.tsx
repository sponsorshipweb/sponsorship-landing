"use client";

import { useState } from "react";

type Props = { title: string; url: string };

/** WhatsApp primero: es el canal donde realmente circulan estas notas en Argentina. */
export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Portapapeles no disponible: el usuario siempre puede copiar de la barra.
    }
  }

  return (
    <div className="share" role="group" aria-label="Compartir este artículo">
      <span className="share-label">Compartir</span>
      {links.map((l) => (
        <a
          key={l.label}
          className="share-btn"
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {l.label}
        </a>
      ))}
      <button type="button" className="share-btn" onClick={copyLink}>
        {copied ? "Link copiado" : "Copiar link"}
      </button>
    </div>
  );
}
