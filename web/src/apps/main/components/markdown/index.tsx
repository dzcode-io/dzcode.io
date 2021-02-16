import ReactMarkdown, { MarkdownToJSX } from "markdown-to-jsx";

import { FC } from "react";
import { LinkV2 } from "src/components/link-v2";
import { StateInterface } from "src/apps/main/redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Typography from "@material-ui/core/Typography";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import tomorrow from "react-syntax-highlighter/dist/esm/styles/prism/tomorrow";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";

export const Markdown: FC<ReactMarkdown> = (markdownProps) => {
  const theme = useTheme();
  const darkMode = useSelector<StateInterface, boolean>(
    (state) => state.settings.darkMode,
  );

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
          a: { component: LinkV2 },
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
                    borderColor: theme.palette.divider,
                  }}
                  {...props}
                  language={
                    props.className
                      ? props.className.replace("lang-", "")
                      : null
                  }
                  style={darkMode ? tomorrow : prism}
                />
              );
            },
          },
        },
      }}
    />
  );
};

interface ReactMarkdown {
  [key: string]: unknown;
  children: string;
  options?: MarkdownToJSX.Options;
}
