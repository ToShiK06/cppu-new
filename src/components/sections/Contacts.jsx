import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import Input from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import Button from "../ui/Button";
import { company } from "../../data/company";
import { submitLead } from "../../services/firestore";
import { isValidPhone } from "../../utils/phone";
import "./Contacts.css";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

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
      await submitLead(form);
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contacts">
      <div className="container">
        <SectionTitle title="Контакты" subtitle="Свяжитесь с нами удобным способом" />
        <div className="contacts">
          <div className="contacts__info reveal-left">
            <div className="contacts__item">
              <span className="contacts__label">Адрес</span>
              <p>{company.address}</p>
            </div>
            <div className="contacts__item">
              <span className="contacts__label">Телефоны</span>
              {company.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\D/g, "")}`}>{p}</a>
              ))}
            </div>
            <div className="contacts__item">
              <span className="contacts__label">Email</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </div>
          <form className="contacts__form reveal-right" onSubmit={handleSubmit} noValidate>
            <h3>Заказать выезд специалиста</h3>

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
              <span className="field__label">Сообщение</span>
              <textarea
                className="input"
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Опишите задачу"
              />
            </label>

            <Button type="submit" block>Отправить заявку</Button>
            {status === "success" && <p className="form-success">Заявка отправлена.</p>}
            {status === "error" && <p className="form-error">Ошибка отправки.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}