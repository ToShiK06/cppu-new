import { useState } from "react";
import "./YandexMap.css";

export default function YandexMap({ height = 420 }) {
  const lat = 58.537873;
  const lon = 31.304213;
  const [layer, setLayer] = useState("map"); // map | satellite | hybrid

  // Параметр l — слой карты: map, sat, sat,skl (гибрид)
  const layers = {
    map: "map",
    satellite: "sat",
    hybrid: "sat,skl",
  };

  const src = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=17&pt=${lon},${lat},pm2rdm&l=${layers[layer]}`;

  return (
    <div className="yandex-map-wrap">
      <div className="yandex-map__controls">
        <button
          className={layer === "map" ? "is-active" : ""}
          onClick={() => setLayer("map")}
        >
          Схема
        </button>
        <button
          className={layer === "satellite" ? "is-active" : ""}
          onClick={() => setLayer("satellite")}
        >
          Спутник
        </button>
        <button
          className={layer === "hybrid" ? "is-active" : ""}
          onClick={() => setLayer("hybrid")}
        >
          Гибрид
        </button>
      </div>

      <div className="yandex-map" style={{ height }}>
        <iframe
          src={src}
          title="Карта — ЦППУ"
          loading="lazy"
          allowFullScreen
          frameBorder="0"
        />
      </div>
    </div>
  );
}