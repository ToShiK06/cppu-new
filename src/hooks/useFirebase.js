import { useState } from "react";
import { submitLead } from "../services/firestore";

export function useFirebase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const send = async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await submitLead(payload);
      setSuccess(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { send, loading, error, success };
}