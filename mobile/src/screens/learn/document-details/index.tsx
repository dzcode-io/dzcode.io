import { Dispatch, StateInterface } from "../../../redux";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DZCodeLoading } from "../../../components/loading";
import { Document } from "@dzcode.io/api/dist/app/types/legacy";
import { GeneralState } from "../../../redux/reducers/general";
import { LearnScreenState } from "../../../redux/reducers/learn-screen";
import Markdown from "react-native-markdown-display";
import { Route } from "@react-navigation/routers";
import { Text } from "react-native-paper";
import { documentDetailsStyles } from "./styles";
import { fetchDocument } from "../../../redux/actions/learn-screen";
import { globalStyles } from "../../../styles/global";

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
              /* eslint-disable camelcase */
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
              /* eslint-enable camelcase */
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
