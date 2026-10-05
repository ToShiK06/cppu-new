import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Training from "../components/sections/Training";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { trainingCourse } from "../data/training";
import { setMeta } from "../utils/seo";
import "./TrainingPage.css";

export default function TrainingPage() {
  useEffect(() => {
    setMeta({
      title: "Обучение ДПО — ЦППУ",
      description:
        "Охрана труда и обучение мерам пожарной безопасности. Два курса за 4 300 рублей.",
    });
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="reveal">
            <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Обучение ДПО" }]} />
            <SectionTitle title={trainingCourse.title} subtitle={trainingCourse.lead} />
          </div>

          <div className="training-grid">
            <div className="training-card reveal-scale" style={{ transitionDelay: "0ms" }}>
              <span className="service-card__cat">{trainingCourse.hours}</span>
              <h3 className="service-card__title">
                Два курса за {trainingCourse.fullPrice} рублей
              </h3>
              <p className="training-card__price">{trainingCourse.price} ₽</p>
              <ul className="training-card__list">
                {trainingCourse.programs.map((p) => (
                  <li key={p.title}>
                    <strong>{p.title}</strong>
                    <span>{p.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="training-card reveal-scale" style={{ transitionDelay: "80ms" }}>
              <h3 className="service-card__title">Формы обучения</h3>
              <ul className="training-card__list">
                {trainingCourse.forms.map((f) => (
                  <li key={f.title}>
                    <strong>{f.title}</strong>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="training-card reveal-scale" style={{ transitionDelay: "160ms" }}>
              <h3 className="service-card__title">Курс будет полезен</h3>
              <ul className="training-card__list">
                {trainingCourse.audience.map((a) => (
                  <li key={a}><span>{a}</span></li>
                ))}
              </ul>
            </div>

            <div className="training-card reveal-scale" style={{ transitionDelay: "240ms" }}>
              <h3 className="service-card__title">Результат обучения</h3>
              <ul className="training-card__list">
                {trainingCourse.results.map((r) => (
                  <li key={r}><span>{r}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="training-lecturers__title reveal">Лекторы</h3>
          <div className="grid">
            {trainingCourse.lecturers.map((l, i) => (
              <div
                key={l.name}
                className="team-card reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="team-card__initials">
                  {l.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <h3 className="team-card__name">{l.name}</h3>
                <p className="team-card__role">{l.role}</p>
                <p className="team-card__bio">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Training />
    </>
  );
}