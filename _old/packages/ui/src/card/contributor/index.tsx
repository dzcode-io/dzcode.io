import { Model } from "@dzcode.io/models/dist/_base";
import { AccountEntity } from "@dzcode.io/models/dist/account";
import { getRepositoryURL } from "@dzcode.io/models/dist/repository-reference/utils";
import { FC } from "react";
import { useTranslation } from "src/_hooks/use-translation";
import { Image } from "src/image";
import { Markdown } from "src/markdown";
import { Paper } from "src/paper";
import { Skeleton } from "src/skeleton";
import { Stack } from "src/stack";
import { Text } from "src/text";

type ContributorCard =
  | {
      contributor: null;
      local?: never;
    }
  | {
      contributor: Model<AccountEntity, "repositories">;
      // @TODO-ZM: make local dynamic based on counts
      local: {
        repository: string;
      };
    };

export const ContributorCard: FC<ContributorCard> = ({ contributor, local }) => {
  const { t } = useTranslation();

  if (!contributor)
    return (
      <Paper sx={{ flexGrow: 1 }} variant="outlined">
        <Stack direction="vertical" height="100%" justifyContent="space-between">
          <Stack direction="horizontal" alignItems="center" gap={1} margin={[1, 1, 0]}>
            <Skeleton width={100} height={100} variant="rounded" />

            <Stack direction="vertical">
              <Text variant="v3" wordWrap="break-word">
                <Skeleton width={200} />
              </Text>
              <Text variant="v1" wordWrap="break-word">
                <Skeleton height={20} width={100} />
              </Text>
            </Stack>
          </Stack>

          <Stack direction="vertical" margin={[0, 1]} grow={1}>
            <Skeleton width={200} />
            <Skeleton width={100} />
            <Skeleton width={140} />
          </Stack>
        </Stack>
      </Paper>
    );

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
              {contributor.name}
            </Text>
            <Text variant="v2" wordWrap="break-word">
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
