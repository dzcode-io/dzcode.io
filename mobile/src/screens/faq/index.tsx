import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { List, Text } from "react-native-paper";
import { useFaqSliceSelector } from "src/redux/reducers/faq-screen/slice";
import { useGeneralSliceSelector } from "src/redux/reducers/general/slice";
import { globalStyles } from "src/styles/global";
import { openLink } from "src/utils/link";

import { faqStyles } from "./styles";

export const FAQScreen: FC = () => {
  const navigation = useNavigation();
  const { data } = useFaqSliceSelector();
  const { theme } = useGeneralSliceSelector();

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        <ScrollView>
          {data.map(({ title, questions }, index) => (
            <View key={`category-${index}`}>
              <Text style={faqStyles.title}>{title}</Text>
              <List.Section>
                {questions.map(({ question, answer }, index) => (
                  <List.Accordion key={`question-${index}`} title={question}>
                    <Markdown
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
                        /* eslint-enable camelcase */
                        fence: {
                          color: theme === "dark" ? "white" : "black",
                          backgroundColor: theme === "dark" ? "black" : "white",
                        },
                        blockquote: {
                          color: theme === "dark" ? "white" : "black",
                          backgroundColor: theme === "dark" ? "black" : "white",
                        },
                        body: faqStyles.description,
                      }}
                      onLinkPress={(url) => {
                        openLink(url, navigation);
                        return true;
                      }}
                    >
                      {answer}
                    </Markdown>
                  </List.Accordion>
                ))}
              </List.Section>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
};
