import { ContributorCard } from "@dzcode.io/ui/dist/card/contributor";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Stack } from "@dzcode.io/ui/dist/stack";
import { Text } from "@dzcode.io/ui/dist/text";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { T, t } from "src/components/t";
import { fetchTeamList } from "src/redux/actions/team-page";
import { useSliceSelector } from "src/redux/selectors";

const TeamPage: FC = () => {
  const { teamList } = useSliceSelector("teamPage");

  useEffect(() => {
    fetchTeamList();
  }, []);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("team-title")}</title>
        <meta name="description" content={t("team-description")} />
      </Helmet>
      <Stack direction="vertical" alignItems="center" width="100%">
        <Text variant="v3" margin={[3, 1, 0]}>
          <T team-header-title />
        </Text>
        {teamList == "ERROR" ? (
          <TryAgain
            error={t("team-error")}
            action={t("team-try-again")}
            onClick={() => fetchTeamList()}
          />
        ) : (
          <Stack
            direction="horizontal"
            flexWrap="wrap"
            margin={[3, 1]}
            justifyContent="space-evenly"
            gap={3}
          >
            {teamList
              ? teamList.map((contributor, index) => (
                  <ContributorCard key={`contributor-${index}`} contributor={contributor} />
                ))
              : "@TODO-ZM: Loading"}
          </Stack>
        )}
      </Stack>
    </ErrorBoundary>
  );
};

// ts-prune-ignore-next
export default TeamPage;
