import { Action } from "../..";
import { faqData, FAQData } from "../../../_common/web";

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
