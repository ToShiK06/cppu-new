import { useEffect, useState } from "react";
import "./RotatingWords.css";

/**
 * Плавная смена слов — fade + slide.
 * Слово уходит вверх, приходит снизу. Без размытия и печатания.
 */
export default function RotatingWords({
  words = [],
  interval = 2800,
  duration = 600,
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!words.length) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, duration);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval, duration]);

  return (
    <span className="rotating-words">
      <span
        className={`rotating-words__item ${visible ? "is-visible" : "is-hidden"}`}
      >
        {words[index]}
      </span>
    </span>
  );
}