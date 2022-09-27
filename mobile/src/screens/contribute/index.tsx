import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { DZCodeLoading } from "@dzcode.io/ui-mobile/dist/loading";
import { Text } from "@dzcode.io/ui-mobile/dist/text";
import { TryAgain } from "@dzcode.io/ui-mobile/dist/try-again";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Linking, SafeAreaView, View } from "react-native";
import { Checkbox, List, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux";
import { fetchContributions } from "src/redux/actions/contribute-screen";
import {
  updateFilterValue,
  useContributeSliceSelector,
} from "src/redux/reducers/contribute-screen/slice";
import { globalStyles } from "src/styles/global";

import { CardItemMemoed } from "./card-item";
import { contributeStyles } from "./styles";

export const ContributeScreen: FC = () => {
  const { contributions, filters, status } = useContributeSliceSelector();
  const [update, setUpdate] = useState(false);

  const { colors } = useTheme();

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
                <CardItemMemoed
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
        <BottomSheet
          index={0}
          snapPoints={["10%", "75%"]}
          style={{
            borderColor: "#aaa3",
            borderWidth: 2,
            borderRadius: 16,

            shadowColor: "#000",
            // iOS
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            // Android
            elevation: 8,
          }}
          backgroundStyle={{ backgroundColor: colors.background }}
          handleIndicatorStyle={{ backgroundColor: colors.placeholder }}
        >
          {filters ? (
            <BottomSheetScrollView>
              <List.AccordionGroup>
                {filters.map(({ name: filterName, label: filterLabel, options }) => (
                  <List.Accordion key={`filter-${filterName}`} title={filterLabel} id={filterName}>
                    {options.map(({ label: optionLabel, name: optionName, checked }) => (
                      <List.Item
                        hasTVPreferredFocus
                        tvParallaxProperties
                        key={`filter-${filterName}-${optionName}`}
                        title={optionLabel}
                        right={() => (
                          <Checkbox
                            status={checked ? "checked" : "unchecked"}
                            onPress={() => {
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
                        )}
                        onPress={() => {
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
                    ))}
                  </List.Accordion>
                ))}
              </List.AccordionGroup>
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
