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
              className="team-card reveal"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
              <div className="team-card__initials">{initials(p.name)}</div>
              <h3 className="team-card__name">{p.name}</h3>
              <p className="team-card__role">{p.role}</p>
              {p.bio && <p className="team-card__bio">{p.bio}</p>}
              <div className="team-card__contacts">
                <a href={`tel:${p.phone.replace(/\D/g, "")}`}>{p.phone}</a>
                {p.email && <a href={`mailto:${p.email}`}>{p.email}</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}