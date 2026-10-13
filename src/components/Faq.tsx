export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}<i aria-hidden>+</i></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
