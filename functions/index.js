const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const SYSTEM_PROMPT = `Ты — ИИ-консультант компании ООО "ЦППУ" (Центр противопожарных услуг), г. Великий Новгород.
Ты помогаешь клиентам подобрать услуги по пожарной безопасности, обучению, монтажу и документации.
Отвечай кратко, вежливо, без смайлов и эмодзи.
Адрес: г. Великий Новгород, ул. Маловишерская, д. 1.
Телефоны: 8 (8162) 782-003, 8 (8162) 222-022, 8 (906) 205-54-00.
Email: info@cppu53.ru.
Если вопрос касается конкретной услуги — предложи оставить заявку на сайте или позвонить.`;

exports.chat = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages } = req.body;
  if (!Array.isArray(messages)) {
    res.status(400).json({ error: "messages must be an array" });
    return;
  }

  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role, content: m.text })),
        ],
        temperature: 0.5,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = data.choices?.[0]?.message?.content || "Не удалось получить ответ.";
    res.json({ reply });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "AI service error" });
  }
});