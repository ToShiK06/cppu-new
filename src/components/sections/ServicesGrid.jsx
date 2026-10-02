import { Link } from "react-router-dom";
import { services } from "../../data/services";
import SectionTitle from "../ui/SectionTitle";
import "./ServicesGrid.css";

export default function ServicesGrid({ limit = 12 }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionTitle
          title="Услуги центра"
          subtitle="Наши специалисты по пожарной безопасности готовы предложить вам следующие услуги"
        />
        <div className="grid">
          {list.map((s) => (
            <Link to={`/services/${s.slug}`} key={s.slug} className="service-card">
              <span className="service-card__cat">{s.category}</span>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description}</p>
              <div className="service-card__footer">
                <span className="service-card__price">{s.price}</span>
                <span className="service-card__arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
        {limit < services.length && (
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/services" className="btn btn--ghost">Все услуги</Link>
          </div>
        )}
      </div>
    </section>
  );
}