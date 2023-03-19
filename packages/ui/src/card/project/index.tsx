import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectReferenceEntity } from "@dzcode.io/models/dist/project-reference";
import { getRepositoryURL } from "@dzcode.io/models/dist/repository-reference/utils";
import { FC } from "react";
import { Divider } from "src/divider";
import { Markdown } from "src/markdown";
import { Paper } from "src/paper";
import { Stack } from "src/stack";
import { Text } from "src/text";

interface ProjectCard {
  project: Model<ProjectReferenceEntity, "repositories">;
}

export const ProjectCard: FC<ProjectCard> = ({ project }) => {
  const repositoriesInMarkdown = project.repositories
    .map((repo) => `- [${repo.owner}/${repo.repository}](${getRepositoryURL(repo)})`)
    .join("\n");
  return (
    <Paper sx={{ flexGrow: 1 }} variant="outlined">
      <Stack direction="vertical" height="100%" justifyContent="space-between">
        <Text variant="v2" margin={[1, 1, 0]} wordWrap="break-word">
          <Markdown>{project.name}</Markdown>
        </Text>
        <Divider orientation="horizontal" margin={[1, 0, 0]} width="40%" />

        <Stack direction="vertical" margin={[0, 1]} grow={1}>
          <Markdown>{repositoriesInMarkdown}</Markdown>
        </Stack>
      </Stack>
    </Paper>
  );
};
