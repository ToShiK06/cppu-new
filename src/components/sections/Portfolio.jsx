import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import { portfolioWorks } from "../../data/portfolio";
import { getPortfolioImage } from "../../utils/portfolioImages";
import "./Portfolio.css";

const PAGE_SIZE = 6;

export default function Portfolio() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [city, setCity] = useState("Все");
  const [year, setYear] = useState("Все");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Категории
  const categories = useMemo(() => {
    const set = new Set(portfolioWorks.map((w) => w.category).filter(Boolean));
    return ["Все", ...Array.from(set).sort()];
  }, []);

  // Города
  const cities = useMemo(() => {
    const set = new Set();
    portfolioWorks.forEach((w) => {
      if (!w.city) return;
      w.city.split(",").forEach((c) => set.add(c.trim()));
    });
    return ["Все", ...Array.from(set).sort()];
  }, []);

  // Годы — приводим к строкам
  const years = useMemo(() => {
    const set = new Set(portfolioWorks.map((w) => String(w.year)).filter(Boolean));
    return ["Все", ...Array.from(set).sort((a, b) => b - a)];
  }, []);

  // Фильтрация
  const filtered = useMemo(() => {
    return portfolioWorks.filter((w) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        w.title.toLowerCase().includes(q) ||
        (w.short || "").toLowerCase().includes(q) ||
        (w.city || "").toLowerCase().includes(q);

      const matchCategory = category === "Все" || w.category === category;
      const matchCity = city === "Все" || (w.city || "").includes(city);
      const matchYear = year === "Все" || String(w.year) === year;

      return matchSearch && matchCategory && matchCity && matchYear;
    });
  }, [search, category, city, year]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, category, city, year]);

  const visibleWorks = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = () => {
    setSearch("");
    setCategory("Все");
    setCity("Все");
    setYear("Все");
  };

  const isFiltered =
    search || category !== "Все" || city !== "Все" || year !== "Все";

  // Правильные формы для слова «работа»
  const worksWord = (n) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return "работа";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "работы";
    return "работ";
  };

  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Выполненные работы"
            subtitle="Объекты, на которых мы работали"
          />
        </div>

        <div className="portfolio-filters reveal">
          <input
            type="text"
            className="input portfolio-filters__search"
            placeholder="Поиск по названию или адресу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="portfolio-filters__row">
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "Все" ? "Все категории" : c}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === "Все" ? "Все города" : c}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === "Все" ? "Все годы" : y}
                </option>
              ))}
            </select>

            {isFiltered && (
              <button
                className="portfolio-filters__reset"
                onClick={resetFilters}
                type="button"
              >
                Сбросить
              </button>
            )}
          </div>

          <div className="portfolio-filters__result">
            Найдено: <strong>{filtered.length}</strong>{" "}
            {worksWord(filtered.length)}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="portfolio-empty">
            Ничего не найдено. Попробуйте изменить фильтры.
          </p>
        ) : (
          <div className="portfolio-grid">
            {visibleWorks.map((w, i) => {
              const cover = getPortfolioImage(w.cover);
              return (
                <Link
                  key={w.slug}
                  to={`/portfolio/${w.slug}`}
                  className="portfolio-card ui-card tilt reveal"
                  style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                >
                  {cover && (
                    <div className="portfolio-card__cover">
                      <img src={cover} alt={w.title} loading="lazy" />
                    </div>
                  )}
                  <div className="portfolio-card__body">
                    <div className="portfolio-card__meta">
                      <span className="ui-card__cat">{w.city}</span>
                      <span className="portfolio-card__year">{w.year}</span>
                    </div>
                    <h3 className="ui-card__title">{w.title}</h3>
                    <p className="ui-card__text">{w.short}</p>
                  </div>
                  <span className="ui-card__arrow portfolio-card__arrow">→</span>
                </Link>
              );
            })}
          </div>
        )}

        {hasMore && (
          <div className="portfolio-more">
            <Button
              variant="ghost"
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            >
              Показать ещё {Math.min(PAGE_SIZE, filtered.length - visibleCount)}
            </Button>
            <span className="portfolio-more__counter">
              Показано {visibleCount} из {filtered.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}