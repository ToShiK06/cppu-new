import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { company } from "../../data/company";
import { submitLead } from "../../services/firestore";
import "./Contacts.css";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    try {
      await submitLead(form);
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contacts">
      <div className="container">
        <SectionTitle title="Контакты" subtitle="Свяжитесь с нами удобным способом" />
        <div className="contacts">
          <div className="contacts__info">
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
          <form className="contacts__form" onSubmit={handleSubmit}>
            <h3>Заказать выезд специалиста</h3>
            <Input label="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Телефон" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
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