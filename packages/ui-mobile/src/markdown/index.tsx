import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import React, { VFC } from "react";
import { View } from "react-native";
import { default as MarkdownDisplay, MarkdownIt } from "react-native-markdown-display";
import { LARGE_MARGIN_SIZE } from "src/_utils/constants";
import { DZCodeLoading } from "src/loading";

interface MarkdownProps {
  content: string;
  theme?: "dark" | "light";
  onLinkPress?: (url: string) => void;
}

/**
 * Markdown component used to display markdown content
 * @prop {string} content - the markdown content to display
 * @prop {string} theme - the theme of the markdown
 * @prop {Function} onLinkPress - the function to open the link
 * @example
 * <Markdown
 *    content={"# Hello world"}
 *    theme="dark"
 *    onLinkPress={url => Linking.openURL(url)}
 * />
 */
export const Markdown: VFC<MarkdownProps> = ({ content, theme = "light", onLinkPress }) => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DZCodeLoading />
      </View>
    );
  } else {
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
            fontFamily: "Roboto_400Regular",
          },
          blockquote: {
            color: theme === "dark" ? "white" : "black",
            backgroundColor: "transparent",
            fontFamily: "Roboto_400Regular",
          },
          code_inline: {
            color: theme === "dark" ? "white" : "black",
            backgroundColor: "transparent",
            fontFamily: "Roboto_400Regular",
          },
          body: {
            marginHorizontal: LARGE_MARGIN_SIZE,
            fontFamily: "Roboto_400Regular",
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
  }
};
