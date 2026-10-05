import axios from "axios";

export async function sendMessageToAI(messages) {
  const endpoint = process.env.REACT_APP_AI_ENDPOINT;

  if (!endpoint) {
    return "ИИ-помощник временно недоступен. Оставьте заявку через форму, и мы свяжемся с вами.";
  }

  try {
    const { data } = await axios.post(
      endpoint,
      {
        messages: messages.map((m) => ({ role: m.role, text: m.text })),
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Опциональная защита от чужих запросов (см. APP_KEY в функции)
          "x-app-key": process.env.REACT_APP_AI_APP_KEY || "",
        },
        timeout: 25000,
      }
    );
    return data.reply ?? "Не удалось получить ответ.";
  } catch (e) {
    return "Произошла ошибка. Попробуйте позже или позвоните нам.";
  }
}