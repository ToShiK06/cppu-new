require("dotenv").config({ path: ".env.local" });

const express = require("express");
const cors = require("cors");
const https = require("https");
const axios = require("axios");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json({ limit: "200kb" }));

const PORT = process.env.PORT || 3001;

const GIGACHAT_CLIENT_ID = process.env.GIGACHAT_CLIENT_ID;
const GIGACHAT_CLIENT_SECRET = process.env.GIGACHAT_CLIENT_SECRET;
const APP_KEY = process.env.APP_KEY || null;

const SYSTEM_PROMPT = `Ты — ИИ-консультант компании ООО "ЦППУ" (Центр противопожарных услуг), г. Великий Новгород.
Ты помогаешь клиентам подобрать услуги по пожарной безопасности, обучению, монтажу и документации.
Отвечай кратко, вежливо, без смайлов и эмодзи.
Адрес: г. Великий Новгород, ул. Маловишерская, д. 1.
Телефоны: 8 (8162) 782-003, 8 (8162) 222-022, 8 (906) 205-54-00.
Email: info@cppu53.ru.
Если вопрос касается конкретной услуги — предложи оставить заявку на сайте или позвонить.`;

const MAX_MESSAGES = 10;
const MAX_TEXT = 1000;

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

let gigaToken = null;
let gigaTokenExpiry = 0;

async function getGigaToken() {
  if (gigaToken && Date.now() < gigaTokenExpiry - 60000) {
    return gigaToken;
  }

    const basic = GIGACHAT_CLIENT_SECRET;

  const body = new URLSearchParams({ scope: "GIGACHAT_API_PERS" });

  const { data } = await axios.post(
    "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
    body.toString(),
    {
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        RqUID: crypto.randomUUID(),
      },
      httpsAgent,
      timeout: 15000,
    }
  );

  gigaToken = data.access_token;
  gigaTokenExpiry = data.expires_at;
  return gigaToken;
}

app.post("/chat", async (req, res) => {
  try {
    if (APP_KEY && req.get("x-app-key") !== APP_KEY) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages must be a non-empty array" });
    }

    if (!GIGACHAT_CLIENT_ID || !GIGACHAT_CLIENT_SECRET) {
      return res.status(500).json({ error: "AI not configured" });
    }

    const token = await getGigaToken();

    const clean = messages.slice(-MAX_MESSAGES).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.text || m.content || "").slice(0, MAX_TEXT),
    }));

    const { data } = await axios.post(
      "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
      {
        model: "GigaChat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...clean,
        ],
        temperature: 0.5,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        httpsAgent,
        timeout: 30000,
      }
    );

    const reply = data.choices?.[0]?.message?.content || "Не удалось получить ответ.";
    res.json({ reply });
  } catch (err) {
    console.error("GigaChat error:", err?.response?.data || err.message);
    res.status(500).json({ error: "AI service error" });
  }
});

app.get("/", (req, res) => {
  res.json({ ok: true, service: "cppu-ai" });
});

app.listen(PORT, () => {
  console.log(`AI server listening on port ${PORT}`);
});