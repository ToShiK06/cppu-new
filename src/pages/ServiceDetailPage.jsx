import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getServiceBySlug } from "../data/services";
import { getServiceDetail } from "../data/serviceDetails";
import { company } from "../data/company";
import { setMeta } from "../utils/seo";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import "./ServiceDetailPage.css";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);

  useEffect(() => {
    if (service) {
      setMeta({
        title: `${service.title} — ЦППУ`,
        description: service.description,
      });
    }
  }, [service]);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <section className="section">
      <div className="container">
        <div className="reveal">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Услуги", to: "/services" },
              { label: service.title },
            ]}
          />
        </div>

        <div className="detail">
          <div className="detail__main">
            <div className="reveal">
              <span className="service-card__cat">{service.category}</span>
              <h1 className="detail__title">{service.title}</h1>
              <p className="detail__desc">{service.description}</p>
              <div className="detail__price">
                Стоимость: <strong>{service.price}</strong>
              </div>
            </div>

            {detail?.intro && (
              <p className="detail__intro reveal">{detail.intro}</p>
            )}

            {detail?.body?.map((p, i) => (
              <p
                key={i}
                className="detail__text reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {p}
              </p>
            ))}

            {detail?.sections?.map((s, i) => (
              <div
                key={i}
                className="detail__section reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="detail__sub">{s.title}</h3>
                <ul className="detail__list">
                  {s.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <aside className="detail__aside reveal-right">
            <h3>Оставить заявку</h3>
            <p>{company.address}</p>
            {company.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\D/g, "")}`}>{p}</a>
            ))}
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <Link to="/contacts" className="btn btn--primary btn--block">Заказать выезд</Link>
          </aside>
        </div>
      </div>
    </section>
  );
}