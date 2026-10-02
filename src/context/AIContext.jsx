import { createContext, useContext, useState } from "react";

const AIContext = createContext(null);

export function AIProvider({ children }) {
  const [history, setHistory] = useState([]);
  return (
    <AIContext.Provider value={{ history, setHistory }}>
      {children}
    </AIContext.Provider>
  );
}

export const useAI = () => useContext(AIContext);