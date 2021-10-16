import { FAQData, faqData } from "../../../_common/web";
import { Action } from "../..";

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
