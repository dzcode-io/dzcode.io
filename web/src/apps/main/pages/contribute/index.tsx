import { Contributions } from "./contributions";
import { FC } from "react";
import { Filters } from "./filters";
import Grid from "@material-ui/core/Grid";

export const ContributePage: FC = () => {
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
