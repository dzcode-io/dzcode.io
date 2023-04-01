import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectReferenceEntity } from "@dzcode.io/models/dist/project-reference";
import { FC, memo } from "react";
import { Dimensions } from "react-native";
import { Button } from "src/button";
import { Card } from "src/card/card";
import { Paragraph } from "src/text/paragraph";
import { Title } from "src/text/title";

import { cardStyles } from "./styles";

interface ProjectCardProps {
  project: Model<ProjectReferenceEntity, "repositories">;
  openLink: (url: string) => void;
}

const CardItem: FC<ProjectCardProps> = ({
  project: { name, repositories },

  openLink,
}: ProjectCardProps) => {
  const width = Dimensions.get("window").width;
  return (
    <Card style={cardStyles.mainView}>
      <Card.Content>
        <Title>{name}</Title>
      </Card.Content>
      <Card.Actions>
        <Paragraph>
          {repositories.map((repository, index) => {
            let link = `${repository.owner}/${repository.repository}`;
            link = link.length >= width / 10 ? link.slice(0, width / 10) + "..." : link;
            return (
              <Button
                key={`repository-${index}`}
                onPress={() =>
                  openLink(`https://github.com/${repository.owner}/${repository.repository}`)
                }
                uppercase={false}
              >
                {link}
              </Button>
            );
          })}
        </Paragraph>
      </Card.Actions>
    </Card>
  );
};

/**
 * ProjectCard component used to display the project card in the app
 * @prop {Model<ProjectReferenceEntity, "repositories">} project - the project to display
 * @prop {Function} openLink - the function to open the link
 * @example
 * <ProjectCard
 *    project={project}
 *    openLink={url => Linking.openURL(url)}
 * />
 */
export const ProjectCard = memo(CardItem);
