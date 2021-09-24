import { Action } from "../..";
import { faqData } from "./faq";

export type FAQData = Array<{
  title: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}>;

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
