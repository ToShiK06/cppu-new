export function setMeta({
  title,
  description,
  keywords,
  image = "https://cppu53.ru/og-image.jpg",
  url = "https://cppu53.ru",
}) {
  if (title) document.title = title;

  const setTag = (selector, attr, name, content) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  if (description) {
    setTag('meta[name="description"]', "name", "description", description);
    setTag('meta[property="og:description"]', "property", "og:description", description);
  }
  if (title) {
    setTag('meta[property="og:title"]', "property", "og:title", title);
    setTag('meta[name="twitter:title"]', "name", "twitter:title", title);
  }
  if (keywords) {
    setTag('meta[name="keywords"]', "name", "keywords", keywords);
  }

  setTag('meta[property="og:type"]', "property", "og:type", "website");
  setTag('meta[property="og:image"]', "property", "og:image", image);
  setTag('meta[property="og:url"]', "property", "og:url", url);
  setTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

export const pageMeta = {
  home: {
    title: "ЦППУ — Пожарная безопасность и обучение | Великий Новгород",
    description:
      "Комплекс услуг по пожарной безопасности: проектирование, монтаж, обслуживание, обучение. Великий Новгород и Новгородская область.",
    keywords:
      "пожарная безопасность, пожарная сигнализация, обучение пожарной безопасности, Великий Новгород, ЦППУ",
  },
  services: {
    title: "Каталог услуг — ЦППУ",
    description:
      "38 услуг по пожарной безопасности: сигнализация, пожаротушение, документация, обучение.",
    keywords:
      "пожарная сигнализация, пожаротушение, огнезащита, планы эвакуации, Великий Новгород",
  },
  training: {
    title: "Обучение ДПО — ЦППУ",
    description:
      "Охрана труда и обучение мерам пожарной безопасности. Два курса за 4 300 рублей.",
    keywords: "обучение охрана труда, обучение пожарной безопасности, ДПО, ПТМ",
  },
  about: {
    title: "О компании — ЦППУ",
    description:
      "Центр противопожарных услуг работает с 2009 года. Полный спектр услуг по пожарной безопасности.",
    keywords: "ЦППУ, центр противопожарных услуг, Великий Новгород",
  },
  contacts: {
    title: "Контакты — ЦППУ",
    description:
      "г. Великий Новгород, ул. Маловишерская, д. 1. Телефон: 8 (8162) 782-003.",
    keywords: "ЦППУ контакты, Великий Новгород, Маловишерская 1",
  },
};