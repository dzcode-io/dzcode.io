import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { calculateDateBetween } from "@dzcode.io/utils/dist/date/difference";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC, memo } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import { Badge } from "src/badge";
import { Button } from "src/button";
import { Card } from "src/card/card";
import { Chip } from "src/chip";
import { Paragraph } from "src/text/paragraph";
import { Text } from "src/text/text";
import { Title } from "src/text/title";
import { Colors } from "src/theme/style/color";

import { cardStyles } from "./styles";

interface ContributeCardProps
  extends Pick<ContributionEntity, "title" | "labels" | "type" | "updatedAt" | "commentsCount"> {
  subtitle: string;
  onChipPress: (item: string) => void;
  onPress: () => void;
}

const CardItem: FC<ContributeCardProps> = ({
  title,
  subtitle,
  labels,
  type,
  updatedAt,
  commentsCount,
  onChipPress,
  onPress,
}: ContributeCardProps) => {
  return (
    <Card style={cardStyles.mainView}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph style={cardStyles.subtitleText}>{subtitle}</Paragraph>
        <FlatList
          style={cardStyles.flatListView}
          horizontal
          data={labels}
          keyExtractor={(label: string) => label}
          renderItem={({ item }) => (
            <Chip onPress={() => onChipPress(item)} style={cardStyles.chipView}>
              {item}
            </Chip>
          )}
        />
      </Card.Content>
      <Card.Actions style={cardStyles.cardActionsView}>
        <Button color={type === "issue" ? Colors.accent : Colors.violet} onPress={onPress}>
          {type === "issue" ? "Read issue" : "Review changes"}
        </Button>
        <View style={cardStyles.row}>
          <Text style={{ color: type === "issue" ? Colors.accent : Colors.violet }}>
            {calculateDateBetween(new Date(updatedAt), new Date())}
          </Text>
          {commentsCount > 0 && (
            <View style={cardStyles.marginLeft}>
              <MaterialCommunityIcons
                name="comment-multiple"
                color={type === "issue" ? Colors.accent : Colors.violet}
                size={25}
              />
              <Badge
                style={[
                  cardStyles.badgeView,
                  {
                    color: type === "issue" ? Colors.accent : Colors.violet,
                  },
                ]}
              >
                {commentsCount}
              </Badge>
            </View>
          )}
          {type === "issue" ? (
            <MaterialCommunityIcons
              name="alert-circle-outline"
              color={Colors.accent}
              size={25}
              style={cardStyles.marginLeft}
            />
          ) : (
            <MaterialCommunityIcons
              name="call-merge"
              color={Colors.violet}
              size={25}
              style={cardStyles.marginLeft}
            />
          )}
        </View>
      </Card.Actions>
    </Card>
  );
};

/**
 * ContributeCard component used to display the contribute card in the app
 * @prop {string} title - the title of the contribute card
 * @prop {string} subtitle - the subtitle of the contribute card
 * @prop {string[]} labels - the labels of the contribute card
 * @prop {string} type - the type of the contribute card
 * @prop {string} updatedAt - the updatedAt of the contribute card
 * @prop {number} commentsCount - the commentsCount of the contribute card
 * @prop {VoidFunction} onChipPress - a function that is called when a chip is pressed
 * @prop {VoidFunction} onPress - a function that is called when the contribute card is pressed
 * @example
 * <ContributeCard
 *    title="Add a new feature"
 *    subtitle="dzcode.io"
 *    labels={["enhancement", "good first issue"]}
 *    type="issue"
 *    updatedAt="2021-01-01T00:00:00.000Z"
 *    commentsCount={0}
 *    onChipPress={(item) => console.log(item)}
 *    onPress={() => console.log("pressed")}
 * />
 */
export const ContributeCard = memo(CardItem);
