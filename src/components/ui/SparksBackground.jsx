import { useEffect, useRef } from "react";
import "./SparksBackground.css";

export default function SparksBackground({ count = 40 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const spark = document.createElement("span");
      spark.className = "spark";
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.animationDelay = `${Math.random() * 15}s`;
      spark.style.animationDuration = `${12 + Math.random() * 10}s`;
      spark.style.width = `${2 + Math.random() * 4}px`;
      spark.style.height = spark.style.width;
      container.appendChild(spark);
    }
  }, [count]);

  return <div ref={containerRef} className="sparks-bg" />;
}