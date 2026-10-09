export const calculatorServices = [
  {
    id: "fire-alarm",
    label: "Пожарная сигнализация",
    basePrice: 15000,
    pricePerSqm: 250,
    description: "Монтаж, проектирование и обслуживание",
  },
  {
    id: "aupp",
    label: "Пожаротушение (АУПТ)",
    basePrice: 45000,
    pricePerSqm: 800,
    description: "Автоматические установки пожаротушения",
  },
  {
    id: "fire-retardant",
    label: "Огнезащитная обработка",
    basePrice: 8000,
    pricePerSqm: 120,
    description: "Обработка конструкций огнезащитными составами",
  },
  {
    id: "evac-plans",
    label: "Планы эвакуации",
    basePrice: 1500,
    pricePerSqm: 0,
    description: "Изготовление планов эвакуации по ГОСТ",
  },
  {
    id: "cctv",
    label: "Система видеонаблюдения",
    basePrice: 25000,
    pricePerSqm: 180,
    description: "Монтаж и настройка систем видеонаблюдения",
  },
  {
    id: "security-alarm",
    label: "Охранная сигнализация",
    basePrice: 18000,
    pricePerSqm: 200,
    description: "Монтаж и обслуживание охранной сигнализации",
  },
  {
    id: "insulation-test",
    label: "Замер сопротивления изоляции",
    basePrice: 4000,
    pricePerSqm: 30,
    description: "Электролаборатория ЦППУ",
  },
  {
    id: "fire-audit",
    label: "Пожарный аудит",
    basePrice: 0,
    pricePerSqm: 0,
    description: "Бесплатное обследование объекта",
  },
];

export const calculatorAreas = [
  { id: "small", label: "до 50 м²", factor: 1 },
  { id: "medium", label: "50–200 м²", factor: 1.3 },
  { id: "large", label: "200–500 м²", factor: 1.6 },
  { id: "xlarge", label: "500–1000 м²", factor: 2 },
  { id: "huge", label: "более 1000 м²", factor: 2.5 },
];

export const calculatorDistricts = [
  { id: "novgorod", label: "Великий Новгород", factor: 1 },
  { id: "region", label: "Новгородская область", factor: 1.15 },
];

export function calculatePrice(serviceId, areaId, districtId) {
  const service = calculatorServices.find((s) => s.id === serviceId);
  const area = calculatorAreas.find((a) => a.id === areaId);
  const district = calculatorDistricts.find((d) => d.id === districtId);

  if (!service || !area || !district) return null;

  // Пожарный аудит — бесплатно
  if (service.id === "fire-audit") {
    return { min: 0, max: 0, free: true };
  }

  const base = service.basePrice + service.pricePerSqm * 100;
  const calculated = base * area.factor * district.factor;

  // Вилка ±20%
  const min = Math.round((calculated * 0.85) / 500) * 500;
  const max = Math.round((calculated * 1.2) / 500) * 500;

  return { min, max, free: false };
}

export function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}