import SectionTitle from "../ui/SectionTitle";
import "./Portfolio.css";

const works = [
  { title: "ТЦ «Волна»", text: "Монтаж пожарной сигнализации и оповещения", year: 2024 },
  { title: "Школа №14", text: "Огнезащитная обработка и планы эвакуации", year: 2023 },
  { title: "Бизнес-центр «Славянский»", text: "АУПТ и противопожарный водопровод", year: 2024 },
  { title: "Завод «Планета»", text: "Расчёт категорий и пожарный аудит", year: 2023 },
  { title: "Отель «Интурист»", text: "Обслуживание пожарной сигнализации", year: 2024 },
  { title: "Склад «Логопарк»", text: "Противопожарные двери и ворота", year: 2023 },
];

export default function Portfolio({ limit }) {
  const list = limit ? works.slice(0, limit) : works;
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="reveal">
          <SectionTitle title="Выполненные работы" subtitle="Объекты, на которых мы работали" />
        </div>
        <div className="grid">
          {list.map((w, i) => (
            <div
              key={w.title}
              className="ui-card tilt reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="ui-card__cat">{w.year}</span>
              <h3 className="ui-card__title">{w.title}</h3>
              <p className="ui-card__text">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}