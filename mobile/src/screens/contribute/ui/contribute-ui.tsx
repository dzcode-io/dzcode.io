import {} from "../functions";
import { Button, Text } from "react-native-paper";
import { FlatList, View } from "react-native";
import React, { FC, useState } from "react";
import { CardItem } from "../../../components/shared";
import { calculateDate } from "../../../utils/functions";
import { ContributionsResponse } from "../../../api/interfaces";
import { getContributes } from "../../../api/requests";
import { globalStyles } from "../../../styles";

// export Contribute UI
const ContributeUI: FC = (): JSX.Element => {
  // use constributions state
  const [contributions, setContributions] = useState<ContributionsResponse["contributions"]>([]);

  // use refreshing state
  const [refreshing, setRefreshing] = useState(false);

  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Button
          onPress={async () => {
            const contributesResponse = await getContributes();
            if (contributesResponse) {
              setContributions(contributesResponse.contributions);
            }
          }}
        >
          <Text>Get contributes</Text>
        </Button>
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
