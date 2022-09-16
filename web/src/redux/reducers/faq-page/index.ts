import { createSlice } from "@reduxjs/toolkit";
import { DictionaryKeys } from "src/components/t/dictionary";
import { faqData } from "src/redux/reducers/faq-page/faq-data";

export interface FaqPageState {
  faqData: Array<{
    title: DictionaryKeys<`faq-topic-${number}`>;
    questions: Array<{
      question: DictionaryKeys<`faq-topic-${number}-question-${number}`>;
      answer: DictionaryKeys<`faq-topic-${number}-answer-${number}`>;
    }>;
  }>;
}

export const faqPage = createSlice({
  name: "faqPage",
  initialState: {
    faqData,
  } as FaqPageState,
  reducers: {},
});
