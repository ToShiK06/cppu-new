import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useScrollTop, useCardGlow } from "../../hooks/useScrollTop";
import { useReveal } from "../../hooks/useReveal";
import { useParallax } from "../../hooks/useParallax";
import { useTilt } from "../../hooks/useTilt";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  useScrollTop();
  useCardGlow();
  useReveal();
  useParallax();
  useTilt();

  return (
    <>
      <Header />
      <main key={pathname}>{children}</main>
      <Footer />
    </>
  );
}