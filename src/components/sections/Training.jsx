import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { submitTrainingRequest } from "../../services/firestore";
import { trainingCourse } from "../../data/training";
import "./Training.css";

export default function Training() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    try {
      await submitTrainingRequest(form);
      setStatus("success");
      setForm({ name: "", phone: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="training">
      <div className="container">
        <SectionTitle
          title="Обучение ДПО"
          subtitle="Охрана труда и обучение мерам пожарной безопасности"
        />
        <div className="training">
          <div className="training__info">
            <div className="training__badge">{trainingCourse.hours}</div>
            <h3 className="training__heading">
              Два курса за {trainingCourse.fullPrice} рублей
            </h3>
            <ul className="training__list">
              {trainingCourse.programs.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.hours}</span>
                </li>
              ))}
            </ul>
            <p className="training__note">
              Результат обучения: удостоверения по «Охране труда» и «Обучению мерам пожарной безопасности».
            </p>
          </div>
          <form className="training__form" onSubmit={handleSubmit}>
            <h3>Оставить заявку на обучение</h3>
            <Input
              label="Ваше имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Иван Иванов"
              required
            />
            <Input
              label="Телефон для связи"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+7 (___) ___-__-__"
              required
            />
            <label className="training__agree">
              <input type="checkbox" required />
              <span>Даю согласие на обработку персональных данных</span>
            </label>
            <Button type="submit" block>Оставить заявку</Button>
            {status === "success" && <p className="form-success">Заявка отправлена. Мы свяжемся с вами.</p>}
            {status === "error" && <p className="form-error">Ошибка отправки. Попробуйте позже.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}