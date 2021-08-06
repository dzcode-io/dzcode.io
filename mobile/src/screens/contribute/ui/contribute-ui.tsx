import {} from "../functions";
import { FlatList, View, RefreshControl } from "react-native";
import React, { FC, useState, useEffect, useCallback } from "react";
import { CardItem } from "../../../components/shared";
import { ContributionsResponse } from "../../../api/interfaces";
import { DZCodeLoading } from "../../../components/shared";
import { calculateDate } from "../../../utils/functions";
import { getContributes } from "../../../api/requests";
import { globalStyles } from "../../../styles";

// export Contribute UI
const ContributeUI: FC = (): JSX.Element => {
  // use constributions state
  const [contributions, setContributions] = useState<ContributionsResponse["contributions"]>([]);

  // use refreshing state
  const [refreshing, setRefreshing] = useState(false);

  // get contributions from backend
  const getContributions = useCallback(async () => {
    // set refreshing state
    setRefreshing(true);
    // get contributions from backend
    const contributesResponse = await getContributes();
    if (contributesResponse) {
      // set contributions state
      setContributions(contributesResponse.contributions);
    }
    // set refreshing state
    setRefreshing(false);
  }, []);

  // use effect on component did mount
  useEffect(() => {
    getContributions();
  }, [getContributions]);

  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        {/* Loading */}
        <DZCodeLoading style={{ position: "absolute" }} />
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
                onPress={() => {
                  console.log(calculateDate(new Date(item.createdAt), new Date()));
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};
export default ContributeUI;
