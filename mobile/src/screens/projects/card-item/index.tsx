import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import { Button } from "@dzcode.io/ui-mobile/dist/button";
import { Card } from "@dzcode.io/ui-mobile/dist/card";
import { Paragraph } from "@dzcode.io/ui-mobile/dist/paragraph";
import { Colors } from "@dzcode.io/ui-mobile/dist/styles/colors";
import { Title } from "@dzcode.io/ui-mobile/dist/title";
import React, { FC, memo } from "react";
import { useGeneralSliceSelector } from "src/redux/reducers/general/slice";
import { openLink } from "src/utils/link";

import { cardStyles } from "./styles";

interface CardItemProps {
  project: Pick<Project, "title" | "description" | "image" | "githubURI">;
}

const CardItem: FC<CardItemProps> = ({
  project: { title, description, githubURI, image },
}: CardItemProps) => {
  const { theme } = useGeneralSliceSelector();
  return (
    <Card style={cardStyles.mainView}>
      <Card.Cover
        height={true}
        width={true}
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
