import { useState, useCallback, useEffect } from "react";
import { sendMessageToAI } from "../services/aiService";
import { saveChatMessage, submitTrainingRequest, submitLead } from "../services/firestore";
import { detectIntent, looksLikeName, looksLikePhone } from "../utils/chatIntents";
import { isValidPhone } from "../utils/phone";

const initial = [
  {
    role: "assistant",
    text: "Здравствуйте. Я помогу подобрать услугу, рассчитать стоимость или записать на обучение. Что вас интересует?",
  },
];

const getSessionId = () => {
  let id = localStorage.getItem("cppu_chat_session");
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem("cppu_chat_session", id);
  }
  return id;
};

export function useChat() {
  const [messages, setMessages] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(getSessionId);
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    initial.forEach((m) => saveChatMessage(sessionId, m).catch(() => {}));
  }, [sessionId]);

  const pushMessage = (msg) => {
    setMessages((m) => [...m, msg]);
    saveChatMessage(sessionId, msg).catch(() => {});
  };

  // ---- Обработка шагов сценария обучения ----
  const handleTrainingScenario = async (text) => {
    if (scenario.step === "name") {
      if (!looksLikeName(text)) {
        pushMessage({
          role: "assistant",
          text: "Не похоже на имя. Напишите, пожалуйста, как к вам обращаться.",
        });
        return;
      }
      const name = text.trim();
      setScenario({ ...scenario, step: "phone", name });
      pushMessage({
        role: "assistant",
        text: `Приятно познакомиться, ${name}! Оставьте номер телефона — менеджер свяжется для уточнения деталей.`,
      });
      return;
    }

    if (scenario.step === "phone") {
      const phone = text.trim();
      if (!looksLikePhone(phone) || !isValidPhone(phone)) {
        pushMessage({
          role: "assistant",
          text: "Не похоже на номер телефона. Введите в формате +7 (___) ___-__-__.",
        });
        return;
      }

      setLoading(true);
      try {
        await submitTrainingRequest({
          name: scenario.name,
          phone,
          source: "chat",
          courseProgram: "Не указано",
          courseDate: "",
          coursePrice: null,
          courseFormat: "",
        });
        pushMessage({
          role: "assistant",
          text: `Готово, ${scenario.name}! Заявка на обучение принята. Менеджер свяжется по номеру ${phone} в рабочее время.`,
          action: { type: "training-success" },
        });
        setScenario(null);
      } catch {
        pushMessage({
          role: "assistant",
          text: "Не удалось отправить заявку. Попробуйте ещё раз или позвоните по телефону 8 (8162) 782-003.",
        });
      } finally {
        setLoading(false);
      }
      return;
    }
  };

  const send = useCallback(
    async (text) => {
      if (!text.trim() || loading) return;

      const userMsg = { role: "user", text };
      pushMessage(userMsg);

      // ---- Сценарий 1: запись на обучение (в процессе) ----
      if (scenario?.type === "training") {
        await handleTrainingScenario(text);
        return;
      }

      // ---- Обычный чат ----
      setLoading(true);
      try {
        const intent = detectIntent(text);
        if (intent?.type === "training") {
          setScenario({ type: "training", step: "name", name: "", phone: "" });
          pushMessage({
            role: "assistant",
            text: "Отлично, помогу записать вас на обучение. Как вас зовут?",
          });
          return;
        }

        if (intent?.type === "service") {
          pushMessage({
            role: "assistant",
            text: `Похоже, вам подойдёт услуга «${intent.title}». Оставить заявку или открыть подробности?`,
            action: {
              type: "service",
              slug: intent.slug,
              title: intent.title,
            },
          });
          return;
        }

        const next = [...messages, userMsg];
        const reply = await sendMessageToAI(next);
        pushMessage({ role: "assistant", text: reply });
      } catch {
        pushMessage({
          role: "assistant",
          text: "Ошибка соединения. Попробуйте позже или позвоните нам: 8 (8162) 782-003.",
        });
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, scenario]
  );

  const startTraining = () => {
    setScenario({ type: "training", step: "name", name: "", phone: "" });
    pushMessage({
      role: "assistant",
      text: "Отлично, помогу записать вас на обучение. Как вас зовут?",
    });
  };

  const submitServiceLead = async ({ slug, title }) => {
    setLoading(true);
    try {
      await submitLead({
        name: "Из чата",
        phone: "—",
        message: `Заявка из чата на услугу: ${title}`,
        service: title,
        serviceSlug: slug,
        type: "service",
      });
      pushMessage({
        role: "assistant",
        text: `Принял заявку на «${title}». Менеджер свяжется с вами в ближайшее время.`,
      });
    } catch {
      pushMessage({
        role: "assistant",
        text: "Не удалось отправить заявку. Попробуйте ещё раз или позвоните: 8 (8162) 782-003.",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelScenario = () => {
    setScenario(null);
    pushMessage({
      role: "assistant",
      text: "Хорошо, отменил. Чем ещё могу помочь?",
    });
  };

  return {
    messages,
    send,
    loading,
    sessionId,
    scenario,
    startTraining,
    submitServiceLead,
    cancelScenario,
  };
}