import "./style.scss";
import React, { useState } from "react";

export const FaqItem = ({ question, answer, Open }: any) => {
  const [isOpen, setIsOpen] = useState(Open);
  const openAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq__item">
      <div onClick={() => openAnswer()} className="faq__item__question">
        {question}
      </div>
      <div className={`faq__item__answer ${isOpen && "open__answer"}`}>
        {answer}
      </div>
    </div>
  );
};
