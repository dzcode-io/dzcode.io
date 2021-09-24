import React, { FC } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, List } from "react-native-paper";
import { globalStyles } from "../../styles/global";
import { faqStyles } from "./styles";
import { useSelector } from "react-redux";
import { FaqScreenState } from "../../redux/reducers/faq-screen";
import { StateInterface } from "../../redux";
import Markdown from "react-native-markdown-display";

export const FAQScreen: FC = () => {
  const { faqData } = useSelector<StateInterface, FaqScreenState>((state) => state.faqScreen);
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
                      body: faqStyles.description,
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
