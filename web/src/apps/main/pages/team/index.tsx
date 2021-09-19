import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Catalog } from "./catalog";
import { TeamPageState } from "src/apps/main/redux/reducers/team-page";
import { fetchTeamList } from "src/apps/main/redux/actions/team-page";

export const TeamPage: FC = () => {
  const { teamList } = useSelector<StateInterface, TeamPageState>((state) => state.teamPage);
  const dispatch = useDispatch<Dispatch<TeamPageState>>();

  useEffect(() => {
    dispatch(fetchTeamList());
  }, []);

  return (
    <div>
      <Catalog teamList={teamList} />
    </div>
  );
};

export default TeamPage;
