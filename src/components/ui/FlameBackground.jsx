import "./FlameBackground.css";

export default function FlameBackground() {
  return (
    <div className="flame-bg" aria-hidden="true">
      <div className="flame-bg__glow" />
      <div className="flame-bg__glow flame-bg__glow--2" />
      <div className="flame-bg__glow flame-bg__glow--3" />
    </div>
  );
}