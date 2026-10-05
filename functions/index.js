const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// Ключ OpenAI: из Secrets (process.env.OPENAI_API_KEY)
// или из functions:config:set openai.key=...
const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY ||
  (functions.config && functions.config().openai && functions.config().openai.key);

// Опциональная защита: если задан, фронт должен слать заголовок x-app-key.
// Задаётся через APP_KEY (Secrets) или functions:config:set app.key=...
const APP_KEY =
  process.env.APP_KEY ||
  (functions.config && functions.config().app && functions.config().app.key) ||
  null;

const SYSTEM_PROMPT = `Ты — ИИ-консультант компании ООО "ЦППУ" (Центр противопожарных услуг), г. Великий Новгород.
Ты помогаешь клиентам подобрать услуги по пожарной безопасности, обучению, монтажу и документации.
Отвечай кратко, вежливо, без смайлов и эмодзи.
Адрес: г. Великий Новгород, ул. Маловишерская, д. 1.
Телефоны: 8 (8162) 782-003, 8 (8162) 222-022, 8 (906) 205-54-00.
Email: info@cppu53.ru.
Если вопрос касается конкретной услуги — предложи оставить заявку на сайте или позвонить.`;

const MAX_MESSAGES = 10; // берём только последние сообщения
const MAX_TEXT = 1000;   // лимит символов на сообщение

exports.chat = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, x-app-key");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (APP_KEY && req.get("x-app-key") !== APP_KEY) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages must be a non-empty array" });
    return;
  }

  if (!OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not configured");
    res.status(500).json({ error: "AI not configured" });
    return;
  }

  // Санитизация: только user/assistant, обрезаем длину
  const clean = messages.slice(-MAX_MESSAGES).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.text || m.content || "").slice(0, MAX_TEXT),
  }));

  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...clean,
        ],
        temperature: 0.5,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const reply = data.choices?.[0]?.message?.content || "Не удалось получить ответ.";
    res.json({ reply });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "AI service error" });
  }
});