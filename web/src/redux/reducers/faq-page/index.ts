import { Action } from "src/redux";

import { FAQData, faqData } from "./faq-data";

export interface FaqPageState {
  faqData: FAQData;
}

export const faqPage = (
  state: FaqPageState = {
    faqData,
  },
  action: Action<FaqPageState>,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
