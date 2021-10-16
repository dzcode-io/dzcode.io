import React, { FC, memo } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { openLink } from "../../../utils/link";
import { Project } from "../../../_common/types";
import { Colors } from "../../../styles/colors";
import { cardStyles } from "./styles";
import { StateInterface } from "../../../redux";
import { GeneralState } from "../../../redux/reducers/general";
import { useSelector } from "react-redux";

interface CardItemProps {
  project: Pick<Project, "title" | "description" | "image" | "githubURI">;
}

const CardItem: FC<CardItemProps> = ({
  project: { title, description, githubURI, image },
}: CardItemProps) => {
  const { theme } = useSelector<StateInterface, GeneralState>((state) => state.general);
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