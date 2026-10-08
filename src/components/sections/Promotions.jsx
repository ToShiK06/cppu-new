import { Link } from "react-router-dom";
import { promotions } from "../../data/promotions";
import SectionTitle from "../ui/SectionTitle";
import heroBg from "../../assets/images/hero-bg.jpg";
import "./Promotions.css";

export default function Promotions() {
  return (
    <section
      className="section promotions-section"
      id="promotions"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="container promotions-section__inner">
        <div className="reveal">
          <SectionTitle title="Акции" subtitle="Специальные предложения для наших клиентов" />
        </div>
        <div className="grid">
          {promotions.map((p, i) => (
            <Link
              key={p.id}
              to={`/promotions/${p.slug}`}
              className="ui-card ui-card--accent reveal"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="ui-card__cat">{p.highlight}</span>
              <h3 className="ui-card__title" style={{ fontSize: 22 }}>
                {p.title}
              </h3>
              <p className="ui-card__text">{p.short}</p>
              <span
                className="ui-card__arrow"
                style={{ alignSelf: "flex-end", marginTop: "auto" }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}