import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="breadcrumbs__item">
            {isLast || !item.to ? (
              <span>{item.label}</span>
            ) : (
              <Link to={item.to}>{item.label}</Link>
            )}
            {!isLast && <span className="breadcrumbs__sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}