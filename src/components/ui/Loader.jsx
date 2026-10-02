import "./Loader.css";

export default function Loader({ text = "Загрузка..." }) {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      <span>{text}</span>
    </div>
  );
}