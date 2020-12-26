import { Theme, makeStyles } from "@material-ui/core/styles";

import { Card } from "src/apps/main/components/card";
import { EmptyCard } from "src/apps/main/components/empty-card";
import Grid from "@material-ui/core/Grid";
import { Project } from "src/types/fullstack";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
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

export const Catalog = (props: { projectsList: Project[] | null }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" component="h1" className={classes.header}>
        Open Source Projects
      </Typography>
      <Grid container className={classes.root} spacing={4}>
        {props.projectsList
          ? props.projectsList.map((project: Project) => (
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
    </>
  );
};
