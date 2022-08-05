import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { ThemeProvider } from "@dzcode.io/ui/dist/theme/theme-provider";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "src/apps/main/components/t";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { fetchTeamList } from "src/apps/main/redux/actions/team-page";
import { TeamPageState } from "src/apps/main/redux/reducers/team-page";

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
