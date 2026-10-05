import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CallbackButton from "../ui/CallbackButton";
import "./Header.css";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/training", label: "Обучение ДПО" },
  { to: "/portfolio", label: "Наши работы" },
  { to: "/media", label: "Медиа" },
  { to: "/reviews", label: "Отзывы" },
  { to: "/vacancies", label: "Вакансии" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-mark">ЦППУ</span>
          <span className="header__logo-sub">Центр противопожарных услуг</span>
        </Link>

        <nav className={`header__nav ${open ? "is-open" : ""}`}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `header__link ${isActive ? "is-active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="header__mobile-extra">
            <a href="tel:+78162782003" className="header__phone">
              8 (8162) 782-003
            </a>
            <CallbackButton />
          </div>
        </nav>

        <div className="header__actions">
          <a href="tel:+78162782003" className="header__phone">
            8 (8162) 782-003
          </a>
          <CallbackButton />
        </div>

        <button
          className="header__burger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}