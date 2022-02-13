import { Action } from "../..";
import { FAQData, faqData } from "./faq-data";

export interface FaqScreenState {
  faqData: FAQData;
}

export const faqScreen = (
  state: FaqScreenState = {
    faqData,
  },
  action: Action<FaqScreenState>,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
