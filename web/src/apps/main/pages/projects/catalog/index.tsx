import { Card } from "src/apps/main/components/card";
import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { Project } from "@dzcode.io/common/dist/types";
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
  projectsList: Project[] | null;
}

export const Catalog: FC<CatalogProps> = ({ projectsList }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        Open Source Projects
      </Typography>
      <Grid container className={classes.root} spacing={4}>
        {projectsList
          ? projectsList.map((project: Project) => (
              <Grid key={`project-${project.slug}`} item xs={12} md={6} lg={4}>
                <Card
                  info={{
                    image: project.image || "",
                    title: project.title || "",
                    description: project.description || "",
                    link: `https://www.github.com/${project.githubURI}`,
                    actionLabel: "Go To Code",
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

Catalog.propTypes = {
  projectsList: PropTypes.array.isRequired,
};
