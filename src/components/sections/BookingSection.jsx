import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import Input from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import DatePicker from "../ui/DatePicker";
import Button from "../ui/Button";
import { submitLead } from "../../services/firestore";
import { isValidPhone } from "../../utils/phone";
import { company } from "../../data/company";
import "./BookingSection.css";

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Позвоним в течение 15 минут",
    text: "Согласуем удобное время и уточним детали",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Оценка объекта бесплатно",
    text: "Выезд по Великому Новгороду — без оплаты",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Работаем с 2009 года",
    text: "Лицензия МЧС России, собственный штат",
  },
];

export default function BookingSection() {
  const [form, setForm] = useState({ name: "", phone: "", date: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await submitLead({
        name: form.name,
        phone: form.phone,
        preferredDate: form.date || null,
        type: "visit-request",
        message: form.date
          ? `Заявка на выезд. Желаемая дата: ${form.date}`
          : "Заявка на выезд без указания даты",
      });
      setStatus("success");
      setForm({ name: "", phone: "", date: "" });
      setErrors({});
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section booking-section" id="booking">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Записаться на выезд специалиста"
            subtitle="Выберите удобную дату, и мы приедем на объект для бесплатной оценки"
          />
        </div>

        <div className="booking reveal">
          <div className="booking__left">
            <ul className="booking__features">
              {FEATURES.map((f) => (
                <li key={f.title} className="booking__feature">
                  <span className="booking__feature-icon">{f.icon}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <span>{f.text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="booking__contact">
              <span className="booking__contact-label">Или позвоните нам</span>
              <a href={`tel:${company.phones[0].replace(/\D/g, "")}`} className="booking__phone">
                {company.phones[0]}
              </a>
              <a href={`tel:${company.phones[2].replace(/\D/g, "")}`} className="booking__phone booking__phone--muted">
                {company.phones[2]}
              </a>
            </div>
          </div>

          <div className="booking__right">
            {status === "success" ? (
              <div className="booking__success">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Заявка принята</h3>
                <p>Мы позвоним в течение 15 минут в рабочее время и согласуем точную дату выезда.</p>
                <button
                  type="button"
                  className="booking__reset"
                  onClick={() => setStatus(null)}
                >
                  Оставить ещё одну заявку
                </button>
              </div>
            ) : (
              <form className="booking__form" onSubmit={handleSubmit} noValidate>
                <h3 className="booking__form-title">Выберите дату и оставьте заявку</h3>

                <div>
                  <Input
                    label="Ваше имя"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    placeholder="Иван Иванов"
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

                <DatePicker
                  label="Желаемая дата выезда"
                  value={form.date}
                  onChange={(iso) => setForm({ ...form, date: iso })}
                />

                <Button type="submit" block disabled={loading}>
                  {loading ? "Отправка..." : "Записаться на выезд"}
                </Button>

                <p className="booking__form-note">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </p>

                {status === "error" && (
                  <p className="form-error">Ошибка отправки. Попробуйте позже.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}