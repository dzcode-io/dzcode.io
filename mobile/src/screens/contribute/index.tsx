import { Checkbox, FAB, List, Text } from "react-native-paper";
import { Dispatch, StateInterface } from "../../redux";
import { FlatList, Image, Linking, ScrollView, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
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

  const [filtersShown, setFiltersShown] = useState(false);

  const dispatch = useDispatch<Dispatch<ContributeScreenState>>();
  useEffect(() => {
    dispatch(fetchContributions());
  }, []);

  return (
    // main view
    <View style={globalStyles.mainView}>
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
                createdAt={item.createdAt}
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
      {filters.length > 0 && (
        <View>
          <View style={{ bottom: 70, display: filtersShown ? "flex" : "none" }}>
            <List.AccordionGroup>
              {filters.map(({ name: filterName, label: filterLabel, options }) => (
                <List.Accordion key={`filter-${filterName}`} title={filterLabel} id={filterName}>
                  <ScrollView>
                    {options.map(({ label: optionLabel, name: optionName, checked }) => (
                      <List.Item
                        key={`filter-${filterName}-${optionName}`}
                        title={optionLabel}
                        right={() => (
                          <Checkbox
                            status={checked ? "checked" : "unchecked"}
                            onPress={() => {
                              dispatch(updateFilterValue(filterName, optionName, "reverse"));
                            }}
                          />
                        )}
                        onPress={() => {
                          dispatch(updateFilterValue(filterName, optionName, "reverse"));
                        }}
                      />
                    ))}
                  </ScrollView>
                </List.Accordion>
              ))}
            </List.AccordionGroup>
          </View>
          <FAB
            icon={filtersShown ? "close" : "menu"}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: 20,
            }}
            onPress={() => setFiltersShown(!filtersShown)}
          />
        </View>
      )}
    </View>
  );
};
