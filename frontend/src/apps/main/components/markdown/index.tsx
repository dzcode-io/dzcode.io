import ReactMarkdown, { MarkdownProps } from "markdown-to-jsx";
import { LinkV2 } from "src/components/link-v2";
import React from "react";
import Typography from "@material-ui/core/Typography";

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h5",
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: "h6" } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: "subtitle1" },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: "caption", paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true, align: "justify" } },
    a: { component: LinkV2 },
    pre: { props: { style: { overflowX: "auto" } } },
  },
};
export const Markdown = (props: MarkdownProps) => {
  return <ReactMarkdown {...props} options={options as any} />;
};
