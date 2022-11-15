import { useColors } from "@dzcode.io/ui/dist/_hooks/use-colors";
import { useTheme } from "@dzcode.io/ui/dist/_hooks/use-theme";
import { Link } from "@dzcode.io/ui/dist/link";
import Typography from "@material-ui/core/Typography";
import ReactMarkdown, { MarkdownToJSX } from "markdown-to-jsx";
import { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";
import tomorrow from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";

export const Markdown: FC<ReactMarkdown> = ({ children, t, ...markdownProps }) => {
  const { isDarkMode } = useTheme();
  const { from } = useColors();

  return (
    <ReactMarkdown
      {...markdownProps}
      options={{
        overrides: {
          h1: {
            component: Typography,
            props: {
              gutterBottom: true,
              variant: "h5",
            },
          },
          h2: {
            component: Typography,
            props: { gutterBottom: true, variant: "h6" },
          },
          h3: {
            component: Typography,
            props: { gutterBottom: true, variant: "subtitle1" },
          },
          h4: {
            component: Typography,
            props: { gutterBottom: true, variant: "caption", paragraph: true },
          },
          p: { component: Typography, props: { paragraph: true } },
          a: { component: Link },
          img: { props: { style: { maxWidth: "100%" } } },
          code: {
            props: {
              style: {
                borderRadius: "6px",
                background: "#8882",
                padding: ".2rem .3rem",
              },
            },
          },
          pre: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            component({ children: { props } }: any) {
              return (
                <SyntaxHighlighter
                  customStyle={{
                    borderRadius: "8px",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: from("DIVIDER"),
                  }}
                  {...props}
                  language={props.className ? props.className.replace("lang-", "") : null}
                  style={isDarkMode ? tomorrow : prism}
                />
              );
            },
          },
        },
      }}
      children={t || (children as string)} // eslint-disable-line react/no-children-prop
    ></ReactMarkdown>
  );
};

interface ReactMarkdown {
  [key: string]: unknown;
  t?: string;
  options?: MarkdownToJSX.Options;
}
