import React, { FC, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { Text } from "react-native-paper";
import { Route } from "@react-navigation/routers";
import { Document } from "../../../_common/types";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, StateInterface } from "../../../redux";
import { LearnScreenState } from "../../../redux/reducers/learn-screen";
import { fetchDocument } from "../../../redux/actions/learn-screen";
import { GeneralState } from "../../../redux/reducers/general";
import { DZCodeLoading } from "../../../components/loading";
import Markdown from "react-native-markdown-display";
import { globalStyles } from "../../../styles/global";
import { openLink } from "../../../utils/link";
import { useNavigation } from "@react-navigation/native";
import { documentDetailsStyles } from "./styles";

interface DocumentDetailsScreenProps {
  route: Route<"DocumentDetails", RouteParams>;
}

interface RouteParams {
  document: Document;
}

export const DocumentDetailsScreen: FC<DocumentDetailsScreenProps> = ({
  route,
}: DocumentDetailsScreenProps) => {
  const { documents, refreshing } = useSelector<StateInterface, LearnScreenState>(
    (state) => state.learnScreen,
  );

  const { theme } = useSelector<StateInterface, GeneralState>((state) => state.general);

  const dispatch = useDispatch<Dispatch<LearnScreenState>>();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchDocument(route.params.document.slug));
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainView}>
      {refreshing ? (
        <View style={globalStyles.centerView}>
          <DZCodeLoading />
        </View>
      ) : (
        <ScrollView>
          <Image
            source={{ uri: documents?.find((d) => d.slug === route.params.document.slug)?.image }}
            style={documentDetailsStyles.image}
          />
          <Text style={documentDetailsStyles.authorsText}>{route.params.document.title}</Text>
          <Text style={documentDetailsStyles.descriptionText}>
            {documents?.find((d) => d.slug === route.params.document.slug)?.description}
          </Text>
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
              code_inline: {
                color: theme === "dark" ? "white" : "black",
                backgroundColor: theme === "dark" ? "black" : "white",
              },
              body: documentDetailsStyles.mdBody,
            }}
          >
            {documents?.find((document) => document.slug === route.params.document.slug)?.content ||
              ""}
          </Markdown>
          <Text style={documentDetailsStyles.authorsText}>
            Authors:{" "}
            {documents
              ?.find((document) => document.slug === route.params.document.slug)
              ?.authors?.join(", ")}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
