import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import {
  calculatorServices,
  calculatorAreas,
  calculatorDistricts,
  calculatePrice,
  formatPrice,
} from "../../data/calculator";
import "./Calculator.css";

export default function Calculator() {
  const [serviceId, setServiceId] = useState(calculatorServices[0].id);
  const [areaId, setAreaId] = useState(calculatorAreas[1].id);
  const [districtId, setDistrictId] = useState(calculatorDistricts[0].id);

  const result = useMemo(
    () => calculatePrice(serviceId, areaId, districtId),
    [serviceId, areaId, districtId]
  );

  const selectedService = calculatorServices.find((s) => s.id === serviceId);
  const selectedArea = calculatorAreas.find((a) => a.id === areaId);
  const selectedDistrict = calculatorDistricts.find((d) => d.id === districtId);

  const requestUrl = `/contacts?service=${encodeURIComponent(
    selectedService.label
  )}&area=${encodeURIComponent(selectedArea.label)}&district=${encodeURIComponent(
    selectedDistrict.label
  )}`;

  return (
    <section className="section calculator-section" id="calculator">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Калькулятор стоимости"
            subtitle="Выберите услугу, площадь объекта и район — получите примерную стоимость"
          />
        </div>

        <div className="calculator reveal">
          <div className="calculator__form">
            <div className="calculator__field">
              <label className="calculator__label">Услуга</label>
              <div className="calculator__options">
                {calculatorServices.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`calculator__option ${
                      serviceId === s.id ? "is-active" : ""
                    }`}
                    onClick={() => setServiceId(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="calculator__field">
              <label className="calculator__label">Площадь объекта</label>
              <div className="calculator__options">
                {calculatorAreas.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={`calculator__option ${
                      areaId === a.id ? "is-active" : ""
                    }`}
                    onClick={() => setAreaId(a.id)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="calculator__field">
              <label className="calculator__label">Район</label>
              <div className="calculator__options">
                {calculatorDistricts.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`calculator__option ${
                      districtId === d.id ? "is-active" : ""
                    }`}
                    onClick={() => setDistrictId(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="calculator__result">
            <div className="calculator__result-head">
              <span className="calculator__result-label">Примерная стоимость</span>
              <h3 className="calculator__result-title">{selectedService.label}</h3>
            </div>

            <div className="calculator__price">
              {result?.free ? (
                <div className="calculator__price-free">
                  <span>Бесплатно</span>
                  <p>Пожарный аудит у нас бесплатный</p>
                </div>
              ) : result ? (
                <>
                  <span className="calculator__price-value">
                    {formatPrice(result.min)}
                  </span>
                  <span className="calculator__price-dash">—</span>
                  <span className="calculator__price-value">
                    {formatPrice(result.max)}
                  </span>
                </>
              ) : (
                <span className="calculator__price-empty">—</span>
              )}
            </div>

            <p className="calculator__note">
              Точная стоимость рассчитывается после бесплатного выезда специалиста
              на объект. Выезд по Великому Новгороду — бесплатно.
            </p>

            <Link to={requestUrl} className="btn btn--primary calculator__cta">
              Оставить заявку
            </Link>

            <div className="calculator__params">
              <div>
                <span>Площадь:</span>
                <strong>{selectedArea.label}</strong>
              </div>
              <div>
                <span>Район:</span>
                <strong>{selectedDistrict.label}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}