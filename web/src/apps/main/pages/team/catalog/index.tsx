import { FC, useState } from "react";
import Card from "@material-ui/core/Card";
import { Contributor } from "src/apps/main/components/contributors";
import Grid from "@material-ui/core/Grid";
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
  teamList:
    | {
        id: string;
        username: string;
        avatarUrl: string;
        repositories: { provider: string; owner: string; repository: string }[];
      }[]
    | null;
}

export const Catalog: FC<CatalogProps> = ({ teamList }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        Our Team
      </Typography>
      <Grid container className={classes.root} spacing={4}>
        {teamList
          ? teamList.map(
              (contributor: {
                id: string;
                username: string;
                avatarUrl: string;
                repositories: { provider: string; owner: string; repository: string }[];
              }) => (
                <Grid key={`contributor-${contributor.id}`} item xs={12} md={6} lg={4}>
                  <Contributor contributor={contributor} />
                </Grid>
              ),
            )
          : [1, 2, 3].map((id) => (
              <Grid key={`contributor-${id}`} item>
                <Card />
              </Grid>
            ))}
      </Grid>
    </>
  );
};
