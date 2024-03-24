import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { FC } from "react";
import { View } from "react-native";
import { default as MarkdownDisplay, MarkdownIt } from "react-native-markdown-display";
import { useTheme } from "src/_hooks/use-theme";
import { LARGE_MARGIN_SIZE } from "src/_utils/constants";
import { DZCodeLoading } from "src/loading";

interface MarkdownProps {
  /**
   * the markdown content to display
   */
  content: string;
  /**
   * the function to open the link
   */
  onLinkPress?: (url: string) => void;
}

/**
 * Markdown component used to display markdown content
 * @example
 * <Markdown
 *    content={"# Hello world"}
 *    onLinkPress={url => Linking.openURL(url)}
 * />
 */
export const Markdown: FC<MarkdownProps> = ({ content, onLinkPress }) => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const { colors } = useTheme();

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <MarkdownDisplay
        markdownit={MarkdownIt({ typographer: true, linkify: true })}
        style={{
          text: {
            color: colors.secondary,
          },
          /* eslint-disable camelcase */
          bullet_list: {
            color: colors.secondary,
          },
          ordered_list: {
            color: colors.secondary,
          },
          fence: {
            color: colors.secondary,
            backgroundColor: "transparent",
            fontFamily: "Roboto_400Regular",
          },
          blockquote: {
            color: colors.secondary,
            backgroundColor: "transparent",
            fontFamily: "Roboto_400Regular",
          },
          code_inline: {
            color: colors.secondary,
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
