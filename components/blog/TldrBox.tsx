export default function TldrBox({ text }: { text: string }) {
  if (!text) return null;

  return (
    <aside className="tldr" aria-label="Resumen del artículo">
      <p className="tldr-label">En resumen</p>
      <p className="tldr-text">{text}</p>
    </aside>
  );
}
