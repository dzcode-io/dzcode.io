import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import React, { FC, memo } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { useSelector } from "react-redux";

import { selectTheme } from "../../../store/general/selectors/theme";
import { Colors } from "../../../styles/colors";
import { openLink } from "../../../utils/link";
import { cardStyles } from "./styles";

interface CardItemProps {
  project: Pick<Project, "title" | "description" | "image" | "githubURI">;
}

const CardItem: FC<CardItemProps> = ({
  project: { title, description, githubURI, image },
}: CardItemProps) => {
  const theme = useSelector(selectTheme);
  return (
    <Card style={cardStyles.mainView}>
      <Card.Cover
        source={{ uri: image }}
        style={{
          backgroundColor: theme === "dark" ? Colors.darkGrey : Colors.light,
        }}
      />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="text"
          onPress={() => githubURI && openLink("https://www.github.com/" + githubURI)}
          color={Colors.primary}
        >
          Go to code
        </Button>
      </Card.Actions>
    </Card>
  );
};

export const CardItemMemoed = memo(CardItem);
