import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useServices } from "../hooks/useServices";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { setMeta, pageMeta } from "../utils/seo";
import "./ServicesPage.css";

export default function ServicesPage() {
  const { services, categories, category, setCategory, search, setSearch } = useServices();

  useEffect(() => setMeta(pageMeta.services), []);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Услуги" }]} />
        <SectionTitle title="Каталог услуг" subtitle="Все направления работы компании ЦППУ" />

        <div className="services-filter">
          <input
            className="input"
            placeholder="Поиск услуги..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="services-cats">
            {categories.map((c) => (
              <button
                key={c}
                className={`cat-chip ${category === c ? "is-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid">
          {services.map((s) => (
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

        {services.length === 0 && <p className="services-empty">Ничего не найдено.</p>}
      </div>
    </section>
  );
}