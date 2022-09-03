import { DictionaryKeys } from "src/components/t/dictionary";

export type FAQData = Array<{
  title: DictionaryKeys<`faq-topic-${number}`>;
  questions: Array<{
    question: DictionaryKeys<`faq-topic-${number}-question-${number}`>;
    answer: DictionaryKeys<`faq-topic-${number}-answer-${number}`>;
  }>;
}>;

export const faqData: FAQData = [
  {
    title: "faq-topic-1",
    questions: [
      { question: "faq-topic-1-question-1", answer: "faq-topic-1-answer-1" },
      { question: "faq-topic-1-question-2", answer: "faq-topic-1-answer-2" },
      { question: "faq-topic-1-question-3", answer: "faq-topic-1-answer-3" },
    ],
  },
  {
    title: "faq-topic-2",
    questions: [
      { question: "faq-topic-2-question-1", answer: "faq-topic-2-answer-1" },
      { question: "faq-topic-2-question-2", answer: "faq-topic-2-answer-2" },
      { question: "faq-topic-2-question-3", answer: "faq-topic-2-answer-3" },
    ],
  },
  {
    title: "faq-topic-3",
    questions: [
      { question: "faq-topic-3-question-1", answer: "faq-topic-3-answer-1" },
      { question: "faq-topic-3-question-2", answer: "faq-topic-3-answer-2" },
      { question: "faq-topic-3-question-3", answer: "faq-topic-3-answer-3" },
    ],
  },
  {
    title: "faq-topic-4",
    questions: [
      { question: "faq-topic-4-question-1", answer: "faq-topic-4-answer-1" },
      { question: "faq-topic-4-question-2", answer: "faq-topic-4-answer-2" },
      { question: "faq-topic-4-question-3", answer: "faq-topic-4-answer-3" },
    ],
  },
];
