import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { team } from "../data/team";
import { setMeta } from "../utils/seo";
import { initials } from "../utils/helpers";
import "./TeamPage.css";

export default function TeamPage() {
  useEffect(() => {
    setMeta({
      title: "Сотрудники — ЦППУ",
      description:
        "Квалифицированные специалисты Центра противопожарных услуг с высшим и средним специальным образованием.",
    });
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Сотрудники" }]} />
          <SectionTitle
            title="Сотрудники Центра"
            subtitle="Квалифицированные специалисты с высшим и средним специальным образованием, имеющие теоретическую подготовку и практический опыт работы"
          />
        </div>

        <div className="grid">
          {team.map((p, i) => (
            <div
              key={p.name}
              className="ui-card reveal"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
              <div className="team-avatar">{initials(p.name)}</div>
              <h3 className="ui-card__title">{p.name}</h3>
              <span className="ui-card__cat" style={{ marginTop: -4 }}>{p.role}</span>
              {p.bio && <p className="ui-card__text">{p.bio}</p>}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 14,
                  borderTop: "1px solid rgba(48, 54, 61, 0.6)",
                }}
              >
                <a
                  href={`tel:${p.phone.replace(/\D/g, "")}`}
                  style={{ display: "block", fontSize: 13, color: "var(--muted)" }}
                >
                  {p.phone}
                </a>
                {p.email && (
                  <a
                    href={`mailto:${p.email}`}
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: "var(--muted)",
                      marginTop: 4,
                    }}
                  >
                    {p.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}