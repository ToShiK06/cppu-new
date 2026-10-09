import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="breadcrumbs" aria-label="Навигация">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isFirst = i === 0;

        return (
          <span key={i} className="breadcrumbs__item">
            {!isFirst && <span className="breadcrumbs__sep" aria-hidden="true">›</span>}

            {isLast || !item.to ? (
              <span className="breadcrumbs__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="breadcrumbs__link">
                {isFirst && (
                  <svg
                    className="breadcrumbs__home-icon"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                )}
                <span>{item.label}</span>
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}