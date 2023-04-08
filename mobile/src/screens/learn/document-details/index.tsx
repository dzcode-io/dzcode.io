import { Document } from "@dzcode.io/api/dist/app/types/legacy";
import type { RouteParam } from "@dzcode.io/ui-mobile/dist/_types/route-param";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { DZCodeLoading } from "@dzcode.io/ui-mobile/dist/loading";
import { Markdown } from "@dzcode.io/ui-mobile/dist/markdown";
import { Text } from "@dzcode.io/ui-mobile/dist/text/text";
import { TryAgain } from "@dzcode.io/ui-mobile/dist/try-again";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import React, { FC, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux";
import { fetchDocument } from "src/redux/actions/learn-screen";
import { useLearnSliceSelector } from "src/redux/reducers/learn-screen/slice";
import { globalStyles } from "src/styles/global";
import { openLink } from "src/utils/link";

import { documentDetailsStyles } from "./styles";

interface DocumentDetailsScreenProps {
  route: RouteParam<"DocumentDetails", RouteParams>;
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
            <Markdown content={currentDocument.content!} onLinkPress={(url) => openLink(url)} />
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
