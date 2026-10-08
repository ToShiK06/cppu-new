import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useServices } from "../hooks/useServices";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Button from "../components/ui/Button";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
import { setMeta, pageMeta } from "../utils/seo";
import "./ServicesPage.css";

const PAGE_SIZE = 6;

export default function ServicesPage() {
  const { services, categories, category, setCategory, search, setSearch } = useServices();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => setMeta(pageMeta.services), []);
  useEffect(() => setVisibleCount(PAGE_SIZE), [category, search]);

  const visibleServices = useMemo(
    () => services.slice(0, visibleCount),
    [services, visibleCount]
  );

  const hasMore = visibleCount < services.length;

  return (
    <div className="services-page">
      <FlameBackground />
      <SparksBackground count={100} />

      <div className="container services-page__inner">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Услуги" }]} />
          <SectionTitle title="Каталог услуг" subtitle="Все направления работы компании ЦППУ" />
        </div>

        <div className="services-filter reveal">
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
          {visibleServices.map((s, i) => (
            <Link
              to={`/services/${s.slug}`}
              key={s.slug}
              className="service-card reveal"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
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

        {hasMore && (
          <div className="services-more reveal">
            <Button variant="ghost" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
              Показать ещё {Math.min(PAGE_SIZE, services.length - visibleCount)}
            </Button>
            <span className="services-more__counter">
              Показано {visibleCount} из {services.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}