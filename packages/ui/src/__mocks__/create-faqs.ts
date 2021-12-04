export interface FaqSection {
  title: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export const createFaqSections = (number: number) => {
  const faqSections: FaqSection[] = [];
  for (let i = 0; i < number; i++) {
    faqSections.push({
      title: `faq-title-${i}`,
      questions: [
        {
          question: `faq-question-1`,
          answer: `faq-answer-1`,
        },
        {
          question: `faq-question-2`,
          answer: `faq-answer-2`,
        },
      ],
    });
  }
  return faqSections;
};
