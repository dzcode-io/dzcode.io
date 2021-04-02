import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Catalog } from "./catalog";
import { ContributorsState } from "src/apps/main/redux/reducers/contributors";
import { fetchContributorsList } from "src/apps/main/redux/actions/team-page";

export const ProjectsPage: FC = () => {
  const { contributorsList } = useSelector<StateInterface, ContributorsState>(
    (state) => state.contributors,
  );
  const dispatch = useDispatch<Dispatch<ContributorsState>>();

  useEffect(() => {
    dispatch(fetchContributorsList());
  }, []);
  console.log(contributorsList);
  return (
    <div>
      <Catalog contributorsList={contributorsList} />
    </div>
  );
};
export default ProjectsPage;
