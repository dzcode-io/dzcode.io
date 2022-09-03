import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { t } from "src/components/t";
import { ContributePageState } from "src/redux/reducers/contribute-page";

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
    <ErrorBoundary>
      <Helmet>
        <title>{t("contribute-title")}</title>
        <meta name="description" content={t("contribute-description")} />
      </Helmet>
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
    </ErrorBoundary>
  );
};

export default ContributePage;
