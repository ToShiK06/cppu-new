import { useState, useCallback } from "react";
import { sendMessageToAI } from "../services/aiService";

const initial = [
  { role: "assistant", text: "Здравствуйте. Я помогу подобрать услугу, рассчитать стоимость или записать на обучение. Что вас интересует?" },
];

export function useChat() {
  const [messages, setMessages] = useState(initial);
  const [loading, setLoading] = useState(false);

  const send = useCallback(async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", text };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await sendMessageToAI(next);
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Ошибка соединения." }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  return { messages, send, loading };
}