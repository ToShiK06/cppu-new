import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useScrollTop } from "../../hooks/useScrollTop";
import { useReveal } from "../../hooks/useReveal";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  useScrollTop();
  useReveal();

  return (
    <>
      <Header />
      <main key={pathname}>{children}</main>
      <Footer />
    </>
  );
}