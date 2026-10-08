import SectionTitle from "../ui/SectionTitle";
import heroBg from "../../assets/images/hero-bg.jpg";
import "./Advantages.css";

const items = [
  { title: "Бесплатный выезд специалиста", text: "Оценим объект и подготовим предложение без оплаты." },
  { title: "Поставка оборудования", text: "Любое пожарное оборудование под заказ с сертификатами." },
  { title: "Бесплатные консультации", text: "По вопросам противопожарной защиты объектов." },
  { title: "Собственное производство", text: "Лестницы и противопожарные двери по вашим эскизам." },
  { title: "Квалифицированный штат", text: "Специалисты с опытом работы в ГПС и профильным образованием." },
  { title: "Лицензия МЧС России", text: "Все работы выполняются на законных основаниях." },
];

export default function Advantages() {
  return (
    <section
      className="section advantages-section"
      id="advantages"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="container advantages-section__inner">
        <div className="reveal">
          <SectionTitle
            title="Почему выбирают нас"
            subtitle="Преимущества работы с Центром противопожарных услуг"
          />
        </div>
        <div className="grid">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="ui-card ui-card--accent tilt reveal-scale"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="advantage-num">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="ui-card__title">{it.title}</h3>
              <p className="ui-card__text">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}