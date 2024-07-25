import { Locale, useLocale } from "src/components/locale";
import { Markdown } from "src/components/markdown";

import { faqPageData } from "./faq-data";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  return (
    <main className="flex justify-center">
      <div className="flex flex-col gap-8 m-2 mt-8 mb-8 max-w-screen-md">
        <h1 className="text-xl font-bold m-auto">
          <Locale faq-header-title />
        </h1>
        {faqPageData.map(({ title, questions }, categoryIndex) => (
          <div key={categoryIndex} className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold m-auto">
              <Locale localeKey={title} />
            </h1>
            {questions.map(({ question, answer }, questionIndex) => (
              <div className="collapse bg-base-200" key={questionIndex}>
                <input type="radio" name="1" />
                <div className="collapse-title text-xl font-medium">
                  <Locale localeKey={question} />
                </div>
                <div className="collapse-content">
                  <Markdown content={localize(answer)} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
