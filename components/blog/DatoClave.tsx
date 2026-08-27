export default function DatoClave({ text }: { text: string }) {
  if (!text) return null;

  return (
    <aside className="dato-clave" aria-label="Dato clave">
      <p className="dato-clave-label">Dato clave</p>
      <p className="dato-clave-text">{text}</p>
    </aside>
  );
}
