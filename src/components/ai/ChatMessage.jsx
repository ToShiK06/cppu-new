import "./ChatMessage.css";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`msg ${isUser ? "msg--user" : "msg--ai"}`}>
      {message.text}
    </div>
  );
}