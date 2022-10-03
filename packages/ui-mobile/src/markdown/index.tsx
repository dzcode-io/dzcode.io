import React, { VFC } from "react";
import { default as MarkdownDisplay, MarkdownIt } from "react-native-markdown-display";
import { LARGE_MARGIN_SIZE } from "src/utils/constants";

interface MarkdownProps {
  content: string;
  theme?: "dark" | "light";
  onLinkPress?: (url: string) => void;
}

export const Markdown: VFC<MarkdownProps> = ({ content, theme = "light", onLinkPress }) => {
  return (
    <MarkdownDisplay
      markdownit={MarkdownIt({ typographer: true, linkify: true })}
      style={{
        text: {
          color: theme === "dark" ? "white" : "black",
        },
        /* eslint-disable camelcase */
        bullet_list: {
          color: theme === "dark" ? "white" : "black",
        },
        ordered_list: {
          color: theme === "dark" ? "white" : "black",
        },
        fence: {
          color: theme === "dark" ? "white" : "black",
          backgroundColor: "transparent",
        },
        blockquote: {
          color: theme === "dark" ? "white" : "black",
          backgroundColor: "transparent",
        },
        code_inline: {
          color: theme === "dark" ? "white" : "black",
          backgroundColor: "transparent",
        },
        body: {
          marginHorizontal: LARGE_MARGIN_SIZE,
        },
        /* eslint-enable camelcase */
      }}
      onLinkPress={(url) => {
        onLinkPress?.(url);
        return true;
      }}
    >
      {content}
    </MarkdownDisplay>
  );
};
