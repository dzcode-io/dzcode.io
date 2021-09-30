import React, { FC } from "react";
import { SafeAreaView, View, ScrollView, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, List } from "react-native-paper";
import { globalStyles } from "../../styles/global";
import { faqStyles } from "./styles";
import { useSelector } from "react-redux";
import { FaqScreenState } from "../../redux/reducers/faq-screen";
import { GeneralState } from "../../redux/reducers/general";
import { StateInterface } from "../../redux";
import Markdown from "react-native-markdown-display";

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
                      bullet_list: {
                        color: theme === "dark" ? "white" : "black",
                      },
                      ordered_list: {
                        color: theme === "dark" ? "white" : "black",
                      },
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
                      if (url.startsWith("http")) {
                        Linking.openURL(url);
                        return true;
                      } else {
                        navigation.navigate(url);
                        return true;
                      }
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
