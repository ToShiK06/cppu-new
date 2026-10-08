import { useRef } from "react";

/**
 * Кнопка/ссылка, которая тянется за курсором.
 * strength — коэффициент притяжения, transition — скорость.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.45,
  as: Tag = "button",
  ...rest
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transition = "transform .08s linear";
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform .35s cubic-bezier(.2, .8, .2, 1)";
    el.style.transform = "";
  };

  return (
    <Tag
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}