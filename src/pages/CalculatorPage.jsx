import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
import Calculator from "../components/sections/Calculator";
import { setMeta } from "../utils/seo";
import "./CalculatorPage.css";

export default function CalculatorPage() {
  useEffect(() => {
    setMeta({
      title: "Калькулятор стоимости — ЦППУ",
      description:
        "Рассчитайте примерную стоимость услуг по пожарной безопасности. Выберите услугу, площадь объекта и район.",
    });
  }, []);

  return (
    <div className="calculator-page">
      <FlameBackground />
      <SparksBackground count={80} />

      <div className="container calculator-page__inner">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Калькулятор" }]} />
          <SectionTitle
            title="Калькулятор стоимости"
            subtitle="Подберите услугу и получите примерную стоимость за минуту"
          />
        </div>

        <Calculator />
      </div>
    </div>
  );
}