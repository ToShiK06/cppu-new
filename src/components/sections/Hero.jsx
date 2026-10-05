import { Link } from "react-router-dom";
import heroBg from "../../assets/images/hero-bg.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge animate-down">Лицензия МЧС России · с 2009 года</div>
          <h1 className="hero__title animate-up delay-1">
            Комплексная защита<br />
            <span className="hero__accent">вашего объекта</span>
          </h1>
          <p className="hero__subtitle animate-up delay-2">
            Проектирование, монтаж, обслуживание и обучение. Великий Новгород и Новгородская область,
            Северо-Запад и Центр России.
          </p>
          <div className="hero__actions animate-up delay-3">
            <Link to="/services" className="btn btn--primary">Каталог услуг</Link>
            <Link to="/contacts" className="btn btn--ghost">Бесплатный выезд специалиста</Link>
          </div>
          <div className="hero__stats animate-up delay-4">
            <div><strong>38</strong><span>услуг</span></div>
            <div><strong>16–72</strong><span>часа обучения</span></div>
            <div><strong>24/7</strong><span>поддержка</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}