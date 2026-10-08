import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import Input from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import Button from "../ui/Button";
import { submitTrainingRequest } from "../../services/firestore";
import { trainingCourse } from "../../data/training";
import { isValidPhone } from "../../utils/phone";
import "./Training.css";

export default function Training() {
  const [form, setForm] = useState({ name: "", phone: "" });
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
      await submitTrainingRequest(form);
      setStatus("success");
      setForm({ name: "", phone: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="training">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Обучение ДПО"
            subtitle="Охрана труда и обучение мерам пожарной безопасности"
          />
        </div>

        <div className="training reveal">
          <div className="training__info ui-card ui-card--accent tilt">
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

          <form className="training__form tilt" onSubmit={handleSubmit} noValidate>
            <h3>Оставить заявку на обучение</h3>

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
              label="Телефон для связи"
              value={form.phone}
              onChange={(val) => {
                setForm({ ...form, phone: val });
                if (errors.phone) setErrors({ ...errors, phone: null });
              }}
              error={errors.phone}
              required
            />

            <label className="training__agree">
              <input type="checkbox" required />
              <span>Даю согласие на обработку персональных данных</span>
            </label>

            <Button type="submit" block>Оставить заявку</Button>

            {status === "success" && (
              <p className="form-success">Заявка отправлена. Мы свяжемся с вами.</p>
            )}
            {status === "error" && (
              <p className="form-error">Ошибка отправки. Попробуйте позже.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}