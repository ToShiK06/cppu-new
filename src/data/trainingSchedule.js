// Расписание курсов. Даты в формате "YYYY-MM-DD".
// slots: сколько мест осталось. Если 0 — кнопка "Мест нет".

export const trainingSchedule = [
  {
    id: "ot-pb-oct-20",
    program: "Охрана труда + Пожарная безопасность",
    type: "combined",
    hours: "16–72 часа",
    price: 4300,
    startDate: "2025-10-20",
    endDate: "2025-10-24",
    format: "Очная",
    location: "Великий Новгород, ул. Маловишерская, 1",
    slots: 8,
  },
  {
    id: "ot-oct-27",
    program: "Охрана труда для руководителей и специалистов",
    type: "ot",
    hours: "40 академ. часов",
    price: 2500,
    startDate: "2025-10-27",
    endDate: "2025-10-31",
    format: "Дистанционная",
    location: "Онлайн",
    slots: 15,
  },
  {
    id: "ptm-nov-05",
    program: "Пожарно-технический минимум",
    type: "ptm",
    hours: "16–28 академ. часов",
    price: 2500,
    startDate: "2025-11-05",
    endDate: "2025-11-07",
    format: "Очная",
    location: "Великий Новгород, ул. Маловишерская, 1",
    slots: 12,
  },
  {
    id: "ot-pb-nov-17",
    program: "Охрана труда + Пожарная безопасность",
    type: "combined",
    hours: "16–72 часа",
    price: 4300,
    startDate: "2025-11-17",
    endDate: "2025-11-21",
    format: "Выездная",
    location: "На объекте заказчика",
    slots: 20,
  },
  {
    id: "dpo-dec-02",
    program: "ДПО по пожарной безопасности",
    type: "dpo",
    hours: "от 16 академ. часов",
    price: 3500,
    startDate: "2025-12-02",
    endDate: "2025-12-05",
    format: "Дистанционная",
    location: "Онлайн",
    slots: 25,
  },
];

// Помощник: форматирует дату в "20 октября"
export function formatCourseDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

// Помощник: формат "20 – 24 октября 2025"
export function formatCourseRange(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const sameMonth = start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${start.getDate()} – ${end.getDate()} ${start.toLocaleDateString(
      "ru-RU",
      { month: "long", year: "numeric" }
    )}`;
  }
  return `${start.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  })} – ${end.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

// День недели: "Понедельник"
export function formatWeekday(iso) {
  const d = new Date(iso);
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return days[d.getDay()];
}