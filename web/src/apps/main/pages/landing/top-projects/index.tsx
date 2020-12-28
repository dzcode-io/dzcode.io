import { Card } from "src/apps/main/components/card";
import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { LandingPageState } from "src/apps/main/redux/reducers/landing-page";
import { StateInterface } from "src/apps/main/redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    minHeight: "80vh",
    [theme.breakpoints.up("lg")]: {
      minHeight: "40vh",
    },
  },
  title: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
  subTitle: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
  topProjects: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
}));

export const TopProjects: FC = () => {
  const classes = useStyles();
  const { topProjects } = useSelector<StateInterface, LandingPageState>(
    (state) => state.landingPage,
  );

  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h4">
        Top Community Projects
      </Typography>
      <Typography
        className={classes.subTitle}
        variant="h6"
        color="textSecondary"
      >
        Find, Use and Improve solutions written by Algerians for Algerians
      </Typography>
      <Grid container className={classes.topProjects} spacing={4}>
        {topProjects
          ? topProjects.map((project) => (
              <Grid key={`project-${project.slug}`} item xs={12} md={6} lg={4}>
                <Card
                  info={{
                    image: project.image || "",
                    title: project.title,
                    description: project.description || "",
                    link: `https://github.com/${project.githubURI}`,
                    actionLabel: "Go To Code",
                  }}
                />
              </Grid>
            ))
          : [1, 2, 3].map((id) => (
              <Grid key={`project-${id}`} item xs={12} md={6} lg={4}>
                <Card />
              </Grid>
            ))}
      </Grid>
    </section>
  );
};
