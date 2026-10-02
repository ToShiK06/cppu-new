import Hero from "../components/sections/Hero";
import ServicesGrid from "../components/sections/ServicesGrid";
import Promotions from "../components/sections/Promotions";
import Training from "../components/sections/Training";
import Advantages from "../components/sections/Advantages";
import Contacts from "../components/sections/Contacts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid limit={12} />
      <Promotions />
      <Training />
      <Advantages />
      <Contacts />
    </>
  );
}