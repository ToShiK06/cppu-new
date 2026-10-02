export default function Select({ label, options = [], ...rest }) {
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <select className="input" {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}