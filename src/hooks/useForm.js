import { useState } from "react";

export function useForm(initial = {}) {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await onSubmit(values);
      setStatus("success");
      setValues(initial);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return { values, setValues, setField, handleSubmit, status, loading };
}