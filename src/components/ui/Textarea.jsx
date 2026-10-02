export default function Textarea({ label, ...rest }) {
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <textarea className="input" {...rest} />
    </label>
  );
}