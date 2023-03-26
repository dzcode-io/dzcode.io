import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { getRepositoryURL } from "@dzcode.io/models/dist/repository-reference/utils";
import { arrayOf } from "@dzcode.io/utils/dist/array";
import { FC } from "react";
import { useColors } from "src/_hooks/use-colors";
import { useTranslation } from "src/_hooks/use-translation";
import { Avatar, AvatarGroup } from "src/avatar";
import { Badge } from "src/badge";
import { Chip } from "src/chip";
import { Divider } from "src/divider";
import { FilterProps } from "src/filter";
import { Flex } from "src/flex";
import { ContributionIcon } from "src/icon/contribution";
import { Link } from "src/link";
import { Markdown } from "src/markdown";
import { Paper } from "src/paper";
import { Skeleton } from "src/skeleton";
import { Stack } from "src/stack";
import { Text } from "src/text";

type ProjectCard =
  | { project: null; local?: never }
  | {
      // @TODO-ZM: find a way to DRY this, eg:
      // project: Model<ProjectEntity, 'repositories' | 'repositories.contributors' | 'repositories.stats'>
      project: Model<ProjectEntity> & {
        repositories: Model<RepositoryEntity, "contributors" | "stats">[];
      };
      local: FilterProps["local"];
    };

const loadingLanguages = arrayOf(3);

export const ProjectCard: FC<ProjectCard> = ({ project, local }) => {
  const { t } = useTranslation();
  const { from } = useColors();

  if (!project)
    return (
      <Paper sx={{ flexGrow: 1 }} variant="outlined">
        <Stack direction="vertical" height="100%" justifyContent="space-between">
          <Text variant="v2" margin={[1, 1, 0]} wordWrap="break-word">
            <Skeleton width={200} />
          </Text>
          <Divider orientation="horizontal" margin={[1, 0, 0]} width="40%" />

          <Stack direction="vertical" margin={[0, 1, 1]} grow={1}>
            <Skeleton width={200} />
            <Stack direction="horizontal" gap={1} alignItems="center">
              <Skeleton width={30} height={30} variant="circular" />
              <Divider orientation="vertical" margin={1} />
              {loadingLanguages.map((index) => (
                <Chip key={`loading-${index}`} label={<Flex width={20} />} variant="v1" />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    );

  const localize = (filterName: string, optionName: string): string => {
    const keyPrefix =
      filterName === "labels"
        ? local.contributionLabelKeyPrefix
        : filterName === "languages"
        ? local.programmingLanguageKeyPrefix
        : null;
    if (!keyPrefix) return filterName;
    return t(`${keyPrefix}-${optionName.toLowerCase()}`, undefined, undefined, optionName);
  };

  return (
    <Paper sx={{ flexGrow: 1 }} variant="outlined">
      <Stack direction="vertical" height="100%" justifyContent="space-between">
        <Text variant="v2" margin={[1, 1, 0]} wordWrap="break-word">
          <Markdown>{project.name}</Markdown>
        </Text>
        <Divider orientation="horizontal" margin={[1, 0]} width="40%" />

        {project.repositories.map((repository, index) => (
          <Stack key={`repository-${index}`} direction="vertical" margin={[0, 1, 1, 1]} grow={1}>
            <Link href={getRepositoryURL(repository)}>
              {repository.owner}/{repository.repository}
            </Link>
            <Stack direction="horizontal" gap={1}>
              <AvatarGroup
                max={3}
                componentsProps={{
                  additionalAvatar: { sx: { width: 30, height: 30, fontSize: "small" } },
                }}
              >
                {repository.contributors.map((contributor, index) => (
                  <Avatar
                    key={`contributor-${index}`}
                    src={contributor.avatarUrl}
                    sx={{ width: 30, height: 30, backgroundColor: from("BACKGROUND_2") }}
                  />
                ))}
              </AvatarGroup>
              {repository.stats.contributionCount > 0 && (
                <Badge
                  badgeContent={repository.stats.contributionCount}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {/* @TODO-ZM: use themed colors instead of `sx.color` */}
                  <ContributionIcon fontSize="large" sx={{ color: from("CONTRIBUTION") }} />
                </Badge>
              )}
              {repository.stats.languages.length > 0 && (
                <>
                  <Divider orientation="vertical" margin={1} />
                  <Stack direction="horizontal" gap={1} flexWrap="wrap" alignItems="center">
                    {repository.stats.languages.map((optionName, index) => (
                      <Chip
                        key={`language-${index}`}
                        label={localize("languages", optionName)}
                        variant="v1"
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};
