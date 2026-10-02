import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content animate-up">
          <div className="hero__badge">Пожарная безопасность под ключ</div>
          <h1 className="hero__title">
            Комплексная защита<br />
            <span className="hero__accent">вашего объекта</span>
          </h1>
          <p className="hero__subtitle">
            Проектирование, монтаж, обслуживание и обучение. Великий Новгород и Новгородская область.
          </p>
          <div className="hero__actions">
            <Link to="/services" className="btn btn--primary">Каталог услуг</Link>
            <Link to="/contacts" className="btn btn--ghost">Бесплатный выезд специалиста</Link>
          </div>
          <div className="hero__stats">
            <div><strong>38</strong><span>услуг</span></div>
            <div><strong>16–72</strong><span>часа обучения</span></div>
            <div><strong>24/7</strong><span>поддержка</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}