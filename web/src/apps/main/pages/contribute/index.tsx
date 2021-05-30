import { FC } from "react";
import { Filters } from "./filters";
import Grid from "@material-ui/core/Grid";

export const ContributePage: FC = () => {
  return (
    <Grid container className="contribute">
      {/* Filters */}
      <Grid item xs={false} md={3} style={{ paddingTop: "1rem" }}>
        <Filters />
      </Grid>
      {/* Content */}
      <Grid item xs md={7}>
        contribution cards go here
      </Grid>
    </Grid>
  );
};

export default ContributePage;
