import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Training from "../components/sections/Training";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
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
    <div className="training-page">
      <FlameBackground />
      <SparksBackground count={90} />

      <div className="container training-page__inner">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Обучение ДПО" }]} />
          <SectionTitle title={trainingCourse.title} subtitle={trainingCourse.lead} />
        </div>

        <div className="training-grid">
          <div className="dpo-card dpo-card--accent tilt reveal" style={{ transitionDelay: "0ms" }}>
            <div className="dpo-card__badge">{trainingCourse.hours}</div>
            <h3 className="dpo-card__title">
              Два курса за {trainingCourse.fullPrice} ₽
            </h3>
            <p className="dpo-card__price">{trainingCourse.price} ₽</p>
            <ul className="dpo-card__list">
              {trainingCourse.programs.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="dpo-card tilt reveal" style={{ transitionDelay: "80ms" }}>
            <div className="dpo-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3 className="dpo-card__title">Формы обучения</h3>
            <ul className="dpo-card__list">
              {trainingCourse.forms.map((f) => (
                <li key={f.title}>
                  <strong>{f.title}</strong>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="dpo-card tilt reveal" style={{ transitionDelay: "160ms" }}>
            <div className="dpo-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="dpo-card__title">Курс будет полезен</h3>
            <ul className="dpo-card__list">
              {trainingCourse.audience.map((a) => (
                <li key={a}><span>{a}</span></li>
              ))}
            </ul>
          </div>

          <div className="dpo-card tilt reveal" style={{ transitionDelay: "240ms" }}>
            <div className="dpo-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="dpo-card__title">Результат обучения</h3>
            <ul className="dpo-card__list">
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
              className="ui-card tilt reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="lecturer-avatar">
                {l.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <h3 className="ui-card__title">{l.name}</h3>
              <span className="ui-card__cat" style={{ marginTop: -4 }}>{l.role}</span>
              <p className="ui-card__text">{l.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <Training />
    </div>
  );
}