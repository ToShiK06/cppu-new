import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { mediaItems } from "../data/media";
import "./MediaPage.css";

export default function MediaPage() {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Медиа" }]} />
        <SectionTitle title="Медиа" subtitle="Новости, партнёры и события компании" />

        {mediaItems.length === 0 && <p className="media__empty">Пока нет публикаций.</p>}

        <div className="grid">
          {mediaItems.map((m) => (
            <article key={m.id} className="media-card">
              <span className="media-card__date">{m.date}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <span className="media-card__tag">{m.partner}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}