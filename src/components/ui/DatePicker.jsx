import { useState, useMemo, useRef, useEffect } from "react";
import "./DatePicker.css";

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function DatePicker({ value, onChange, label = "Дата выезда" }) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const ref = useRef(null);

  // Закрываем по клику вне
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const days = useMemo(() => {
    const first = new Date(viewMonth.year, viewMonth.month, 1);
    const startWeekday = (first.getDay() + 6) % 7; // 0=понедельник
    const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();

    const arr = [];
    for (let i = 0; i < startWeekday; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(new Date(viewMonth.year, viewMonth.month, d));
    }
    return arr;
  }, [viewMonth]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPast = (d) => d < today;
  const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;
  const isDisabled = (d) => isPast(d) || isWeekend(d);

  const isSelected = (d) => {
    if (!value) return false;
    const v = new Date(value);
    return (
      d.getFullYear() === v.getFullYear() &&
      d.getMonth() === v.getMonth() &&
      d.getDate() === v.getDate()
    );
  };

  const handlePick = (d) => {
    if (isDisabled(d)) return;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  };

  const formatValue = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const prevMonth = () => {
    setViewMonth((v) => {
      const m = v.month - 1;
      return m < 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: m };
    });
  };
  const nextMonth = () => {
    setViewMonth((v) => {
      const m = v.month + 1;
      return m > 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: m };
    });
  };

  return (
    <div className="datepicker" ref={ref}>
      {label && <span className="field__label">{label}</span>}

      <button
        type="button"
        className={`datepicker__trigger input ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={value ? "" : "datepicker__placeholder"}>
          {value ? formatValue(value) : "Выберите дату"}
        </span>
        <svg
          className="datepicker__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {open && (
        <div className="datepicker__popup">
          <div className="datepicker__header">
            <button type="button" onClick={prevMonth} aria-label="Предыдущий месяц">‹</button>
            <span>{MONTHS[viewMonth.month]} {viewMonth.year}</span>
            <button type="button" onClick={nextMonth} aria-label="Следующий месяц">›</button>
          </div>

          <div className="datepicker__weekdays">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="datepicker__days">
            {days.map((d, i) => {
              if (!d) return <span key={i} className="datepicker__empty" />;
              const disabled = isDisabled(d);
              const selected = isSelected(d);
              const isToday =
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate();

              return (
                <button
                  key={i}
                  type="button"
                  className={`datepicker__day ${
                    disabled ? "is-disabled" : ""
                  } ${selected ? "is-selected" : ""} ${
                    isToday ? "is-today" : ""
                  }`}
                  onClick={() => handlePick(d)}
                  disabled={disabled}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="datepicker__footer">
            <span>Работаем по будням</span>
            {value && (
              <button
                type="button"
                className="datepicker__clear"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                Очистить
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}