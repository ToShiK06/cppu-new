import { useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { vacancies } from "../data/vacancies";
import { submitLead } from "../services/firestore";
import "./VacanciesPage.css";

export default function VacanciesPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitLead({ ...form, type: "vacancy" });
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Вакансии" }]} />
        <SectionTitle
          title="Работа в Центре Противопожарных услуг"
          subtitle="Если Вы хороший специалист в противопожарной сфере, мы всегда будем рады новым сотрудникам"
        />

        {vacancies.map((v) => (
          <div key={v.id} className="vacancy">
            <h3 className="vacancy__title">{v.title}</h3>
            <div className="vacancy__cols">
              <div>
                <h4>Требования</h4>
                <ul>{v.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
              <div>
                <h4>Обязанности</h4>
                <ul>{v.duties.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
              <div>
                <h4>Условия</h4>
                <ul>{v.conditions.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
            </div>
            <div className="vacancy__contacts">
              <p>
                Резюме с отметкой РЕЗЮМЕ отправлять на:{" "}
                <a href={`mailto:${v.contactEmail}`}>{v.contactEmail}</a>
              </p>
              <p>
                Моб. тел:{" "}
                <a href={`tel:${v.contactPhone.replace(/\D/g, "")}`}>{v.contactPhone}</a>{" "}
                — {v.contactName}
              </p>
            </div>
          </div>
        ))}

        <div className="vacancy-form">
          <h3>Отправить резюме</h3>
          <form onSubmit={handleSubmit}>
            <Input
              label="Ваше имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Телефон"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <label className="field">
              <span className="field__label">Сопроводительное письмо</span>
              <textarea
                className="input"
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Кратко о себе"
              />
            </label>
            <Button type="submit" block>Отправить</Button>
            {status === "success" && <p className="form-success">Резюме отправлено.</p>}
            {status === "error" && <p className="form-error">Ошибка отправки.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}