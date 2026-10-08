import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getPromotionBySlug } from "../data/promotions";
import { company } from "../data/company";
import { setMeta } from "../utils/seo";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
import "./PromotionPage.css";

export default function PromotionPage() {
  const { slug } = useParams();
  const promo = getPromotionBySlug(slug);

  useEffect(() => {
    if (promo) {
      setMeta({ title: `${promo.title} — ЦППУ`, description: promo.short });
    }
  }, [promo]);

  if (!promo) return <Navigate to="/" replace />;

  return (
    <div className="promotion-page">
      <FlameBackground />
      <SparksBackground count={90} />

      <div className="container promotion-page__inner">
        <Link to="/" className="back-link reveal">← На главную</Link>

        <div className="promo-page">
          <span className="promo-page__highlight reveal">{promo.highlight}</span>
          <h1 className="promo-page__title reveal delay-1">{promo.title}</h1>
          {promo.short && <p className="promo-page__short reveal delay-2">{promo.short}</p>}

          {promo.steps && (
            <>
              <h3 className="promo-page__sub reveal">Условия акции</h3>
              <ol className="promo-page__steps">
                {promo.steps.map((s, i) => (
                  <li
                    key={i}
                    className="ui-card tilt reveal"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <span className="promo-page__num">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </>
          )}

          {promo.notes && (
            <ul className="promo-page__notes ui-card tilt reveal">
              {promo.notes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          )}

          <div className="promo-page__cta reveal">
            <Link to="/contacts" className="btn btn--primary magnetic">
              Подать заявку на участие
            </Link>
            <span className="promo-page__phone">
              {company.phones[0]} · {company.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}