import { Document } from "@dzcode.io/api/dist/app/types/legacy";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import { Route } from "@react-navigation/routers";
import { DZCodeLoading, ErrorBoundary, TryAgain } from "components";
import React, { FC, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchDocument } from "store/actions/learn-screen";
import { useGeneralSliceSelector } from "store/reducers/general/slice";
import { useLearnSliceSelector } from "store/reducers/learn-screen/slice";
import { globalStyles } from "styles/global";

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
  const { documents, status } = useLearnSliceSelector();
  const loadedDocuments = isLoaded(documents);
  const currentDocument = (
    loadedDocuments?.filter((document) => (document as Document).content) as Document[]
  ).find((document) => document.slug === route.params.document.slug);

  const { theme } = useGeneralSliceSelector();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDocument(route.params.document.slug));
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        {status === "loading" ? (
          <View style={globalStyles.centerView}>
            <DZCodeLoading />
          </View>
        ) : currentDocument ? (
          <ScrollView>
            <Image source={{ uri: currentDocument.image }} style={documentDetailsStyles.image} />
            <Text style={documentDetailsStyles.authorsText}>{route.params.document.title}</Text>
            <Text style={documentDetailsStyles.descriptionText}>{currentDocument.description}</Text>
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
              {currentDocument.content}
            </Markdown>
            <Text style={documentDetailsStyles.authorsText}>
              Authors: {currentDocument.authors?.join(", ")}
            </Text>
          </ScrollView>
        ) : (
          <TryAgain
            error="Ops, an error occurred while loading the selected document, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchDocument(route.params.document.slug))}
          />
        )}
      </SafeAreaView>
    </ErrorBoundary>
  );
};
