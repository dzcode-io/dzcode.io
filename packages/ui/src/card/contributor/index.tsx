import { Model } from "@dzcode.io/models/dist/_base";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { getRepositoryURL } from "@dzcode.io/models/dist/repository-reference/utils";
import { FC } from "react";
import { useTranslation } from "src/_hooks/use-translation";
import { Image } from "src/image";
import { Markdown } from "src/markdown";
import { Paper } from "src/paper";
import { Stack } from "src/stack";
import { Text } from "src/text";

interface ContributorCard {
  contributor: Model<ContributorEntity, "repositories">;
  // @TODO-ZM: make local dynamic based on counts
  local: {
    repository: string;
  };
}

export const ContributorCard: FC<ContributorCard> = ({ contributor, local }) => {
  const { t } = useTranslation();

  const repositoriesInMarkdown = contributor.repositories
    .map((repo) => `- [${repo.owner}/${repo.repository}](${getRepositoryURL(repo)})`)
    .join("\n");

  return (
    <Paper sx={{ flexGrow: 1 }} variant="outlined">
      <Stack direction="vertical" height="100%" justifyContent="space-between">
        <Stack direction="horizontal" alignItems="center" gap={1} margin={[1, 1, 0]}>
          <Image src={contributor.avatarUrl} width={100} height={100} />
          <Stack direction="vertical">
            <Text variant="v3" wordWrap="break-word">
              {contributor.username}
            </Text>
            <Text variant="v1" wordWrap="break-word">
              {contributor.repositories.length} {t(local.repository)}
            </Text>
          </Stack>
        </Stack>

        <Stack direction="vertical" margin={[0, 1]} grow={1}>
          <Markdown>{repositoriesInMarkdown}</Markdown>
        </Stack>
      </Stack>
    </Paper>
  );
};
