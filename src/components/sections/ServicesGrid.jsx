import { Link } from "react-router-dom";
import { services } from "../../data/services";
import SectionTitle from "../ui/SectionTitle";
import "./ServicesGrid.css";

export default function ServicesGrid({ limit = 12 }) {
  const list = limit ? services.slice(0, limit) : services;

  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Услуги центра"
            subtitle="Наши специалисты по пожарной безопасности готовы предложить вам следующие услуги"
          />
        </div>
        <div className="grid">
          {list.map((s, i) => (
            <Link
              to={`/services/${s.slug}`}
              key={s.slug}
              className="ui-card reveal"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              onMouseMove={handleMove}
            >
              <span className="ui-card__cat">{s.category}</span>
              <h3 className="ui-card__title">{s.title}</h3>
              <p className="ui-card__text">{s.description}</p>
              <div className="ui-card__footer">
                <span className="ui-card__price">{s.price}</span>
                <span className="ui-card__arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
        {limit < services.length && (
          <div style={{ textAlign: "center", marginTop: 48 }} className="reveal">
            <Link to="/services" className="btn btn--ghost">Все услуги</Link>
          </div>
        )}
      </div>
    </section>
  );
}