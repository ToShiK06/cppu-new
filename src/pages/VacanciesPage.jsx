import { useEffect, useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Input from "../components/ui/Input";
import PhoneInput from "../components/ui/PhoneInput";
import Button from "../components/ui/Button";
import { vacancies } from "../data/vacancies";
import { submitLead } from "../services/firestore";
import { isValidPhone } from "../utils/phone";
import { setMeta } from "../utils/seo";
import "./VacanciesPage.css";

export default function VacanciesPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMeta({
      title: "Вакансии — ЦППУ",
      description:
        "Вакансии Центра противопожарных услуг в Великом Новгороде. Монтажники слаботочных систем, инженеры, специалисты по пожарной безопасности.",
    });
  }, []);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Введите имя";
    if (!form.phone.trim()) {
      next.phone = "Введите телефон";
    } else if (!isValidPhone(form.phone)) {
      next.phone = "Введите корректный номер телефона";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitLead({ ...form, type: "vacancy" });
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Вакансии" }]} />
          <SectionTitle
            title="Работа в Центре Противопожарных услуг"
            subtitle="Если Вы хороший специалист в противопожарной сфере, мы всегда будем рады новым сотрудникам"
          />
        </div>

        {vacancies.map((v, i) => (
          <div
            key={v.id}
            className="vacancy reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
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

        <div className="vacancy-form reveal">
          <h3>Отправить резюме</h3>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <Input
                label="Ваше имя"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                required
              />
              {errors.name && <span className="field__error">{errors.name}</span>}
            </div>

            <PhoneInput
              label="Телефон"
              value={form.phone}
              onChange={(val) => {
                setForm({ ...form, phone: val });
                if (errors.phone) setErrors({ ...errors, phone: null });
              }}
              error={errors.phone}
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