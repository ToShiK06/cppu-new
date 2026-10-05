/**
 * Утилиты для работы с российскими телефонными номерами.
 */

/**
 * Оставляет только цифры.
 */
export function digitsOnly(raw = "") {
  return String(raw).replace(/\D/g, "");
}

/**
 * Форматирует в +7 (XXX) XXX-XX-XX по мере ввода.
 */
export function formatPhone(raw = "") {
  let digits = digitsOnly(raw);

  // 8XXX -> 7XXX
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  // Если не начинается с 7 — добавляем 7 в начало
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);

  const p1 = digits.slice(0, 1);   // 7
  const p2 = digits.slice(1, 4);   // код
  const p3 = digits.slice(4, 7);
  const p4 = digits.slice(7, 9);
  const p5 = digits.slice(9, 11);

  let result = "+" + p1;
  if (p2) result += " (" + p2;
  if (p2.length === 3) result += ")";
  if (p3) result += " " + p3;
  if (p4) result += "-" + p4;
  if (p5) result += "-" + p5;

  return result;
}

/**
 * Валидация: ровно 11 цифр, начинается с 7.
 */
export function isValidPhone(raw = "") {
  const digits = digitsOnly(raw);
  return digits.length === 11 && digits.startsWith("7");
}