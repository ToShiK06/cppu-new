import { Link } from "react-router-dom";
import { company } from "../../data/company";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="footer__logo">ЦППУ</div>
          <p className="footer__muted">{company.fullName}</p>
          <p className="footer__muted">{company.address}</p>
        </div>
        <div className="footer__col">
          <h4>Разделы</h4>
          <Link to="/services">Услуги</Link>
          <Link to="/training">Обучение ДПО</Link>
          <Link to="/portfolio">Наши работы</Link>
          <Link to="/about">О компании</Link>
        </div>
        <div className="footer__col">
          <h4>Контакты</h4>
          {company.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/\D/g, "")}`}>{p}</a>
          ))}
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© {company.year} {company.fullName}. Все права защищены.</p>
          <p className="footer__disclaimer">
            Сайт носит информационный характер и не является публичной офертой (ч. 2 ст. 437 ГК РФ).
          </p>
        </div>
      </div>
    </footer>
  );
}