import { useState, useEffect } from "react";
import "./PhotoSlider.css";

export default function PhotoSlider({ photos = [], alt = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [photos]);

  if (!photos.length) return null;
  if (photos.length === 1) {
    return (
      <div className="photo-slider photo-slider--single">
        <img src={photos[0]} alt={alt} />
      </div>
    );
  }

  const prev = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  };
  const next = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIndex((i) => (i + 1) % photos.length);
  };

  return (
    <div className="photo-slider">
      <div
        className="photo-slider__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {photos.map((src, i) => (
          <div key={i} className="photo-slider__slide">
            <img src={src} alt={`${alt} — фото ${i + 1}`} />
          </div>
        ))}
      </div>

      <button
        className="photo-slider__arrow photo-slider__arrow--prev"
        onClick={prev}
        aria-label="Предыдущее фото"
      >
        ‹
      </button>
      <button
        className="photo-slider__arrow photo-slider__arrow--next"
        onClick={next}
        aria-label="Следующее фото"
      >
        ›
      </button>

      <div className="photo-slider__dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`photo-slider__dot ${i === index ? "is-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIndex(i);
            }}
            aria-label={`Фото ${i + 1}`}
          />
        ))}
      </div>

      <div className="photo-slider__counter">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}