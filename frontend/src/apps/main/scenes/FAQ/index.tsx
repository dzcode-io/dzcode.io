import { connect } from "react-redux";
import React from "react";

import { FaqItem } from "./faqitem/index";

import "./style";

export const FaqScene = ({ faqData }: any) => {
  return (
    <div className="faq">
      <header className="faq__banner">
        <h1 className="faq__banner__title">Freqently asked questions</h1>
      </header>

      <div className="faq__items">
        {faqData.map(({ question, answer }: any, index: any) => (
          <FaqItem key={index} question={question} answer={answer} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  faqData: state.FaqScene.faqData,
});

export const FaqSceneMapped = connect(mapStateToProps, null)(FaqScene);
