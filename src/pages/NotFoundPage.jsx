import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="container">
        <h1 style={{ fontSize: 96, color: "var(--accent)", fontWeight: 800, lineHeight: 1 }}>
          404
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: 18 }}>
          Страница не найдена
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn--primary">На главную</Link>
          <Link to="/services" className="btn btn--ghost">Каталог услуг</Link>
        </div>
      </div>
    </section>
  );
}