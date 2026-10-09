import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login, logout } from "../services/auth";
import {
  subscribeLeads,
  subscribeTrainingRequests,
  subscribeReviews,
  subscribeVacancyLeads,
  updateLeadStatus,
  deleteLead,
  updateReviewStatus,
  deleteReview,
  updateTrainingStatus,
  deleteTrainingRequest,
} from "../services/firestore";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { formatDate } from "../utils/helpers";
import { exportToCSV } from "../utils/csv";
import "./AdminPage.css";

const TABS = [
  { id: "leads", label: "Заявки" },
  { id: "training", label: "Обучение" },
  { id: "reviews", label: "Отзывы" },
  { id: "vacancies", label: "Вакансии" },
];

export default function AdminPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [training, setTraining] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const unsubLeads = subscribeLeads((data) => {
      setLeads(data.filter((i) => i.type !== "vacancy"));
      setLoading(false);
    });
    const unsubTraining = subscribeTrainingRequests(setTraining);
    const unsubReviews = subscribeReviews(setReviews);
    const unsubVacancies = subscribeVacancyLeads(setVacancies);
    return () => {
      unsubLeads();
      unsubTraining();
      unsubReviews();
      unsubVacancies();
    };
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  const dataByTab = {
    leads,
    training,
    reviews,
    vacancies,
  };
  const data = dataByTab[tab] || [];

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        (item.name || "").toLowerCase().includes(q) ||
        (item.author || "").toLowerCase().includes(q) ||
        (item.phone || "").toLowerCase().includes(q) ||
        (item.email || "").toLowerCase().includes(q) ||
        (item.message || "").toLowerCase().includes(q) ||
        (item.text || "").toLowerCase().includes(q);

      let status = item.status || "new";
      if (tab === "reviews" && !item.status) status = "published";

      const matchStatus =
        statusFilter === "all" || status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter, tab]);

  const handleExport = () => {
    const configs = {
      leads: [
        { label: "Имя", value: "name" },
        { label: "Телефон", value: "phone" },
        { label: "Сообщение", value: "message" },
        { label: "Статус", value: (r) => r.status || "new" },
        { label: "Дата", value: (r) => formatDate(r.createdAt) },
      ],
      training: [
        { label: "Имя", value: "name" },
        { label: "Телефон", value: "phone" },
        { label: "Статус", value: (r) => r.status || "new" },
        { label: "Дата", value: (r) => formatDate(r.createdAt) },
      ],
      reviews: [
        { label: "Автор", value: "author" },
        { label: "Текст", value: "text" },
        { label: "Статус", value: (r) => r.status || "published" },
        { label: "Дата", value: (r) => formatDate(r.createdAt) },
      ],
      vacancies: [
        { label: "Имя", value: "name" },
        { label: "Телефон", value: "phone" },
        { label: "Сообщение", value: "message" },
        { label: "Дата", value: (r) => formatDate(r.createdAt) },
      ],
    };
    exportToCSV(filtered, configs[tab] || [], `${tab}.csv`);
  };

  const counts = {
    leads: leads.length,
    training: training.length,
    reviews: reviews.length,
    vacancies: vacancies.length,
  };

  const newCounts = {
    leads: leads.filter((l) => (l.status || "new") === "new").length,
    training: training.filter((t) => (t.status || "new") === "new").length,
    reviews: 0,
    vacancies: vacancies.length,
  };

  // ---- Логин ----
  if (!user) {
    return (
      <section className="section">
        <div className="container admin-login">
          <h1>Вход в админ-панель</h1>
          <form onSubmit={handleLogin} className="admin-login__form">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" block>Войти</Button>
            {error && <p className="form-error">{error}</p>}
          </form>
        </div>
      </section>
    );
  }

  // ---- Панель ----
  return (
    <section className="section">
      <div className="container admin">
        <div className="admin__header">
          <h1>Админ-панель</h1>
          <div>
            <span className="admin__user">{user.email}</span>
            <button className="admin__logout" onClick={logout}>
              Выйти
            </button>
          </div>
        </div>

        <div className="admin__tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "is-active" : ""}
              onClick={() => {
                setTab(t.id);
                setSearch("");
                setStatusFilter("all");
              }}
            >
              {t.label}
              <span className="admin__tab-count">{counts[t.id]}</span>
              {newCounts[t.id] > 0 && (
                <span className="admin__tab-badge">{newCounts[t.id]}</span>
              )}
            </button>
          ))}
        </div>

        <div className="admin__filters">
          <input
            className="input"
            placeholder="Поиск по имени, телефону, тексту..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Все</option>
            {tab !== "reviews" && (
              <>
                <option value="new">Новые</option>
                <option value="processed">Обработанные</option>
              </>
            )}
            {tab === "reviews" && (
              <>
                <option value="published">Опубликованные</option>
                <option value="hidden">Скрытые</option>
              </>
            )}
          </select>
          <Button variant="ghost" onClick={handleExport}>
            Экспорт CSV
          </Button>
        </div>

        {loading && <Loader />}
        {!loading && filtered.length === 0 && (
          <p className="admin__empty">Ничего не найдено.</p>
        )}

        <div className="admin__list">
          {filtered.map((item) => (
            <AdminCard
              key={item.id}
              item={item}
              tab={tab}
              onUpdateLead={updateLeadStatus}
              onDeleteLead={deleteLead}
              onUpdateReview={updateReviewStatus}
              onDeleteReview={deleteReview}
              onUpdateTraining={updateTrainingStatus}
              onDeleteTraining={deleteTrainingRequest}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AdminCard({
  item,
  tab,
  onUpdateLead,
  onDeleteLead,
  onUpdateReview,
  onDeleteReview,
  onUpdateTraining,
  onDeleteTraining,
}) {
  // --- Отзывы ---
  if (tab === "reviews") {
    const status = item.status || "published";
    return (
      <div className="admin-card">
        <div className="admin-card__row">
          <strong>{item.author || "—"}</strong>
          <span className={`admin-card__status status--${status}`}>
            {status === "published" ? "Опубликован" : "Скрыт"}
          </span>
        </div>
        <p className="admin-card__msg" style={{ color: "var(--text)" }}>
          «{item.text}»
        </p>
        <div className="admin-card__footer">
          <span className="admin-card__date">{formatDate(item.createdAt)}</span>
          <div className="admin-card__actions">
            {status === "published" ? (
              <button onClick={() => onUpdateReview(item.id, "hidden")}>
                Скрыть
              </button>
            ) : (
              <button onClick={() => onUpdateReview(item.id, "published")}>
                Опубликовать
              </button>
            )}
            <button className="danger" onClick={() => onDeleteReview(item.id)}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Заявки / Обучение / Вакансии ---
  const status = item.status || "new";

  return (
    <div className="admin-card">
      <div className="admin-card__row">
        <strong>{item.name || "—"}</strong>
        <a
          href={`tel:${(item.phone || "").replace(/\D/g, "")}`}
          className="admin-card__phone"
        >
          {item.phone || "—"}
        </a>
      </div>
      {item.email && (
        <p className="admin-card__msg">
          Email:{" "}
          <a href={`mailto:${item.email}`} className="admin-card__link">
            {item.email}
          </a>
        </p>
      )}
      {item.message && <p className="admin-card__msg">{item.message}</p>}

      <div className="admin-card__tags">
        {item.type && <span className="admin-card__tag">{item.type}</span>}
        <span className={`admin-card__status status--${status}`}>
          {status === "processed" ? "Обработано" : "Новое"}
        </span>
      </div>

      <div className="admin-card__footer">
        <span className="admin-card__date">{formatDate(item.createdAt)}</span>
        <div className="admin-card__actions">
          {tab === "leads" && (
            <>
              {status !== "processed" && (
                <button onClick={() => onUpdateLead(item.id, "processed")}>
                  Обработать
                </button>
              )}
              <button className="danger" onClick={() => onDeleteLead(item.id)}>
                Удалить
              </button>
            </>
          )}
          {tab === "training" && (
            <>
              {status !== "processed" && (
                <button onClick={() => onUpdateTraining(item.id, "processed")}>
                  Обработать
                </button>
              )}
              <button
                className="danger"
                onClick={() => onDeleteTraining(item.id)}
              >
                Удалить
              </button>
            </>
          )}
          {tab === "vacancies" && (
            <button className="danger" onClick={() => onDeleteLead(item.id)}>
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}