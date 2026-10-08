import { useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Contacts from "../components/sections/Contacts";
import YandexMap from "../components/ui/YandexMap";
import { company } from "../data/company";
import { setMeta, pageMeta } from "../utils/seo";
import contactBg from "../assets/images/contact.jpg";
import "./ContactsPage.css";

export default function ContactsPage() {
  useEffect(() => setMeta(pageMeta.contacts), []);

  return (
    <div
      className="contacts-page"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="container contacts-page__inner">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Контакты" }]} />
          <SectionTitle title="Контакты" subtitle="Свяжитесь с нами удобным способом" />
        </div>

        <div className="contacts-page__info">
          <div className="contacts-page__col reveal" style={{ transitionDelay: "0ms" }}>
            <h4>Адрес</h4>
            <p>{company.address}</p>
            <p className="contacts-page__muted">{company.workingHours}</p>
          </div>
          <div className="contacts-page__col reveal" style={{ transitionDelay: "80ms" }}>
            <h4>Телефоны</h4>
            {company.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\D/g, "")}`}>{p}</a>
            ))}
          </div>
          <div className="contacts-page__col reveal" style={{ transitionDelay: "160ms" }}>
            <h4>Email</h4>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </div>

        <div className="contacts-page__map reveal-scale">
          <YandexMap height={420} />
        </div>
      </div>

      {/* Секция Contacts (с формой) — фон тоже с фото */}
      <div className="contacts-page__form-section">
        <Contacts />
      </div>
    </div>
  );
}