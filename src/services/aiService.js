import axios from "axios";
import { services } from "../data/services";
import { company } from "../data/company";

const systemPrompt = `Ты — ИИ-консультант компании ${company.fullName} (${company.city}).
Ты помогаешь клиентам подобрать услуги по пожарной безопасности, обучению, монтажу и документации.
Отвечай кратко, вежливо, без смайлов и эмодзи.
Если вопрос касается конкретной услуги — предложи оставить заявку.
Адрес: ${company.address}. Телефоны: ${company.phones.join(", ")}. Email: ${company.email}.
Список услуг: ${services.map((s) => s.title).join("; ")}.`;

export async function sendMessageToAI(messages) {
  const endpoint = process.env.REACT_APP_AI_ENDPOINT;
  const apiKey = process.env.REACT_APP_AI_API_KEY;

  if (!endpoint) {
    return "ИИ-помощник временно недоступен. Оставьте заявку через форму, и мы свяжемся с вами.";
  }

  try {
    const { data } = await axios.post(
      endpoint,
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.text })),
        ],
      },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    return data.choices?.[0]?.message?.content ?? "Не удалось получить ответ.";
  } catch (e) {
    return "Произошла ошибка. Попробуйте позже или позвоните нам.";
  }
}