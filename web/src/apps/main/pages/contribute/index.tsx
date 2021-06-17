import { FC, useEffect } from "react";
import { ContributePageState } from "src/apps/main/redux/reducers/contribute-page";
import { Contributions } from "./contributions";
import { Dispatch } from "../../redux";
import { Filters } from "./filters";
import Grid from "@material-ui/core/Grid";
import { fetchContributions } from "../../redux/actions/contribute-page";
import { useDispatch } from "react-redux";

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
