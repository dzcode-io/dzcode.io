import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { ThemeProvider } from "@dzcode.io/ui/dist/theme/theme-provider";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { t } from "src/components/t";
import { Dispatch, StateInterface } from "src/redux";
import { fetchTeamList } from "src/redux/actions/team-page";
import { TeamPageState } from "src/redux/reducers/team-page";

import { Catalog } from "./catalog";

export const TeamPage: FC = () => {
  const { teamList } = useSelector<StateInterface, TeamPageState>((state) => state.teamPage);
  const dispatch = useDispatch<Dispatch<TeamPageState>>();
  const {
    settings: { darkMode, language },
  } = useSelector<StateInterface, StateInterface>((state) => state);

  useEffect(() => {
    dispatch(fetchTeamList());
  }, []);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("team-title")}</title>
        <meta name="description" content={t("team-description")} />
      </Helmet>
      <ThemeProvider
        direction={language.code === "ar" ? "rtl" : "ltr"}
        mode={darkMode ? "dark" : "light"}
      >
        {teamList === "ERROR" ? (
          <TryAgain
            error={t("team-error")}
            action={t("team-try-again")}
            onClick={() => dispatch(fetchTeamList())}
          />
        ) : (
          <Catalog teamList={teamList} />
        )}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default TeamPage;
