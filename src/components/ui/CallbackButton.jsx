import { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import PhoneInput from "./PhoneInput";
import Button from "./Button";
import { submitCallback } from "../../services/firestore";
import { isValidPhone } from "../../utils/phone";
import "./CallbackButton.css";

export default function CallbackButton() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      await submitCallback(form);
      setStatus("success");
      setForm({ name: "", phone: "" });
      setErrors({});
      setTimeout(() => {
        setOpen(false);
        setStatus(null);
      }, 2000);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStatus(null);
    setErrors({});
  };

  return (
    <>
      <button className="callback-btn" onClick={() => setOpen(true)}>
        Заказать звонок
      </button>

      <Modal open={open} onClose={handleClose} title="Заказать звонок">
        {status === "success" ? (
          <p className="callback-success">
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="callback-form" noValidate>
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

            <Button type="submit" block disabled={loading}>
              {loading ? "Отправка..." : "Отправить"}
            </Button>
            {status === "error" && <p className="form-error">Ошибка отправки.</p>}
          </form>
        )}
      </Modal>
    </>
  );
}