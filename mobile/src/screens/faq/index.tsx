import { List, Text } from "react-native-paper";
import React, { FC } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { FaqScreenState } from "../../redux/reducers/faq-screen";
import { GeneralState } from "../../redux/reducers/general";
import Markdown from "react-native-markdown-display";
import { StateInterface } from "../../redux";
import { faqStyles } from "./styles";
import { globalStyles } from "../../styles/global";
import { openLink } from "../../utils/link";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const FAQScreen: FC = () => {
  const navigation = useNavigation();
  const { faqData } = useSelector<StateInterface, FaqScreenState>((state) => state.faqScreen);
  const { theme } = useSelector<StateInterface, GeneralState>((state) => state.general);

  return (
    // main view
    <SafeAreaView style={globalStyles.mainView}>
      <ScrollView>
        {faqData.map(({ title, questions }, index) => (
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
  );
};
