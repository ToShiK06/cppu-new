import { useEffect } from "react";

/**
 * 3D-наклон элементов с классом .tilt вслед за курсором.
 * Быстрая реакция: наклон до 6°, плавное следование.
 */
export function useTilt() {
  useEffect(() => {
    const isElement = (el) =>
      el && typeof el === "object" && typeof el.closest === "function";

    const handleMove = (e) => {
      if (!isElement(e.target)) return;
      const card = e.target.closest(".tilt");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Наклон усилен: было 4 → стало 8
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;

      card.style.transition = "transform .08s linear, box-shadow .25s ease";
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    };

    const handleLeave = (e) => {
      if (!isElement(e.target)) return;
      const card = e.target.closest(".tilt");
      if (!card) return;
      card.style.transition = "transform .4s cubic-bezier(.2, .8, .2, 1), box-shadow .3s ease";
      card.style.transform = "";
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, []);
}