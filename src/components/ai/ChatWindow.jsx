import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../../hooks/useChat";
import "./ChatWindow.css";

export default function ChatWindow({ onClose }) {
  const { messages, send, loading } = useChat();
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;
    send(input);
    setInput("");
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
        {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
        {loading && <TypingIndicator />}
      </div>
      <div className="chat-window__footer">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Введите сообщение..."
        />
        <button className="btn btn--primary" onClick={handleSend} disabled={loading}>
          Отправить
        </button>
      </div>
    </div>
  );
}