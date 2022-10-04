import { BottomSheet } from "@dzcode.io/ui-mobile/dist/bottom-sheet";
import { BottomSheetScrollView } from "@dzcode.io/ui-mobile/dist/bottom-sheet-scroll-view";
import { ContributeCard } from "@dzcode.io/ui-mobile/dist/contribute-card";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { Filters } from "@dzcode.io/ui-mobile/dist/filters";
import { DZCodeLoading } from "@dzcode.io/ui-mobile/dist/loading";
import { Text } from "@dzcode.io/ui-mobile/dist/text";
import { TryAgain } from "@dzcode.io/ui-mobile/dist/try-again";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Linking, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux";
import { fetchContributions } from "src/redux/actions/contribute-screen";
import {
  updateFilterValue,
  useContributeSliceSelector,
} from "src/redux/reducers/contribute-screen/slice";
import { globalStyles } from "src/styles/global";

import { contributeStyles } from "./styles";

export const ContributeScreen: FC = () => {
  const { contributions, filters, status } = useContributeSliceSelector();
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchContributions(filters));
  }, []);

  useEffect(() => {
    if (update) {
      dispatch(fetchContributions(filters));
      setUpdate(false);
    }
  }, [update]);

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        {status === "error" ? (
          <TryAgain
            error="Ops, an error occurred while loading the contribution cards, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchContributions(filters))}
          />
        ) : contributions ? (
          // Cards
          contributions.length > 0 ? (
            <FlatList
              style={contributeStyles.listView}
              data={contributions}
              onRefresh={() => {
                dispatch(fetchContributions(filters));
              }}
              refreshing={status === "loading"}
              keyExtractor={(item, index) => `item-${index}`}
              renderItem={({ item }) => (
                <ContributeCard
                  title={item.title}
                  subtitle={item.project.name}
                  labels={[...item.labels, ...item.languages]}
                  type={item.type}
                  updatedAt={item.updatedAt}
                  commentsCount={item.commentsCount}
                  onChipPress={async (optionName) => {
                    setUpdate(false);
                    const filterName = item.labels.includes(optionName) ? "labels" : "languages";
                    dispatch(
                      updateFilterValue({
                        filterName,
                        optionName,
                      }),
                    );
                    setUpdate(true);
                  }}
                  onPress={() => {
                    try {
                      Linking.openURL(item.url);
                    } catch {
                      alert("Can't open browser");
                    }
                  }}
                />
              )}
            />
          ) : (
            <View style={globalStyles.centerView}>
              <Image
                source={require("@dzcode.io/ui-mobile/assets/png/info.png")}
                style={contributeStyles.emptyStateLogo}
              />
              <Text style={contributeStyles.emptyStateText}>There is no contribution</Text>
            </View>
          )
        ) : (
          // Loading indicator
          <View style={globalStyles.centerView}>
            <DZCodeLoading style={contributeStyles.dzcodeLoading} />
          </View>
        )}
        {/* Filters */}
        <BottomSheet>
          {filters ? (
            <BottomSheetScrollView>
              <Filters
                filters={filters}
                onCheckboxPress={(filterName, optionName) => {
                  setUpdate(false);
                  dispatch(
                    updateFilterValue({
                      filterName,
                      optionName,
                    }),
                  );
                  setUpdate(true);
                }}
              />
            </BottomSheetScrollView>
          ) : (
            <View style={globalStyles.centerView}>
              <DZCodeLoading style={contributeStyles.dzcodeLoading} />
            </View>
          )}
        </BottomSheet>
      </SafeAreaView>
    </ErrorBoundary>
  );
};
