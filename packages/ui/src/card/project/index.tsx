import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectReferenceEntity } from "@dzcode.io/models/dist/project-reference";
import { getRepositoryURL } from "@dzcode.io/models/dist/repository-reference/utils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FC } from "react";
import { Button } from "src/button";
import { Divider } from "src/divider";
import { Stack } from "src/stack";
import { Text } from "src/text";

interface ProjectCard {
  project: Model<ProjectReferenceEntity, "repositories">;
}

export const ProjectCard: FC<ProjectCard> = ({ project }) => {
  return (
    // @TODO-ZM: cleanup this rushed component
    <Card sx={{ width: 300 }} variant="outlined">
      <CardContent>
        <Stack direction="vertical" alignItems="center">
          <Text variant="v2">{project.name}</Text>
          <Divider orientation="horizontal" margin={[1, 3]} />
        </Stack>
        <Stack direction="vertical">
          <ul dir="ltr">
            {project.repositories.map((repository, index) => (
              <li key={`repository-${index}`}>
                <Button
                  variant="v1"
                  href={getRepositoryURL(repository)}
                >{`${repository.owner}/${repository.repository}`}</Button>
              </li>
            ))}
          </ul>
        </Stack>
      </CardContent>
    </Card>
  );
};
