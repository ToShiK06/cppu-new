import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
import { mediaItems } from "../data/media";
import { setMeta } from "../utils/seo";
import smartWatt from "../assets/images/media/smart-watt.png";
import "./MediaPage.css";

const imageMap = {
  "smart-watt.png": smartWatt,
};

export default function MediaPage() {
  useEffect(() => {
    setMeta({
      title: "Медиа — ЦППУ",
      description: "Новости, партнёры и события Центра противопожарных услуг.",
    });
  }, []);

  return (
    <div className="media-page">
      <FlameBackground />
      <SparksBackground count={90} />

      <div className="container media-page__inner">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Медиа" }]} />
          <SectionTitle title="Медиа" subtitle="Новости, партнёры и события компании" />
        </div>

        {mediaItems.length === 0 && (
          <p className="media__empty">Пока нет публикаций.</p>
        )}

        <div className="media-list">
          {mediaItems.map((m, i) => {
            const imageSrc = m.image ? imageMap[m.image] || null : null;

            return (
              <article
                key={m.id}
                className="media-card reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {imageSrc && (
                  <div className="media-card__image">
                    <img src={imageSrc} alt={m.title} loading="lazy" />
                  </div>
                )}

                <div className="media-card__body">
                  <div className="media-card__meta">
                    <span className="media-card__date">{m.date}</span>
                    {m.tags?.map((t) => (
                      <span key={t} className="media-card__tag">{t}</span>
                    ))}
                  </div>

                  <h3 className="media-card__title">{m.title}</h3>
                  {m.short && <p className="media-card__short">{m.short}</p>}

                  {m.links?.length > 0 && (
                    <div className="media-card__links">
                      {m.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="media-card__link"
                        >
                          <span>{l.label}</span>
                          <span className="media-card__link-arrow">→</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}