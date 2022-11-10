import ReactMarkdown from "markdown-to-jsx";
import type { FC } from "react";
import { Link } from "src/link";

export interface MarkdownProps {
  t?: string;
}

export const Markdown: FC<MarkdownProps> = ({ children, t }) => {
  return (
    <ReactMarkdown
      children={t || (children as string)} // eslint-disable-line react/no-children-prop
      options={{
        overrides: {
          link: Link,
          a: Link,
        },
      }}
    />
  );
};
