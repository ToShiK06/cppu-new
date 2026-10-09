/**
 * Локальное распознавание намерений пользователя по ключевым словам.
 * Работает мгновенно, без запроса к LLM. Если ничего не найдено —
 * вернёт null, и сообщение пойдёт в обычный чат с GigaChat.
 */

// --- Запись на обучение ---
const TRAINING_KEYWORDS = [
  "записаться на обучение",
  "записаться на курс",
  "хочу учиться",
  "хочу обучиться",
  "нужно обучение",
  "нужно обучиться",
  "курсы по охране труда",
  "обучение по охране труда",
  "обучение пожарной безопасности",
  "обучение птм",
  "пожарно-технический минимум",
  "пройти обучение",
  "записаться на курсы",
  "дистанционное обучение",
  "удостоверение по охране труда",
  "получить удостоверение",
];

// --- Подбор услуги ---
const SERVICE_HINTS = [
  {
    keywords: ["сигнализац", "опс", "извещател", "дымов", "пожарн сигнал"],
    slug: "fire-alarm",
    title: "Пожарная сигнализация",
  },
  {
    keywords: ["пожаротушен", "аупт", "спринклер", "дренчер"],
    slug: "aupp",
    title: "Пожаротушение (АУПТ)",
  },
  {
    keywords: ["огнезащит", "огнеза", "пропитк", "обработк паркет", "обработк дерев"],
    slug: "fire-retardant",
    title: "Огнезащитная обработка",
  },
  {
    keywords: ["план эвакуац", "схем эвакуац"],
    slug: "evac-plans",
    title: "Планы эвакуации",
  },
  {
    keywords: ["видеонаблюден", "камер", "cctv"],
    slug: "cctv",
    title: "Монтаж систем видеонаблюдения",
  },
  {
    keywords: ["охранн сигнализац", "охран сигнал"],
    slug: "security-alarm",
    title: "Охранная сигнализация",
  },
  {
    keywords: ["замер сопротивлен", "изоляц", "электролаборатор"],
    slug: "insulation-test",
    title: "Замер сопротивления изоляции",
  },
  {
    keywords: ["аудит", "обследован", "проверк пожарн"],
    slug: "fire-audit",
    title: "Пожарный аудит",
  },
  {
    keywords: ["лестниц", "испытан лестниц"],
    slug: "fire-ladders-test",
    title: "Испытание пожарных лестниц",
  },
  {
    keywords: ["двер", "противопожарн двер"],
    slug: "fire-doors",
    title: "Установка противопожарных дверей",
  },
  {
    keywords: ["пожарн водопровод", "кран", "гидрант", "испытан кран"],
    slug: "hydrant-test",
    title: "Испытание пожарных кранов и гидрантов",
  },
  {
    keywords: ["расчёт категор", "категор", "взрывопожарн"],
    slug: "explosion-calc",
    title: "Расчёт категорий по взрывопожарной опасности",
  },
];

const normalize = (text) => String(text || "").toLowerCase().replace(/ё/g, "е");

/**
 * Распознаёт намерение пользователя.
 * @returns {object|null} — { type: "training" } | { type: "service", slug, title } | null
 */
export function detectIntent(text) {
  const t = normalize(text);
  if (!t) return null;

  // Обучение
  if (TRAINING_KEYWORDS.some((kw) => t.includes(kw))) {
    return { type: "training" };
  }

  // Подбор услуги
  for (const item of SERVICE_HINTS) {
    if (item.keywords.some((kw) => t.includes(kw))) {
      return { type: "service", slug: item.slug, title: item.title };
    }
  }

  return null;
}

/**
 * Проверяет, содержит ли текст похожее на телефон (хотя бы 10 цифр подряд).
 */
export function looksLikePhone(text) {
  const digits = String(text || "").replace(/\D/g, "");
  return digits.length >= 10;
}

/**
 * Проверяет, содержит ли текст имя.
 * Простая эвристика: 2+ буквы подряд с заглавной или любое слово длиной от 2 символов,
 * не похожее на вопрос.
 */
export function looksLikeName(text) {
  const t = String(text || "").trim();
  if (!t) return false;
  if (looksLikePhone(t)) return false;
  if (t.length < 2 || t.length > 80) return false;
  if (t.includes("?")) return false;
  // Исключаем очевидные вопросы и служебные слова
  const blacklist = [
    "привет", "здравствуйте", "спасибо", "да", "нет", "хочу",
    "запишите", "запиши", "хорошо", "ок",
  ];
  const lower = t.toLowerCase();
  if (blacklist.includes(lower)) return false;
  // Должны быть буквы
  return /[а-яa-z]/i.test(t);
}