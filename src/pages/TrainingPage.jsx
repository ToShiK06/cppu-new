import SectionTitle from "../components/ui/SectionTitle";
import Training from "../components/sections/Training";
import { trainingCourse } from "../data/training";
import "./TrainingPage.css";

export default function TrainingPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <SectionTitle
            title={trainingCourse.title}
            subtitle={trainingCourse.lead}
          />

          <div className="training-grid">
            <div className="training-card">
              <span className="service-card__cat">{trainingCourse.hours}</span>
              <h3 className="service-card__title">Два курса за {trainingCourse.fullPrice} рублей</h3>
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

            <div className="training-card">
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

            <div className="training-card">
              <h3 className="service-card__title">Курс будет полезен</h3>
              <ul className="training-card__list">
                {trainingCourse.audience.map((a) => (
                  <li key={a}><span>{a}</span></li>
                ))}
              </ul>
            </div>

            <div className="training-card">
              <h3 className="service-card__title">Результат обучения</h3>
              <ul className="training-card__list">
                {trainingCourse.results.map((r) => (
                  <li key={r}><span>{r}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="training-lecturers__title">Лекторы</h3>
          <div className="grid">
            {trainingCourse.lecturers.map((l) => (
              <div key={l.name} className="team-card">
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