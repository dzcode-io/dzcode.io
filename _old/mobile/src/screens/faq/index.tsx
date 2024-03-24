import { useNavigation } from "@dzcode.io/ui-mobile/dist/_hooks/use-navigation";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { List } from "@dzcode.io/ui-mobile/dist/list";
import { Markdown } from "@dzcode.io/ui-mobile/dist/markdown";
import { Text } from "@dzcode.io/ui-mobile/dist/text/text";
import React, { FC } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useFaqSliceSelector } from "src/redux/reducers/faq-screen/slice";
import { globalStyles } from "src/styles/global";
import { openLink } from "src/utils/link";

import { faqStyles } from "./styles";

export const FAQScreen: FC = () => {
  const navigation = useNavigation<any>();
  const { data } = useFaqSliceSelector();

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
                    <Markdown content={answer} onLinkPress={(url) => openLink(url, navigation)} />
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
