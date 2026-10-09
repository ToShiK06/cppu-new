import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getServiceBySlug } from "../data/services";
import { getServiceDetail } from "../data/serviceDetails";
import { company } from "../data/company";
import { submitLead } from "../services/firestore";
import { isValidPhone } from "../utils/phone";
import { setMeta } from "../utils/seo";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
import Input from "../components/ui/Input";
import PhoneInput from "../components/ui/PhoneInput";
import DatePicker from "../components/ui/DatePicker";
import Button from "../components/ui/Button";
import "./ServiceDetailPage.css";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);

  const [form, setForm] = useState({ name: "", phone: "", date: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setMeta({
        title: `${service.title} — ЦППУ`,
        description: service.description,
      });
    }
  }, [service]);

  if (!service) return <Navigate to="/services" replace />;

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
        service: service.title,
        serviceSlug: service.slug,
        type: "service",
        message: `Заявка на услугу: ${service.title}${form.date ? `, желаемая дата выезда: ${form.date}` : ""}`,
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
    <div className="service-detail-page">
      <FlameBackground />
      <SparksBackground count={90} />

      <div className="container service-detail-page__inner">
        <div className="reveal">
          <Breadcrumbs
            items={[
              { label: "Главная", to: "/" },
              { label: "Услуги", to: "/services" },
              { label: service.title },
            ]}
          />
        </div>

        <div className="detail">
          <div className="detail__main">
            <div className="reveal">
              <span className="service-card__cat">{service.category}</span>
              <h1 className="detail__title">{service.title}</h1>
              <p className="detail__desc">{service.description}</p>
              <div className="detail__price">
                Стоимость: <strong>{service.price}</strong>
              </div>
            </div>

            {detail?.intro && (
              <p className="detail__intro reveal">{detail.intro}</p>
            )}

            {detail?.body?.map((p, i) => (
              <p
                key={i}
                className="detail__text reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {p}
              </p>
            ))}

            {detail?.sections?.map((s, i) => (
              <div
                key={i}
                className="detail__section tilt reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="detail__sub">{s.title}</h3>
                <ul className="detail__list">
                  {s.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <aside className="detail__aside tilt reveal-right">
            <h3>Оставить заявку</h3>

            {status === "success" ? (
              <div className="detail__success">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p>Заявка отправлена</p>
                <span>Мы свяжемся с вами в ближайшее время</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="detail__form" noValidate>
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
                  label="Удобная дата выезда"
                  value={form.date}
                  onChange={(iso) => setForm({ ...form, date: iso })}
                />

                <Button type="submit" block disabled={loading}>
                  {loading ? "Отправка..." : "Заказать выезд"}
                </Button>

                {status === "error" && (
                  <p className="form-error">Ошибка отправки. Попробуйте позже.</p>
                )}
              </form>
            )}

            <div className="detail__contacts">
              <p>{company.address}</p>
              {company.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\D/g, "")}`}>{p}</a>
              ))}
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}