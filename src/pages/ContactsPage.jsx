import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Contacts from "../components/sections/Contacts";
import { company } from "../data/company";
import { setMeta, pageMeta } from "../utils/seo";
import "./ContactsPage.css";

export default function ContactsPage() {
  useEffect(() => setMeta(pageMeta.contacts), []);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Контакты" }]} />
        <SectionTitle title="Контакты" subtitle="Свяжитесь с нами удобным способом" />

        <div className="contacts-page__info">
          <div className="contacts-page__col">
            <h4>Адрес</h4>
            <p>{company.address}</p>
            <p className="contacts-page__muted">{company.workingHours}</p>
          </div>
          <div className="contacts-page__col">
            <h4>Телефоны</h4>
            {company.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\D/g, "")}`}>{p}</a>
            ))}
          </div>
          <div className="contacts-page__col">
            <h4>Email</h4>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </div>
      </div>

      <Contacts />
    </section>
  );
}