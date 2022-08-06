import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { FC } from "react";
import { Card } from "src/apps/main/components/card";
import { T, t } from "src/apps/main/components/t";

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
  projectsList: Pick<Project, "title" | "description" | "image" | "githubURI">[] | null;
}

export const Catalog: FC<CatalogProps> = ({ projectsList }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        <T projects-header-title />
      </Typography>
      <Grid container className={classes.root} spacing={4} justifyContent="space-around">
        {projectsList
          ? projectsList.map((project, index) => (
              <Grid key={`project-${index}`} item xs={12} md={6} lg={4}>
                <Card
                  info={{
                    image: project.image || "",
                    title: project.title || "",
                    description: project.description || "",
                    link: `https://www.github.com/${project.githubURI}`,
                    actionLabel: t("projects-card-cta-button"),
                  }}
                />
              </Grid>
            ))
          : [1, 2, 3].map((id) => (
              <Grid key={`project-${id}`} item>
                <Card />
              </Grid>
            ))}
      </Grid>
    </>
  );
};
