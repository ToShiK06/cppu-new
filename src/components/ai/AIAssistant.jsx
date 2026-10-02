import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./AIAssistant.css";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <button className="ai-fab" onClick={() => setOpen((v) => !v)} aria-label="ИИ-помощник">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>ИИ-помощник</span>
      </button>
    </>
  );
}