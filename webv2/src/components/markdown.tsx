import ReactMarkdown from 'react-markdown';
import { Link } from 'src/components/link';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps): JSX.Element {
  return (
    <ReactMarkdown
      className="markdown"
      components={{
        a: Link,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
