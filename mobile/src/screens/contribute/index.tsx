import BottomSheet, {
  BottomSheetDraggableView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Checkbox, List, Text, useTheme } from "react-native-paper";
import { Dispatch, StateInterface } from "../../redux";
import { FlatList, Image, Linking, SafeAreaView, View } from "react-native";
import React, { FC, useEffect } from "react";
import { fetchContributions, updateFilterValue } from "../../redux/actions/contribute-screen";
import { useDispatch, useSelector } from "react-redux";

import { CardItemMemoed } from "./card-item";
import { ContributeScreenState } from "../../redux/reducers/contribute-screen";
import { DZCodeLoading } from "../../components/loading";
import { contributeStyles } from "./styles";
import { globalStyles } from "../../styles/global";

export const ContributeScreen: FC = () => {
  const { contributions, refreshing, filters } = useSelector<StateInterface, ContributeScreenState>(
    (state) => state.contributeScreen,
  );

  const { colors } = useTheme();

  const dispatch = useDispatch<Dispatch<ContributeScreenState>>();
  useEffect(() => {
    dispatch(fetchContributions());
  }, []);

  return (
    // main view
    <SafeAreaView style={globalStyles.mainView}>
      {contributions ? (
        // Cards
        contributions.length > 0 ? (
          <FlatList
            style={contributeStyles.listView}
            data={contributions}
            onRefresh={() => {
              dispatch(fetchContributions());
            }}
            refreshing={refreshing}
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
                  dispatch(updateFilterValue(filterName, optionName, true, true, true));
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
        <BottomSheetScrollView>
          <List.AccordionGroup>
            {filters?.map((item) => (
              <List.Accordion key={`filter-${item.name}`} title={item.label} id={item.name}>
                {item.options.map((option) => (
                  <List.Item
                    key={`option-${item.name}-${option.name}`}
                    title={option.label}
                    right={() => (
                      <Checkbox
                        status={option.checked ? "checked" : "unchecked"}
                        onPress={() => {
                          dispatch(updateFilterValue(item.name, option.name, "reverse"));
                        }}
                      />
                    )}
                    onPress={() => {
                      dispatch(updateFilterValue(item.name, option.name, "reverse"));
                    }}
                  />
                ))}
              </List.Accordion>
            ))}
          </List.AccordionGroup>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};
