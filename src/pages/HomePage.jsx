import { useEffect } from "react";
import Hero from "../components/sections/Hero";
import ServicesGrid from "../components/sections/ServicesGrid";
import Promotions from "../components/sections/Promotions";
import Training from "../components/sections/Training";
import Advantages from "../components/sections/Advantages";
import PortfolioSlider from "../components/sections/PortfolioSlider";
import Contacts from "../components/sections/Contacts";
import SparksBackground from "../components/ui/SparksBackground";
import { setMeta, pageMeta } from "../utils/seo";
import FlameBackground from "../components/ui/FlameBackground";
import CursorTrail from "../components/ui/CursorTrail";
import FaqAccordion from "../components/sections/FaqAccordion";
import Calculator from "../components/sections/Calculator";
import BookingSection from "../components/sections/BookingSection";

export default function HomePage() {
  useEffect(() => setMeta(pageMeta.home), []);

  return (
    <div className="home-page">
      <CursorTrail />
      <FlameBackground />
      <SparksBackground count={120} />

      <div className="home-page__content">
        <Hero />
        <ServicesGrid limit={12} />
        <Promotions />
        <Training />
        <Calculator /> 
        <Advantages />
        <FaqAccordion /> 
        <BookingSection /> 
        <PortfolioSlider />
        <Contacts />
      </div>
    </div>
  );
}