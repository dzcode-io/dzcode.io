import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectReferenceEntity } from "@dzcode.io/models/dist/project-reference";
import React, { FC, memo } from "react";
import { Project } from "src/_types/project";
import { Button } from "src/button";
import { Card } from "src/card/card";
import { Paragraph } from "src/text/paragraph";
import { Title } from "src/text/title";
import { Colors } from "src/theme/style/color";

import { cardStyles } from "./styles";

interface ProjectCardProps {
  project: Model<ProjectReferenceEntity, "repositories">;
  theme: "dark" | "light";
  openLink: (url: string) => void;
}

const CardItem: FC<ProjectCardProps> = ({
  project: { name, repositories, slug },
  theme,
  openLink,
}: ProjectCardProps) => {
  return (
    <Card style={cardStyles.mainView}>
      <Card.Content>
        <Title>{name}</Title>
      </Card.Content>
      <Card.Actions>
        <Paragraph>
          {repositories.map((repository, index) => (
            <Button
              key={`repository-${index}`}
              onPress={() =>
                openLink(`https://github.com/${repository.owner}/${repository.repository}`)
              }
            >{`${repository.owner}/${repository.repository}`}</Button>
          ))}
        </Paragraph>
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
