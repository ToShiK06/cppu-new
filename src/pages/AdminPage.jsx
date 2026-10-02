import { useEffect, useState } from "react";
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
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

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

  const data = tab === "leads" ? leads : training;

  return (
    <section className="section">
      <div className="container admin">
        <div className="admin__header">
          <h1>Админ-панель</h1>
          <div>
            <span className="admin__user">{user.email}</span>
            <button className="admin__logout" onClick={logout}>Выйти</button>
          </div>
        </div>

        <div className="admin__tabs">
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

        {loading && <Loader />}
        {!loading && data.length === 0 && <p className="admin__empty">Пока нет записей.</p>}

        <div className="admin__list">
          {data.map((item) => (
            <div key={item.id} className="admin-card">
              <div className="admin-card__row">
                <strong>{item.name || "—"}</strong>
                <span>{item.phone || "—"}</span>
              </div>
              {item.message && <p className="admin-card__msg">{item.message}</p>}
              {item.type && <span className="admin-card__tag">{item.type}</span>}
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