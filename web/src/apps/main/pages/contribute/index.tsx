import Grid from "@material-ui/core/Grid";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ContributePageState } from "src/apps/main/redux/reducers/contribute-page";

import { Dispatch } from "../../redux";
import { fetchContributions } from "../../redux/actions/contribute-page";
import { Contributions } from "./contributions";
import { Filters } from "./filters";

export const ContributePage: FC = () => {
  const dispatch = useDispatch<Dispatch<ContributePageState>>();
  useEffect(() => {
    dispatch(fetchContributions());
  }, []);

  return (
    <Grid container className="contribute-page" spacing={1}>
      {/* Filters */}
      <Grid item xs={false} md={3}>
        <Filters />
      </Grid>
      {/* Content */}
      <Grid item xs={12} md={9}>
        <Contributions />
      </Grid>
    </Grid>
  );
};

export default ContributePage;
