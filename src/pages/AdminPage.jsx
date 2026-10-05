import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login, logout } from "../services/auth";
import {
  subscribeLeads,
  subscribeTrainingRequests,
  updateLeadStatus,
  deleteLead,
} from "../services/firestore";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { formatDate } from "../utils/helpers";
import { exportToCSV } from "../utils/csv";
import "./AdminPage.css";

export default function AdminPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const unsubLeads = subscribeLeads((data) => {
      setLeads(data);
      setLoading(false);
    });
    const unsubTraining = subscribeTrainingRequests(setTraining);
    return () => {
      unsubLeads();
      unsubTraining();
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

  const data = tab === "leads" ? leads : training;

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        (item.name || "").toLowerCase().includes(q) ||
        (item.phone || "").toLowerCase().includes(q) ||
        (item.message || "").toLowerCase().includes(q) ||
        (item.email || "").toLowerCase().includes(q);

      const status = item.status || "new";
      const matchStatus = statusFilter === "all" || status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter]);

  const handleExport = () => {
    const columns = [
      { label: "Имя", value: "name" },
      { label: "Телефон", value: "phone" },
      { label: "Email", value: "email" },
      { label: "Сообщение", value: "message" },
      { label: "Тип", value: "type" },
      { label: "Статус", value: (r) => r.status || "new" },
      { label: "Дата", value: (r) => formatDate(r.createdAt) },
    ];
    const filename = tab === "leads" ? "leads.csv" : "training.csv";
    exportToCSV(filtered, columns, filename);
  };

  if (!user) {
    return (
      <section className="section">
        <div className="container admin-login animate-up">
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

  return (
    <section className="section">
      <div className="container admin">
        <div className="admin__header animate-down">
          <h1>Админ-панель</h1>
          <div>
            <span className="admin__user">{user.email}</span>
            <button className="admin__logout" onClick={logout}>Выйти</button>
          </div>
        </div>

        <div className="admin__tabs animate-up">
          <button
            className={tab === "leads" ? "is-active" : ""}
            onClick={() => setTab("leads")}
          >
            Заявки ({leads.length})
          </button>
          <button
            className={tab === "training" ? "is-active" : ""}
            onClick={() => setTab("training")}
          >
            Обучение ({training.length})
          </button>
        </div>

        <div className="admin__filters animate-up delay-1">
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
            <option value="all">Все статусы</option>
            <option value="new">Новые</option>
            <option value="processed">Обработанные</option>
          </select>
          <Button variant="ghost" onClick={handleExport}>
            Экспорт CSV
          </Button>
        </div>

        {loading && <Loader />}
        {!loading && filtered.length === 0 && (
          <p className="admin__empty animate-up">Ничего не найдено.</p>
        )}

        <div className="admin__list">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="admin-card animate-up"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
            >
              <div className="admin-card__row">
                <strong>{item.name || "—"}</strong>
                <span>{item.phone || "—"}</span>
              </div>
              {item.email && <p className="admin-card__msg">Email: {item.email}</p>}
              {item.message && <p className="admin-card__msg">{item.message}</p>}
              <div className="admin-card__tags">
                {item.type && <span className="admin-card__tag">{item.type}</span>}
                <span className={`admin-card__status status--${item.status || "new"}`}>
                  {item.status === "processed" ? "Обработано" : "Новое"}
                </span>
              </div>
              <div className="admin-card__footer">
                <span className="admin-card__date">{formatDate(item.createdAt)}</span>
                {tab === "leads" && (
                  <div className="admin-card__actions">
                    <button onClick={() => updateLeadStatus(item.id, "processed")}>
                      Обработано
                    </button>
                    <button className="danger" onClick={() => deleteLead(item.id)}>
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}