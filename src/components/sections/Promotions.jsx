import { Link } from "react-router-dom";
import { promotions } from "../../data/promotions";
import SectionTitle from "../ui/SectionTitle";
import "./Promotions.css";

export default function Promotions() {
  return (
    <section className="section" id="promotions">
      <div className="container">
        <SectionTitle title="Акции" subtitle="Специальные предложения для наших клиентов" />
        <div className="grid">
          {promotions.map((p) => (
            <Link key={p.id} to={`/promotions/${p.slug}`} className="promo">
              <div className="promo__highlight">{p.highlight}</div>
              <h3>{p.title}</h3>
              <p>{p.short}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}