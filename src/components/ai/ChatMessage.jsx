import { Link } from "react-router-dom";
import "./ChatMessage.css";

export default function ChatMessage({ message, onStartTraining, onServiceLead }) {
  const isUser = message.role === "user";
  const action = message.action;

  return (
    <div className={`msg ${isUser ? "msg--user" : "msg--ai"}`}>
      <div className="msg__text">{message.text}</div>

      {/* Кнопки действий для услуги */}
      {action?.type === "service" && (
        <div className="msg__actions">
          <Link
            to={`/services/${action.slug}`}
            className="msg__btn msg__btn--primary"
          >
            Открыть услугу
          </Link>
          <button
            className="msg__btn msg__btn--ghost"
            onClick={() => onServiceLead?.(action)}
          >
            Оставить заявку
          </button>
        </div>
      )}

      {/* Ссылка на обучение */}
      {action?.type === "training-success" && (
        <div className="msg__actions">
          <Link to="/training" className="msg__btn msg__btn--ghost">
            Посмотреть расписание
          </Link>
        </div>
      )}
    </div>
  );
}