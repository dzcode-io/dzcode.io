import ReactMarkdown, { MarkdownToJSX } from "markdown-to-jsx";

import { LinkV2 } from "src/components/link-v2";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Typography from "@material-ui/core/Typography";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import tomorrow from "react-syntax-highlighter/dist/esm/styles/prism/tomorrow";
import { useTheme } from "@material-ui/core/styles";

interface ReactMarkdown {
  [key: string]: unknown;
  children: string;
  options?: MarkdownToJSX.Options;
}

export const Markdown = (props: ReactMarkdown) => {
  const theme = useTheme();

  return (
    <ReactMarkdown
      {...props}
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
          a: { component: LinkV2 },
          img: { props: { style: { maxWidth: "100%" } } },
          pre: {
            component({ children: { props } }: any) {
              return (
                <SyntaxHighlighter
                  {...props}
                  language={
                    props.className
                      ? props.className.replace("lang-", "")
                      : null
                  }
                  style={theme.palette.type === "dark" ? tomorrow : prism}
                />
              );
            },
            props: { style: { overflowX: "auto" } },
          },
        },
      }}
    />
  );
};
