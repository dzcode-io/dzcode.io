import Typography from "@mui/material/Typography";
import ReactMarkdown from "markdown-to-jsx";
import type { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";
import tomorrow from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
import { useColors } from "src/_hooks/use-colors";
import { useTheme } from "src/_hooks/use-theme";
import { Link } from "src/link";

export interface MarkdownProps {
  t?: string;
}

export const Markdown: FC<MarkdownProps> = ({ children, t }) => {
  const { from } = useColors();
  const { isDarkMode } = useTheme();
  return (
    <ReactMarkdown
      children={t || (children as string)} // eslint-disable-line react/no-children-prop
      options={{
        overrides: {
          link: Link,
          a: Link,
          h1: {
            component: Typography,
            props: { gutterBottom: true, variant: "h4" },
          },
          h2: {
            component: Typography,
            props: { gutterBottom: true, variant: "h5" },
          },
          h3: {
            component: Typography,
            props: { gutterBottom: true, variant: "h6" },
          },
          h4: {
            component: Typography,
            props: { gutterBottom: true, variant: "subtitle1" },
          },
          p: { component: Typography, props: { paragraph: true } },
          img: { props: { style: { maxWidth: "100%" } } },
          code: {
            props: {
              style: {
                borderRadius: "6px",
                background: from("BACKGROUND_CODE"),
                padding: ".2rem .3rem",
                maxWidth: "100%",
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
                    maxWidth: "100%",
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
    />
  );
};
