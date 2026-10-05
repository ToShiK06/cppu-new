import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Portfolio from "../components/sections/Portfolio";
import { setMeta } from "../utils/seo";

export default function PortfolioPage() {
  useEffect(() => {
    setMeta({
      title: "Наши работы — ЦППУ",
      description:
        "Выполненные работы Центра противопожарных услуг в Великом Новгороде и Новгородской области.",
    });
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Наши работы" }]} />
          <SectionTitle
            title="Наши работы"
            subtitle="Объекты, на которых мы выполняли работы по пожарной безопасности"
          />
        </div>
      </div>
      <Portfolio />
    </section>
  );
}