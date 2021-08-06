import {} from "../functions";
import { Button, Text, Card, Title, Paragraph } from "react-native-paper";
import React, { FC, useState } from "react";
import { ContributionsResponse } from "../../../api/interfaces";
import { View } from "react-native";
import { getContributes } from "../../../api/requests";
import { globalStyles } from "../../../styles";

// export Contribute UI
const ContributeUI: FC = (): JSX.Element => {
  // use constributions state
  const [contributions, setContributions] = useState<ContributionsResponse["contributions"]>([]);

  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>Contribute UI created!</Text>
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
          <Card>
            <Card.Content>
              <Title>{contributions[0]?.title}</Title>
              <Paragraph>{contributions[0]?.project?.name}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Review changes</Button>
            </Card.Actions>
          </Card>
        )}
      </View>
    </View>
  );
};
export default ContributeUI;
