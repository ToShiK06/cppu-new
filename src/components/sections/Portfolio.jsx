import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";
import { portfolioWorks } from "../../data/portfolio";
import { getPortfolioImage } from "../../utils/portfolioImages";
import "./Portfolio.css";

export default function Portfolio({ limit }) {
  const list = limit ? portfolioWorks.slice(0, limit) : portfolioWorks;

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Выполненные работы"
            subtitle="Объекты, на которых мы работали"
          />
        </div>

        <div className="portfolio-grid">
          {list.map((w, i) => {
            const cover = getPortfolioImage(w.cover);
            return (
              <Link
                key={w.slug}
                to={`/portfolio/${w.slug}`}
                className="portfolio-card ui-card tilt reveal"
                style={{ transitionDelay: `${(i % 6) * 70}ms` }}
              >
                {cover && (
                  <div className="portfolio-card__cover">
                    <img src={cover} alt={w.title} loading="lazy" />
                  </div>
                )}
                <div className="portfolio-card__body">
                  <div className="portfolio-card__meta">
                    <span className="ui-card__cat">{w.city}</span>
                    <span className="portfolio-card__year">{w.year}</span>
                  </div>
                  <h3 className="ui-card__title">{w.title}</h3>
                  <p className="ui-card__text">{w.short}</p>
                </div>
                <span className="ui-card__arrow portfolio-card__arrow">→</span>
              </Link>
            );
          })}
        </div>

        {limit && limit < portfolioWorks.length && (
          <div style={{ textAlign: "center", marginTop: 48 }} className="reveal">
            <Link to="/portfolio" className="btn btn--ghost">
              Все работы
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}