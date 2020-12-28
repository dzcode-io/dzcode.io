import { Action } from "src/apps/main/redux";
import { faqData } from "./faq";

export type FAQData = Array<{
  title: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}>;

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
