import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SELECTORS = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Небольшая задержка — даём React смонтировать новую страницу
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(SELECTORS);
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );

      // Элементы, которые уже в зоне видимости — сразу показываем
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });

      // Подхватываем элементы, которые появятся позже (напр., «Показать ещё»)
      const mutation = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          m.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            if (node.matches && node.matches(SELECTORS)) {
              observer.observe(node);
            }
            if (node.querySelectorAll) {
              node.querySelectorAll(SELECTORS).forEach((el) => observer.observe(el));
            }
          });
        });
      });

      mutation.observe(document.body, { childList: true, subtree: true });

      // Сохраняем cleanup в замыкание
      cleanupRef.observer = observer;
      cleanupRef.mutation = mutation;
    }, 0);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.observer) cleanupRef.observer.disconnect();
      if (cleanupRef.mutation) cleanupRef.mutation.disconnect();
    };
  }, [pathname]);
}

const cleanupRef = { observer: null, mutation: null };