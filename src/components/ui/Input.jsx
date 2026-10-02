export default function Input({ label, ...rest }) {
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <input className="input" {...rest} />
    </label>
  );
}