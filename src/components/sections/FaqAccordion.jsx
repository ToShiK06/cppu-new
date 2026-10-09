import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import { faqItems } from "../../data/faq";
import "./FaqAccordion.css";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex((current) => (current === i ? -1 : i));
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="reveal">
          <SectionTitle
            title="Частые вопросы"
            subtitle="Ответы на популярные вопросы о работе Центра противопожарных услуг"
          />
        </div>

        <div className="faq-list reveal">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-item ${isOpen ? "is-open" : ""}`}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-item__number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-item__text">{item.q}</span>
                  <span className="faq-item__icon" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </button>

                <div className="faq-item__answer-wrap">
                  <div className="faq-item__answer">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}