import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { company } from "../data/company";
import { setMeta, pageMeta } from "../utils/seo";
import "./AboutPage.css";

export default function AboutPage() {
  useEffect(() => setMeta(pageMeta.about), []);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "О компании" }]} />
        <SectionTitle
          title="О компании"
          subtitle="Полный спектр услуг в области обеспечения пожарной безопасности"
        />

        <div className="about">
          <div className="about__main">
            <h3>{company.brand}</h3>
            <p className="about__lead">{company.legalName}</p>
            <p>{company.description}</p>
            <p>
              В 2012 году на базе Центра создано {company.school}, основным направлением
              деятельности которого является обучение мерам пожарной безопасности по программам
              пожарно-технического минимума. {company.electroLab}.
            </p>
            <p>
              Одной из главных задач, стоящих перед нашим Центром, является квалифицированное
              и качественное выполнение работ в короткие сроки. Мы предоставляем сертифицированное
              оборудование для обеспечения Вашей безопасной работы.
            </p>
            <p>
              Пожарная безопасность — основное направление работы нашей компании. Мы предлагаем
              полный комплекс услуг в области пожарной безопасности в Великом Новгороде и
              Новгородской области, а также в других городах Северо-Запада и Центра России.
            </p>
            <blockquote className="about__quote">
              «{company.slogan}»
            </blockquote>
            <p className="about__sign">
              С уважением,<br />
              Руководитель Центра противопожарных услуг,<br />
              Дмитрий Семыкин
            </p>
          </div>

          <aside className="about__aside">
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
    </section>
  );
}