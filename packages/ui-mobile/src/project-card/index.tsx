import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import React, { FC, memo } from "react";
import { Button } from "src/button";
import { Card } from "src/card";
import { Paragraph } from "src/paragraph";
import { Colors } from "src/styles/colors";
import { Title } from "src/title";

import { cardStyles } from "./styles";

interface ProjectCardProps {
  project: Pick<Project, "title" | "description" | "image" | "githubURI">;
  theme: "dark" | "light";
  openLink: (url: string) => void;
}

const CardItem: FC<ProjectCardProps> = ({
  project: { title, description, githubURI, image },
  theme,
  openLink,
}: ProjectCardProps) => {
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

export const ProjectCard = memo(CardItem);
