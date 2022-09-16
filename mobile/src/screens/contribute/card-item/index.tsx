import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { calculateDateBetween } from "@dzcode.io/utils/dist/date/difference";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC, memo } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import { Badge, Button, Card, Chip, Paragraph, Text, Title } from "react-native-paper";
import { Colors } from "src/styles/colors";

import { cardStyles } from "./styles";

interface CardItemProps
  extends Pick<ContributionEntity, "title" | "labels" | "type" | "updatedAt" | "commentsCount"> {
  subtitle: string;
  onChipPress: (item: string) => void;
  onPress: () => void;
}

export const CardItem: FC<CardItemProps> = ({
  title,
  subtitle,
  labels,
  type,
  updatedAt,
  commentsCount,
  onChipPress,
  onPress,
}: CardItemProps) => {
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

export const CardItemMemoed = memo(CardItem);
