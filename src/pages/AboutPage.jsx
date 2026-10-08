import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { company } from "../data/company";
import { setMeta, pageMeta } from "../utils/seo";
import fonBg from "../assets/images/fon.jpg";
import "./AboutPage.css";

export default function AboutPage() {
  useEffect(() => setMeta(pageMeta.about), []);

  return (
    <div
      className="about-page"
      style={{ backgroundImage: `url(${fonBg})` }}
    >
      <div className="container about-page__inner">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "О компании" }]} />
          <SectionTitle
            title="О компании"
            subtitle="Полный спектр услуг в области обеспечения пожарной безопасности"
          />
        </div>

        <div className="about">
          <div className="about__main">
            <h3 className="reveal">{company.brand}</h3>
            <p className="about__lead reveal delay-1">{company.legalName}</p>
            <p className="reveal delay-2">{company.description}</p>
            <p className="reveal delay-2">
              В 2012 году на базе Центра создано {company.school}, основным направлением
              деятельности которого является обучение мерам пожарной безопасности по программам
              пожарно-технического минимума. {company.electroLab}.
            </p>
            <p className="reveal delay-3">
              Одной из главных задач, стоящих перед нашим Центром, является квалифицированное
              и качественное выполнение работ в короткие сроки.
            </p>
            <blockquote className="about__quote reveal delay-3">
              «{company.slogan}»
            </blockquote>
            <p className="about__sign reveal delay-4">
              С уважением,<br />
              Руководитель Центра противопожарных услуг,<br />
              Дмитрий Семыкин
            </p>
          </div>

          <aside className="about__aside reveal-right">
            <h4>История</h4>
            <ul className="about__timeline">
              {company.history.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <h4>География</h4>
            <p className="about__muted">{company.geography}</p>
            <h4>Лицензия</h4>
            <p className="about__muted">{company.license}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}