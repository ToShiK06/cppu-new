import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";
import { portfolioWorks } from "../../data/portfolio";
import { getPortfolioImage } from "../../utils/portfolioImages";
import "./PortfolioSlider.css";

export default function PortfolioSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const works = portfolioWorks;

  useEffect(() => {
    if (paused || works.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % works.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [paused, works.length]);

  if (!works.length) return null;

  const goTo = (i) => {
    setIndex((i + works.length) % works.length);
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const current = works[index];
  const cover = getPortfolioImage(current.cover);

  return (
    <section className="section portfolio-slider-section" id="portfolio">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Выполненные работы"
            subtitle="Объекты, на которых мы работали"
          />
        </div>

        <div
          className="portfolio-slider reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="portfolio-slider__viewport">
            {works.map((w, i) => {
              const img = getPortfolioImage(w.cover);
              return (
                <Link
                  key={w.slug}
                  to={`/portfolio/${w.slug}`}
                  className={`portfolio-slider__slide ${
                    i === index ? "is-active" : ""
                  }`}
                  aria-hidden={i !== index}
                  tabIndex={i === index ? 0 : -1}
                >
                  <div className="portfolio-slider__image">
                    {img && <img src={img} alt={w.title} loading="lazy" />}
                  </div>
                  <div className="portfolio-slider__overlay" />
                  <div className="portfolio-slider__info">
                    <span className="portfolio-slider__city">{w.city}</span>
                    <h3 className="portfolio-slider__title">{w.title}</h3>
                    <p className="portfolio-slider__short">{w.short}</p>
                    <span className="portfolio-slider__cta">
                      Смотреть работу
                      <span className="portfolio-slider__arrow">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}

            <button
              className="portfolio-slider__nav portfolio-slider__nav--prev"
              onClick={prev}
              aria-label="Предыдущая работа"
            >
              ‹
            </button>
            <button
              className="portfolio-slider__nav portfolio-slider__nav--next"
              onClick={next}
              aria-label="Следующая работа"
            >
              ›
            </button>

            <div className="portfolio-slider__progress">
              <span
                className="portfolio-slider__progress-bar"
                style={{
                  animationPlayState: paused ? "paused" : "running",
                }}
                key={index}
              />
            </div>
          </div>

          <div className="portfolio-slider__dots">
            {works.map((_, i) => (
              <button
                key={i}
                className={`portfolio-slider__dot ${
                  i === index ? "is-active" : ""
                }`}
                onClick={() => goTo(i)}
                aria-label={`Перейти к работе ${i + 1}`}
              />
            ))}
          </div>

          <div className="portfolio-slider__counter">
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span> / {String(works.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}