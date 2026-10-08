import { useEffect } from "react";

/**
 * Двигает элементы с атрибутом data-parallax.
 * Смещение считается относительно позиции элемента в окне, а не от начала страницы —
 * так элемент не уезжает за пределы своей секции.
 */
export function useParallax() {
  useEffect(() => {
    let raf = null;

    const update = () => {
      const vh = window.innerHeight;
      const elements = document.querySelectorAll("[data-parallax]");

      elements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.2");
        const rect = el.getBoundingClientRect();

        // Пропускаем, если элемент далеко за пределами экрана
        if (rect.bottom < -200 || rect.top > vh + 200) return;

        // Сдвиг считается от центра окна до центра элемента, ограничен ±100px
        const centerOffset = rect.top + rect.height / 2 - vh / 2;
        const shift = Math.max(-100, Math.min(100, -centerOffset * speed));
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      });

      raf = null;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}