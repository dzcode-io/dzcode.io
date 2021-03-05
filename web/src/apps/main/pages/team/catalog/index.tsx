import { FC, useState } from "react";
import Card from "@material-ui/core/Card";
import { Contributors } from "src/apps/main/components/contributors";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
  },
  header: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    textAlign: "center",
  },
}));

interface CatalogProps {
  contributorsList:
    | { login: string; avatar_url: string; projects: string[] }[]
    | null;
}

export const Catalog: FC<CatalogProps> = ({ contributorsList }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        Our Team
      </Typography>
      <Grid container className={classes.root} spacing={4}>
        {contributorsList
          ? contributorsList.map(
              (contributor: {
                login: string;
                avatar_url: string;
                projects: string[];
              }) => (
                <Grid
                  key={`project-${contributor.login}`}
                  item
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <Contributors contributor={contributor}></Contributors>
                </Grid>
              ),
            )
          : [1, 2, 3].map((id) => (
              <Grid key={`project-${id}`} item>
                <Card />
              </Grid>
            ))}
      </Grid>
    </>
  );
};

Catalog.propTypes = {
  contributorsList: PropTypes.array.isRequired,
};
