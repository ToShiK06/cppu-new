import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import SectionTitle from "../components/ui/SectionTitle";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
import PhotoSlider from "../components/ui/PhotoSlider";
import { portfolioWorks } from "../data/portfolio";
import { getPortfolioImage } from "../utils/portfolioImages";
import { setMeta } from "../utils/seo";
import "./PortfolioDetailPage.css";

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const work = portfolioWorks.find((w) => w.slug === slug);

  useEffect(() => {
    if (work) {
      setMeta({ title: `${work.title} — ЦППУ`, description: work.short });
    }
  }, [work]);

  if (!work) return <Navigate to="/portfolio" replace />;

  const photos = (work.gallery || [work.cover])
    .map((p) => getPortfolioImage(p))
    .filter(Boolean);

  return (
    <div className="portfolio-detail-page">
      <FlameBackground />
      <SparksBackground count={80} />

      <div className="container portfolio-detail-page__inner">
        <div className="reveal">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Наши работы", to: "/portfolio" },
              { label: work.title },
            ]}
          />
          <SectionTitle title={work.title} subtitle={work.city} />
        </div>

        <div className="portfolio-detail">
          <div className="portfolio-detail__main">
            <div className="reveal">
              <PhotoSlider photos={photos} alt={work.title} />
            </div>

            <p className="detail__intro reveal">{work.description}</p>

            <div className="detail__section tilt reveal">
              <h3 className="detail__sub">Детали</h3>
              <ul className="detail__list">
                <li><strong>Адрес:</strong> {work.address}</li>
                <li><strong>Заказчик:</strong> {work.client}</li>
                <li><strong>Год:</strong> {work.year}</li>
              </ul>
            </div>

            <div className="detail__section tilt reveal">
              <h3 className="detail__sub">Что сделали</h3>
              <ul className="detail__list">
                {work.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="detail__aside tilt reveal-right">
            <h3>Заказать услугу</h3>
            <p>Проведём работы и оформим все документы для надзорных органов.</p>
            <Link to="/contacts" className="btn btn--primary btn--block">
              Оставить заявку
            </Link>
            <Link
              to="/services"
              className="btn btn--ghost btn--block"
              style={{ marginTop: 12 }}
            >
              Все услуги
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}