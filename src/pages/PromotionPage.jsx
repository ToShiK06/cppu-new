import { useParams, Link, Navigate } from "react-router-dom";
import { getPromotionBySlug, promotions } from "../data/promotions";
import { company } from "../data/company";
import "./PromotionPage.css";

export default function PromotionPage() {
  const { slug } = useParams();
  const promo = getPromotionBySlug(slug);
  if (!promo) return <Navigate to="/" replace />;

  return (
    <section className="section">
      <div className="container">
        <Link to="/" className="back-link">← На главную</Link>
        <div className="promo-page">
          <span className="promo-page__highlight">{promo.highlight}</span>
          <h1 className="promo-page__title">{promo.title}</h1>
          {promo.short && <p className="promo-page__short">{promo.short}</p>}

          {promo.steps && (
            <>
              <h3 className="promo-page__sub">Условия акции</h3>
              <ol className="promo-page__steps">
                {promo.steps.map((s, i) => (
                  <li key={i}><span className="promo-page__num">{i + 1}</span>{s}</li>
                ))}
              </ol>
            </>
          )}

          {promo.notes && (
            <ul className="promo-page__notes">
              {promo.notes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          )}

          <div className="promo-page__cta">
            <Link to="/contacts" className="btn btn--primary">Подать заявку на участие</Link>
            <span className="promo-page__phone">
              {company.phones[0]} · {company.email}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}