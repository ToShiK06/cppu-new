import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={() => setOpen(false)}>
          <span className="header__logo-mark">ЦППУ</span>
          <span className="header__logo-sub">Центр противопожарных услуг</span>
        </Link>

        <nav className={`header__nav ${open ? "is-open" : ""}`}>
          {nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `header__link ${isActive ? "is-active" : ""}`
              }
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <div className="header__mobile-extra">
            <a href="tel:+78162782003" className="header__phone">
              8 (8162) 782-003
            </a>
            <a href="tel:+79062055400" className="header__phone">
              8 (906) 205-54-00
            </a>
            <CallbackButton />
          </div>
        </nav>

        <div className="header__actions">
          <a href="tel:+78162782003" className="header__phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            8 (8162) 782-003
          </a>
          <CallbackButton />
        </div>

        <button
          className={`header__burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}