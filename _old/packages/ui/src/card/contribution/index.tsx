import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { arrayOf } from "@dzcode.io/utils/dist/array";
import { getElapsedTime } from "@dzcode.io/utils/dist/date/elapsed-time";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "src/_hooks/use-translation";
import { Badge } from "src/badge";
import { Chip } from "src/chip";
import { Divider } from "src/divider";
import { FilterProps } from "src/filter";
import { Flex } from "src/flex";
import { NotesIcon } from "src/icon/notes";
import { Link } from "src/link";
import { Markdown } from "src/markdown";
import { Paper } from "src/paper";
import { Skeleton } from "src/skeleton";
import { Stack } from "src/stack";
import { Text } from "src/text";

type ContributionCard =
  | { contribution: null; local?: never; onChipClick?: never }
  | {
      contribution: Model<ContributionEntity, "project">;
      local: {
        readIssue: string;
        reviewChanges: string;
        elapsedTime: string;
      } & FilterProps["local"];
      onChipClick: (filterName: string, optionName: string) => void;
    };

const loadingLabels = arrayOf(3);
const loadingLanguages = arrayOf(2);

export const ContributionCard: FC<ContributionCard> = ({ contribution, local, onChipClick }) => {
  const { t, language } = useTranslation();
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    if (!contribution) return;

    const updateElapsedTime = () =>
      setElapsedTime(getElapsedTime(contribution.updatedAt, t(local.elapsedTime)));
    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 60000);
    return () => clearInterval(interval);
  }, [contribution?.updatedAt, language]);

  if (!contribution)
    return (
      <Paper sx={{ flexGrow: 1 }} variant="outlined">
        <Stack direction="vertical" height="100%" justifyContent="space-between">
          <Flex max={{ width: 360 }} margin={0}>
            <Stack direction="vertical" grow={1}>
              <Text variant="v2" margin={[1, 1, 0]} wordWrap="break-word">
                <Skeleton width={200} />
              </Text>
              <Divider orientation="horizontal" margin={[1, 0, 0]} width="40%" />
              <Stack direction="horizontal" gap={1} margin={[1, 1, 0]} flexWrap="wrap">
                {loadingLabels.map((index) => (
                  <Chip key={`loading-${index}`} label={<Flex width={20} />} variant="v1" />
                ))}
              </Stack>
              <Flex grow={1} />
            </Stack>
            <Stack direction="vertical">
              <Text variant="v1" margin={[1, 1, 0]}>
                <Skeleton width={50} />
              </Text>
              <Stack direction="horizontal" margin={[1, 1, 0]} gap={1} flexWrap="wrap">
                {loadingLanguages.map((index) => (
                  <Chip key={`loading-${index}`} label={<Flex width={20} />} variant="v1" />
                ))}
              </Stack>
            </Stack>
          </Flex>
          <Stack direction="horizontal" margin={1} alignItems="center">
            <Skeleton width={80} />
            <Flex grow={1} />

            <Divider orientation="vertical" margin={1} />
            <Text variant="v1" flexShrink={0}>
              <Skeleton width={30} />
            </Text>
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
        <Flex max={{ width: 360 }} margin={0}>
          <Stack direction="vertical" grow={1}>
            <Text variant="v2" margin={[1, 1, 0]} wordWrap="break-word">
              <Markdown>{contribution.title}</Markdown>
            </Text>
            <Divider orientation="horizontal" margin={[1, 0, 0]} width="40%" />
            {contribution.labels.length > 0 && (
              <Stack direction="horizontal" gap={1} margin={[1, 1, 0]} flexWrap="wrap">
                {contribution.labels.map((optionName, index) => (
                  <Chip
                    key={`label-${index}`}
                    label={localize("labels", optionName)}
                    variant="v1"
                    onClick={() => onChipClick("labels", optionName)}
                  />
                ))}
              </Stack>
            )}
            <Flex grow={1} />
          </Stack>
          <Stack direction="vertical">
            <Text variant="v1" margin={[1, 1, 0]}>
              {contribution.project.name}
            </Text>
            {contribution.languages.length > 0 && (
              <Stack direction="horizontal" margin={[1, 1, 0]} gap={1} flexWrap="wrap">
                {contribution.languages.map((optionName, index) => (
                  <Chip
                    key={`language-${index}`}
                    label={localize("languages", optionName)}
                    variant="v1"
                    onClick={() => onChipClick("languages", optionName)}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Flex>
        <Stack direction="horizontal" margin={1} alignItems="center">
          <Link variant="v1" href={contribution.url}>
            {contribution.type === "issue" ? t(local.readIssue) : t(local.reviewChanges)}
          </Link>
          <Flex grow={1} />
          {contribution.commentsCount > 0 && (
            <Badge
              badgeContent={contribution.commentsCount}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <NotesIcon fontSize="small" />
            </Badge>
          )}
          <Divider orientation="vertical" margin={1} />
          <Text variant="v1" flexShrink={0}>
            {elapsedTime}
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );
};
