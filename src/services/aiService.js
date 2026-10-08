import axios from "axios";

const ENDPOINT =
  process.env.REACT_APP_AI_ENDPOINT || "https://cppu-ai.layero.app/chat";

export async function sendMessageToAI(messages) {
  try {
    const { data } = await axios.post(
      ENDPOINT,
      {
        messages: messages.map((m) => ({ role: m.role, text: m.text })),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-key": process.env.REACT_APP_AI_APP_KEY || "",
        },
        timeout: 60000,
      }
    );
    return data.reply ?? "Не удалось получить ответ.";
  } catch (e) {
    console.error("AI error:", e?.response?.data || e.message);
    return "Произошла ошибка. Попробуйте позже или позвоните нам.";
  }
}