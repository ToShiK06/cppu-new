import Header from "./Header";
import Footer from "./Footer";
import { useScrollTop } from "../../hooks/useScrollTop";

export default function Layout({ children }) {
  useScrollTop();
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}