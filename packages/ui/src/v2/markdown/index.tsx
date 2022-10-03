import ReactMarkdown from "markdown-to-jsx";
import type { FC } from "react";

export interface MarkdownProps {
  t?: string;
}

// TODO-ZM: links
export const Markdown: FC<MarkdownProps> = ({ children, t }) => {
  return <ReactMarkdown children={t || (children as string)} />; // eslint-disable-line react/no-children-prop
};
