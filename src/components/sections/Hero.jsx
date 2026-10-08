import { Link } from "react-router-dom";
import Typewriter from "../ui/Typewriter";
import SplitText from "../ui/SplitText";
import Counter from "../ui/Counter";
import MagneticButton from "../ui/MagneticButton";
import chelBg from "../../assets/images/chel.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      {/* Фон с параллаксом */}
      <div
        className="hero__bg"
        data-parallax
        data-speed="0.25"
        style={{ backgroundImage: `url(${chelBg})` }}
      />
      <div className="hero__overlay" />

      {/* Искры внутри hero */}
      <div className="hero__sparks" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="hero__spark"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge hero__fade" style={{ animationDelay: "0.05s" }}>
            Лицензия МЧС России · с 2009 года
          </div>

          <h1 className="hero__title hero__fade" style={{ animationDelay: "0.15s" }}>
            <SplitText text="Комплексная защита" />
            <br />
            <span className="hero__accent">
              <Typewriter
                words={[
                  "вашего объекта",
                  "вашего бизнеса",
                  "жизни и здоровья",
                  "вашего дома",
                ]}
              />
            </span>
          </h1>

          <p className="hero__subtitle hero__fade" style={{ animationDelay: "0.3s" }}>
            Проектирование, монтаж, обслуживание и обучение. Великий Новгород
            и Новгородская область, Северо-Запад и Центр России.
          </p>

          <div className="hero__actions hero__fade" style={{ animationDelay: "0.45s" }}>
            <MagneticButton
              as={Link}
              to="/services"
              className="btn btn--primary hero__cta"
              strength={0.5}
            >
              Каталог услуг
            </MagneticButton>
            <MagneticButton
              as={Link}
              to="/contacts"
              className="btn btn--ghost"
              strength={0.5}
            >
              Бесплатный выезд специалиста
            </MagneticButton>
          </div>

          <div className="hero__stats hero__fade" style={{ animationDelay: "0.6s" }}>
            <div>
              <strong>
                <Counter to={38} />
              </strong>
              <span>услуг</span>
            </div>
            <div>
              <strong>
                <Counter to={16} />
                <span style={{ color: "var(--accent)" }}>–72</span>
              </strong>
              <span>часа обучения</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>поддержка</span>
            </div>
          </div>
        </div>
      </div>

      {/* Индикатор скролла */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-dot" />
      </div>
    </section>
  );
}