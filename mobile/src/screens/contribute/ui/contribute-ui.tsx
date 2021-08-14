import { getFilters } from "../functions";
import { FlatList, View, Linking, ScrollView } from "react-native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { CardItem } from "../../../components/contribute";
import { ContributionFilters, ContributionsResponse } from "../../../api/interfaces";
import { DZCodeLoading } from "../../../components/shared";
import { getContributes } from "../../../api/requests";
import { contributeStyles, globalStyles } from "../../../styles";
import { Checkbox, FAB, List, Portal } from "react-native-paper";

// export Contribute UI
const ContributeUI: FC = (): JSX.Element => {
  // use constributions state
  const [contributions, setContributions] = useState<ContributionsResponse["contributions"]>([]);

  // use refreshing state
  const [refreshing, setRefreshing] = useState(false);

  // use is loading state
  const [isLoading, setIsLoading] = useState(false);

  // use filters shown state
  const [filtersShown, setFiltersShown] = useState(false);

  // use filters state
  const [filters, setFilters] = useState<ContributionFilters>({
    project: [],
    language: [],
    label: [],
  });

  // get contributions from backend
  const getContributions = useCallback(
    async (
      projects: string[] = [],
      languages: string[] = [],
      labels: string[] = [],
      isSetFilters = true,
    ) => {
      // set loading state
      setIsLoading(true);
      // get contributions from backend
      const contributesResponse = await getContributes(projects, languages, labels);
      if (contributesResponse) {
        // set filters state
        if (isSetFilters) {
          setFilters(getFilters(contributesResponse.contributions));
        }
        // set contributions state
        setContributions(contributesResponse.contributions);
      }
      // set loading state
      setIsLoading(false);
    },
    [],
  );

  // use effect on get contributions
  useEffect(() => {
    getContributions();
  }, [getContributions]);

  // use effect on filter change state
  useEffect(() => {
    const projectFilters = [];
    const languageFilters = [];
    const labelFilters = [];
    for (let i = 0; i < filters.project.length; i++) {
      if (filters.project[i].checked) {
        projectFilters.push(filters.project[i].value);
      }
    }
    for (let i = 0; i < filters.language.length; i++) {
      if (filters.language[i].checked) {
        languageFilters.push(filters.language[i].value);
      }
    }
    for (let i = 0; i < filters.label.length; i++) {
      if (filters.label[i].checked) {
        labelFilters.push(filters.label[i].value);
      }
    }
    getContributions(projectFilters, languageFilters, labelFilters, false);
  }, [filters]);

  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* Loading */}
      {isLoading && (
        <View style={globalStyles.centerView}>
          <DZCodeLoading style={contributeStyles.dzcodeLoading} />
        </View>
      )}
      {/* Cards */}
      {contributions.length > 0 && (
        <FlatList
          style={contributeStyles.listView}
          data={contributions}
          onRefresh={async () => {
            setRefreshing(true);
            const contributesResponse = await getContributes();
            if (contributesResponse) {
              // set filters state
              setFilters(getFilters(contributesResponse.contributions));
              // set contributions state
              setContributions(contributesResponse.contributions);
            }
            setRefreshing(false);
          }}
          refreshing={refreshing}
          keyExtractor={(item, index) => `${index}-${item?.id}`}
          renderItem={({ item }) => (
            <CardItem
              title={item.title}
              subtitle={item.project.name}
              labels={[...item.labels, ...item.languages]}
              type={item.type}
              createdAt={item.createdAt}
              commentsCount={item.commentsCount}
              onChipPress={async (i) => {
                setContributions([]);
                if (item.labels.includes(i)) {
                  await getContributions([], [], [i], false);
                  return;
                }
                if (item.languages.includes(i)) {
                  await getContributions([], [i], [], false);
                }
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
      )}
      {/* Filters */}
      {(filters.project.length > 0 || filters.language.length > 0 || filters.label.length > 0) && (
        <View>
          {filtersShown && (
            <View style={{ bottom: 70 }}>
              <List.AccordionGroup>
                <List.Accordion title="Project" id="1">
                  <ScrollView>
                    {filters.project.map((project, index) => (
                      <List.Item
                        key={`${project.slug}-${index}`}
                        title={project.name}
                        right={() => (
                          <Checkbox
                            status={project.checked ? "checked" : "unchecked"}
                            onPress={() => {
                              // find the project filter to modify checked property
                              let index = -1;
                              for (let i = 0; i < filters.project.length; i++) {
                                if (filters.project[i].value === project.value) {
                                  index = i;
                                  break;
                                }
                              }
                              // set new value of filters
                              setFilters({
                                ...filters,
                                project: [
                                  ...filters.project.slice(0, index),
                                  {
                                    ...project,
                                    checked: !project.checked,
                                  },
                                  ...filters.project.slice(index + 1),
                                ],
                              });
                            }}
                          />
                        )}
                      />
                    ))}
                  </ScrollView>
                </List.Accordion>
                <List.Accordion title="Language" id="2">
                  <ScrollView>
                    {filters.language.map((language, index) => (
                      <List.Item
                        key={`${language.value}-${index}`}
                        title={language.value}
                        right={() => (
                          <Checkbox
                            status={language.checked ? "checked" : "unchecked"}
                            onPress={() => {
                              // find the language filter to modify checked property
                              let index = -1;
                              for (let i = 0; i < filters.language.length; i++) {
                                if (filters.language[i].value === language.value) {
                                  index = i;
                                  break;
                                }
                              }
                              // set new value of filters
                              setFilters({
                                ...filters,
                                language: [
                                  ...filters.language.slice(0, index),
                                  {
                                    ...language,
                                    checked: !language.checked,
                                  },
                                  ...filters.language.slice(index + 1),
                                ],
                              });
                            }}
                          />
                        )}
                      />
                    ))}
                  </ScrollView>
                </List.Accordion>
                <List.Accordion title="Label" id="3">
                  <ScrollView>
                    {filters.label.map((label, index) => (
                      <List.Item
                        key={`${label.value}-${index}`}
                        title={label.value}
                        right={() => (
                          <Checkbox
                            status={label.checked ? "checked" : "unchecked"}
                            onPress={() => {
                              // find the label filter to modify checked propery
                              let index = -1;
                              for (let i = 0; i < filters.label.length; i++) {
                                if (filters.label[i].value === label.value) {
                                  index = i;
                                  break;
                                }
                              }
                              // set the new value of filters
                              setFilters({
                                ...filters,
                                label: [
                                  ...filters.label.slice(0, index),
                                  {
                                    ...label,
                                    checked: !label.checked,
                                  },
                                  ...filters.label.slice(index + 1),
                                ],
                              });
                            }}
                          />
                        )}
                      />
                    ))}
                  </ScrollView>
                </List.Accordion>
              </List.AccordionGroup>
            </View>
          )}
          <FAB
            icon={filtersShown ? "close" : "menu"}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: 10,
            }}
            onPress={() => setFiltersShown(!filtersShown)}
          />
        </View>
      )}
    </View>
  );
};
export default ContributeUI;
