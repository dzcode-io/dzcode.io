import { Theme, makeStyles } from "@material-ui/core/styles";

import { Card } from "src/apps/main/components/card";
import { EmptyCard } from "src/apps/main/components/empty-card";
import Grid from "@material-ui/core/Grid";
import { GridSpacing } from "@material-ui/core";
import { Project } from "src/types/fullstack";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "80vh",
    [theme.breakpoints.up("lg")]: {
      minHeight: "40vh",
      margin: `15vh 0`,
    },
  },
  title: {
    textAlign: "center",
    marginBottom: "60px",
    color: theme.palette.text.secondary,
  },
  subTitle: {
    textAlign: "center",
    marginBottom: "60px",
  },
  topProjects: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
  },
}));

export const TopProjects = (props: { topProjects: Project[] | null }) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h2">
        Top Community Projects
      </Typography>
      <Typography className={classes.subTitle} variant="h4">
        Find, Use and Improve solutions written by Algerians for Algerians
      </Typography>
      <Grid container className={classes.topProjects} spacing={4}>
        {props.topProjects
          ? props.topProjects.map((project: Project) => (
              <Grid key={`project-${project.slug}`} item xs={12} md={6} lg={4}>
                <Card
                  title={project.title}
                  image={project.image}
                  githubURI={project.githubURI}
                  description={project.description}
                />
              </Grid>
            ))
          : [1, 2, 3].map((id) => (
              <Grid key={`project-${id}`} item>
                <EmptyCard />
              </Grid>
            ))}
      </Grid>
    </section>
  );
};
