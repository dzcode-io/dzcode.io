import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createFaqSections } from "../__mocks__/create-faqs";
import { FaqCard } from ".";

it("should render a faq card", () => {
  const faqSection = createFaqSections(1)[0];
  render(<FaqCard {...faqSection} />);
  const cardTitle = screen.getByText("faq-title-0");
  const question1 = screen.getByText("faq-question-1");
  const question2 = screen.getByText("faq-question-2");
  expect(cardTitle).toBeInTheDocument();
  expect(question1).toBeInTheDocument();
  expect(question2).toBeInTheDocument();
});

it("should show the answer of individual questions", async () => {
  const faqSection = createFaqSections(1)[0];
  render(<FaqCard {...faqSection} />);

  const question1 = screen.getByText("faq-question-1");
  userEvent.click(question1);
  const answer1 = await screen.findByText("faq-answer-1");
  expect(answer1).toBeInTheDocument();
});
