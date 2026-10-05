import { forwardRef } from "react";
import { formatPhone } from "../../utils/phone";

const PhoneInput = forwardRef(function PhoneInput(
  { label, value, onChange, required, error, ...rest },
  ref
) {
  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value);
    onChange?.(formatted);
  };

  // Ошибку показываем только если её явно передали снаружи
  const showError = Boolean(error);

  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <input
        ref={ref}
        className={`input ${showError ? "input--error" : ""}`}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+7 (___) ___-__-__"
        value={value}
        onChange={handleChange}
        required={required}
        {...rest}
      />
      {showError && <span className="field__error">{error}</span>}
    </label>
  );
});

export default PhoneInput;