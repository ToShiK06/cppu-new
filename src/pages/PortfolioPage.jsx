import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Portfolio from "../components/sections/Portfolio";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
import { setMeta } from "../utils/seo";
import "./PortfolioPage.css";

export default function PortfolioPage() {
  useEffect(() => {
    setMeta({
      title: "Наши работы — ЦППУ",
      description:
        "Выполненные работы Центра противопожарных услуг в Великом Новгороде и Новгородской области.",
    });
  }, []);

  return (
    <div className="portfolio-page">
      <FlameBackground />
      <SparksBackground count={100} />

      <div className="container portfolio-page__inner">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Наши работы" }]} />
          <SectionTitle
            title="Наши работы"
            subtitle="Объекты, на которых мы выполняли работы по пожарной безопасности"
          />
        </div>

        <Portfolio />
      </div>
    </div>
  );
}