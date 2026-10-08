import { useEffect, useRef } from "react";
import "./CursorTrail.css";

export default function CursorTrail() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    let last = 0;

    const onMove = (e) => {
      const now = Date.now();
      if (now - last < 60) return;
      last = now;

      const spark = document.createElement("span");
      spark.className = "cursor-spark";
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      container.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} className="cursor-trail" aria-hidden="true" />;
}