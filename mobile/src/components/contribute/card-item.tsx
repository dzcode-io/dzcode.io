import { Badge, Button, Card, Chip, Paragraph, Text, Title } from "react-native-paper";
import { Colors, cardStyles } from "../../styles";
import React, { FC, memo } from "react";
import { FlatList } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { calculateDate } from "../../utils/functions";

enum ContributionType {
  PULL_REQUEST = "pullRequest",
  ISSUE = "issue",
}

interface CardItemProps {
  title: string;
  subtitle: string;
  labels: string[];
  type: string;
  createdAt: string;
  commentsCount: number;
  onChipPress: (item: string) => void;
  onPress: () => void;
}

const CardItem: FC<CardItemProps> = ({
  title,
  subtitle,
  labels,
  type,
  createdAt,
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
        <Button
          color={type === ContributionType.ISSUE ? Colors.accent : Colors.violet}
          onPress={onPress}
        >
          {type === ContributionType.ISSUE ? "Read issue" : "Review changes"}
        </Button>
        <View style={cardStyles.row}>
          <Text style={{ color: type === ContributionType.ISSUE ? Colors.accent : Colors.violet }}>
            {calculateDate(new Date(createdAt), new Date())}
          </Text>
          {commentsCount > 0 && (
            <View style={cardStyles.marginLeft}>
              <MaterialCommunityIcons
                name="comment-multiple"
                color={type === ContributionType.ISSUE ? Colors.accent : Colors.violet}
                size={25}
              />
              <Badge
                style={[
                  cardStyles.badgeView,
                  {
                    color: type === ContributionType.ISSUE ? Colors.accent : Colors.violet,
                  },
                ]}
              >
                {commentsCount}
              </Badge>
            </View>
          )}
          {type === ContributionType.ISSUE ? (
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
export default memo(CardItem);
