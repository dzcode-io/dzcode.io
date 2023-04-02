import { useNavigation } from "@dzcode.io/ui-mobile/dist/_hooks/use-navigation";
import { Button } from "@dzcode.io/ui-mobile/dist/button";
import { Divider } from "@dzcode.io/ui-mobile/dist/divider";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { DZCodeLoading } from "@dzcode.io/ui-mobile/dist/loading";
import { TryAgain } from "@dzcode.io/ui-mobile/dist/try-again";
import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux";
import { fetchDocuments } from "src/redux/actions/learn-screen";
import { useLearnSliceSelector } from "src/redux/reducers/learn-screen/slice";
import { globalStyles } from "src/styles/global";

import { documentsListStyles } from "./styles";

export const DocumentsListScreen: FC = () => {
  const { documents, status } = useLearnSliceSelector();

  const navigation = useNavigation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        {status === "error" ? (
          <TryAgain
            error="Ops, an error occurred while loading the documentation, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchDocuments())}
          />
        ) : documents ? (
          <FlatList
            data={documents}
            onRefresh={() => dispatch(fetchDocuments())}
            refreshing={status === "loading"}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(_, index) => `item-${index}`}
            renderItem={({ item }) => (
              <Button
                style={documentsListStyles.button}
                onPress={() => navigation.navigate("document-details", { document: item })}
              >
                {item.slug.includes("/") ? `   ${item.title}` : item.title}
              </Button>
            )}
          />
        ) : (
          <View style={globalStyles.centerView}>
            <DZCodeLoading />
          </View>
        )}
      </SafeAreaView>
    </ErrorBoundary>
  );
};
