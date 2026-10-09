import { useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import {
  trainingSchedule,
  formatCourseRange,
  formatWeekday,
} from "../../data/trainingSchedule";
import "./TrainingSchedule.css";

export default function TrainingSchedule() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Сортируем курсы по дате начала
  const courses = [...trainingSchedule].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  return (
    <section className="section training-schedule-section" id="schedule">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Расписание курсов"
            subtitle="Выберите удобную дату и запишитесь на обучение"
          />
        </div>

        <div className="schedule-list reveal">
          {courses.map((course, i) => {
            const noSlots = course.slots === 0;
            return (
              <div
                key={course.id}
                className={`schedule-card ${noSlots ? "is-full" : ""}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="schedule-card__date">
                  <span className="schedule-card__date-range">
                    {formatCourseRange(course.startDate, course.endDate)}
                  </span>
                  <span className="schedule-card__weekday">
                    {formatWeekday(course.startDate)}
                  </span>
                </div>

                <div className="schedule-card__body">
                  <h3 className="schedule-card__title">{course.program}</h3>

                  <div className="schedule-card__meta">
                    <span className="schedule-card__meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {course.hours}
                    </span>
                    <span className="schedule-card__meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                      {course.format}
                    </span>
                    <span className="schedule-card__meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {course.location}
                    </span>
                  </div>

                  <div className="schedule-card__footer">
                    <div className="schedule-card__price">
                      <span className="schedule-card__price-value">
                        {course.price.toLocaleString("ru-RU")} ₽
                      </span>
                      <span className="schedule-card__slots">
                        {noSlots
                          ? "Мест нет"
                          : `Осталось ${course.slots} мест`}
                      </span>
                    </div>

                    {noSlots ? (
                      <Button variant="ghost" disabled>
                        Мест нет
                      </Button>
                    ) : (
                      <Button onClick={() => setSelectedCourse(course)}>
                        Записаться
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCourse && (
        <TrainingBookingModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </section>
  );
}

// ---------- Модалка записи ----------
import Input from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import Modal from "../ui/Modal";
import { submitTrainingRequest } from "../../services/firestore";
import { isValidPhone } from "../../utils/phone";

function TrainingBookingModal({ course, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "" });
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
      await submitTrainingRequest({
        name: form.name,
        phone: form.phone,
        courseId: course.id,
        courseProgram: course.program,
        courseDate: `${course.startDate} — ${course.endDate}`,
        coursePrice: course.price,
        courseFormat: course.format,
      });
      setStatus("success");
      setForm({ name: "", phone: "" });
      setErrors({});
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose} title="Запись на обучение">
      {status === "success" ? (
        <div className="booking-success">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p>Вы записаны на курс</p>
          <span>{course.program}</span>
          <span className="booking-success__date">
            {formatCourseRange(course.startDate, course.endDate)}
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          <div className="booking-form__course">
            <span className="booking-form__label">Курс</span>
            <strong>{course.program}</strong>
            <span className="booking-form__meta">
              {formatCourseRange(course.startDate, course.endDate)} ·{" "}
              {course.format} · {course.price.toLocaleString("ru-RU")} ₽
            </span>
          </div>

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

          <p className="booking-form__note">
            Менеджер свяжется с вами для подтверждения записи и уточнения деталей.
          </p>

          <Button type="submit" block disabled={loading}>
            {loading ? "Отправка..." : "Записаться"}
          </Button>

          {status === "error" && (
            <p className="form-error">Ошибка отправки. Попробуйте позже.</p>
          )}
        </form>
      )}
    </Modal>
  );
}