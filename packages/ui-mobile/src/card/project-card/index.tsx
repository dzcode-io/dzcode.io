import React, { FC, memo } from "react";
import { Project } from "src/_types/project";
import { Button } from "src/button";
import { Card } from "src/card/card";
import { Paragraph } from "src/text/paragraph";
import { Title } from "src/text/title";
import { Colors } from "src/theme/style/color";

import { cardStyles } from "./styles";

interface ProjectCardProps {
  project: Project;
  theme: "dark" | "light";
  openLink: (url: string) => void;
}

const CardItem: FC<ProjectCardProps> = ({
  project: { name, description, githubURI, image },
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
        <Title>{name}</Title>
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

/**
 * ProjectCard component used to display the project card in the app
 * @prop {Project} project - the project to display
 * @prop {string} theme - the theme of the card
 * @prop {Function} openLink - the function to open the link
 * @example
 * <ProjectCard
 *    project={project}
 *    theme="dark"
 *    openLink={url => Linking.openURL(url)}
 * />
 */
export const ProjectCard = memo(CardItem);
