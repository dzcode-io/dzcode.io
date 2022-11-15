import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { t } from "src/components/t";
import { fetchTeamList } from "src/redux/actions/team-page";
import { useSliceSelector } from "src/redux/selectors";

import { Catalog } from "./catalog";

export const TeamPage: FC = () => {
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
      {teamList === "ERROR" ? (
        <TryAgain
          error={t("team-error")}
          action={t("team-try-again")}
          onClick={() => fetchTeamList()}
        />
      ) : (
        <Catalog teamList={teamList} />
      )}
    </ErrorBoundary>
  );
};

export default TeamPage;
