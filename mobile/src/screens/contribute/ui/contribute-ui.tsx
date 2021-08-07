import {} from "../functions";
import { FlatList, View, Linking } from "react-native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { CardItem } from "../../../components/shared";
import { ContributionsResponse } from "../../../api/interfaces";
import { DZCodeLoading } from "../../../components/shared";
import { getContributes } from "../../../api/requests";
import { globalStyles } from "../../../styles";

// export Contribute UI
const ContributeUI: FC = (): JSX.Element => {
  // use constributions state
  const [contributions, setContributions] = useState<ContributionsResponse["contributions"]>([]);

  // use refreshing state
  const [refreshing, setRefreshing] = useState(false);

  // use is loading state
  const [isLoading, setIsLoading] = useState(false);

  // get contributions from backend
  const getContributions = useCallback(
    async (projects: string[] = [], languages: string[] = [], labels: string[] = []) => {
      // set loading state
      setIsLoading(true);
      // get contributions from backend
      const contributesResponse = await getContributes(projects, languages, labels);
      if (contributesResponse) {
        // set contributions state
        setContributions(contributesResponse.contributions);
      }
      // set loading state
      setIsLoading(false);
    },
    [],
  );

  // use effect on component did mount
  useEffect(() => {
    getContributions();
  }, [getContributions]);

  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* Loading */}
      {isLoading && (
        <View style={globalStyles.centerView}>
          <DZCodeLoading style={{ position: "absolute" }} />
        </View>
      )}
      {/* Cards */}
      {contributions.length > 0 && (
        <FlatList
          data={contributions}
          onRefresh={async () => {
            setRefreshing(true);
            const contributesResponse = await getContributes();
            if (contributesResponse) {
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
                  await getContributions([], [], [i]);
                  return;
                }
                if (item.languages.includes(i)) {
                  await getContributions([], [i], []);
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
    </View>
  );
};
export default ContributeUI;
