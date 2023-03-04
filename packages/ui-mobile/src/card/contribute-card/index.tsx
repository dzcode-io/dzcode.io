import React, { FC, memo } from "react";

import { Badge } from "src/badge";
import { Button } from "src/button";
import { Card } from "src/card/card";
import { Chip } from "src/chip";
import { Colors } from "src/theme/style/color";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { Divider } from "src/divider";
import { FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Model } from "@dzcode.io/models/dist/_base";
import { Paragraph } from "src/text/paragraph";
import { Text } from "src/text/text";
import { Title } from "src/text/title";
import { View } from "react-native";
import { calculateDateBetween } from "@dzcode.io/utils/dist/date/difference";
import { cardStyles } from "./styles";

interface ContributeCardProps {
  /**
   * the contribution item
   */
  item: Model<ContributionEntity, "project">;
  /**
   * the function that is called when a chip is pressed
   */
  onChipPress: (item: string) => void;
  /**
   * the function that is called when the contribute card is pressed
   */
  onPress: () => void;
}

const CardItem: FC<ContributeCardProps> = ({
  item,
  onChipPress,
  onPress,
}: ContributeCardProps) => {
  return (
    <Card style={cardStyles.mainView}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Divider style={cardStyles.divider1} />
        {item.labels.length > 0 && (
          <FlatList
            style={cardStyles.flatListView}
            horizontal
            data={item.labels}
            keyExtractor={(label: string) => label}
            renderItem={({ item }) => (
              <Chip
                onPress={() => onChipPress(item)}
                style={cardStyles.chipView}
              >
                {item}
              </Chip>
            )}
          />
        )}
        <Paragraph style={cardStyles.subtitleText}>
          {item.project.name}
        </Paragraph>
        <FlatList
          style={cardStyles.flatListView}
          horizontal
          data={item.languages}
          keyExtractor={(language: string) => language}
          renderItem={({ item }) => (
            <Chip onPress={() => onChipPress(item)} style={cardStyles.chipView}>
              {item}
            </Chip>
          )}
        />
      </Card.Content>
      <Card.Actions style={cardStyles.cardActionsView}>
        <Title
          style={{
            color: Colors.accent,
          }}
          onPress={onPress}
        >
          {item.type === "issue" ? "Learn more" : "Review changes"}
        </Title>
        <View style={cardStyles.row}>
          {item.commentsCount > 0 && (
            <View style={cardStyles.marginRight}>
              <MaterialIcons name="notes" color={Colors.white} size={25} />
              <Badge style={cardStyles.badgeView}>{item.commentsCount}</Badge>
            </View>
          )}
          <Divider style={cardStyles.divider2} />
          <Text
            style={{
              color: Colors.white,
            }}
          >
            {calculateDateBetween(new Date(item.updatedAt), new Date())}
          </Text>
        </View>
      </Card.Actions>
    </Card>
  );
};

/**
 * ContributeCard component used to display the contribute card in the app
 * @example
 * <ContributeCard
      onChipPress={() => {}}
      onPress={() => {}}
      item={{
        title: "test",
        project: {
          name: "test",
          slug: "test",
        },
        type: "issue",
        labels: [],
        commentsCount: 0,
        createdAt: "2023-03-04T00:00:00.000Z",
        updatedAt: "2023-03-04T00:00:00.000Z",
        id: "",
        languages: [],
        url: "",
      }}
    />
 */
export const ContributeCard = memo(CardItem);
