export function setMeta({ title, description }) {
  if (title) document.title = title;
  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }
}

export const pageMeta = {
  home: {
    title: "ЦППУ — Пожарная безопасность и обучение | Великий Новгород",
    description:
      "Комплекс услуг по пожарной безопасности: проектирование, монтаж, обслуживание, обучение. Великий Новгород и Новгородская область.",
  },
  services: {
    title: "Каталог услуг — ЦППУ",
    description:
      "38 услуг по пожарной безопасности: сигнализация, пожаротушение, документация, обучение.",
  },
  training: {
    title: "Обучение ДПО — ЦППУ",
    description:
      "Охрана труда и обучение мерам пожарной безопасности. Два курса за 4 300 рублей.",
  },
  about: {
    title: "О компании — ЦППУ",
    description:
      "Центр противопожарных услуг работает с 2009 года. Полный спектр услуг по пожарной безопасности.",
  },
  contacts: {
    title: "Контакты — ЦППУ",
    description:
      "г. Великий Новгород, ул. Маловишерская, д. 1. Телефон: 8 (8162) 782-003.",
  },
};