import { ThemeProvider } from "@dzcode.io/ui/dist/theme/theme-provider";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <ThemeProvider
      direction={language.code === "ar" ? "rtl" : "ltr"}
      mode={darkMode ? "dark" : "light"}
    >
      {teamList === "ERROR" ? (
        <TryAgain
          error="Ops, an error occurred while loading the projects, please try again..."
          action="Try Again"
          onClick={() => dispatch(fetchTeamList())}
        />
      ) : (
        <Catalog teamList={teamList} />
      )}
    </ThemeProvider>
  );
};

export default TeamPage;
