import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Image, Linking, SafeAreaView, View } from "react-native";
import { Checkbox, List, Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { ErrorBoundary } from "../../components/error-boundary";
import { DZCodeLoading } from "../../components/loading";
import { TryAgain } from "../../components/try-again";
import { AppDispatch } from "../../store";
import { selectContributions } from "../../store/contribute-screen/selectors/contributions";
import { selectFilters } from "../../store/contribute-screen/selectors/filters";
import { selectContributeStatus } from "../../store/contribute-screen/selectors/status";
import { fetchContributions, updateFilterValue } from "../../store/contribute-screen/slice";
import { globalStyles } from "../../styles/global";
import { CardItemMemoed } from "./card-item";
import { contributeStyles } from "./styles";

export const ContributeScreen: FC = () => {
  const contributions = useSelector(selectContributions);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectContributeStatus);
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
                source={require("../../assets/png/info.png")}
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
                        key={`filter-${filterName}-${optionName}`}
                        title={optionLabel}
                        right={() => (
                          <Checkbox
                            status={checked ? "checked" : "unchecked"}
                            onPress={() => {
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
