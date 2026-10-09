import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../../hooks/useChat";
import "./ChatWindow.css";

export default function ChatWindow({ onClose }) {
  const { messages, send, loading, startTraining, submitServiceLead, scenario } = useChat();
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    send(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-window animate-slide">
      <div className="chat-window__header">
        <div>
          <strong>ИИ-помощник ЦППУ</strong>
          <span className="chat-window__status">онлайн</span>
        </div>
        <button onClick={onClose} aria-label="Закрыть">×</button>
      </div>

      <div className="chat-window__body" ref={bodyRef}>
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            message={m}
            onStartTraining={startTraining}
            onServiceLead={submitServiceLead}
          />
        ))}
        {loading && <TypingIndicator />}
      </div>

      {/* Быстрые действия */}
      {!scenario && messages.length <= 2 && (
        <div className="chat-window__quick-actions">
          <button
            className="chat-window__quick"
            onClick={() => {
              send("Хочу записаться на обучение");
            }}
          >
            Записаться на обучение
          </button>
          <Link
            to="/calculator"
            className="chat-window__quick"
            onClick={onClose}
          >
            Рассчитать стоимость
          </Link>
          <button
            className="chat-window__quick"
            onClick={() => send("Какие у вас есть услуги?")}
          >
            Какие услуги есть?
          </button>
        </div>
      )}

      <div className="chat-window__footer">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={scenario ? "Введите ответ..." : "Введите сообщение..."}
          disabled={loading}
        />
        <button
          className="btn btn--primary"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}