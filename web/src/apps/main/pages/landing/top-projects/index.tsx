import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "src/apps/main/components/card";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { fetchTopProjects } from "src/apps/main/redux/actions/landing-page";
import { LandingPageState } from "src/apps/main/redux/reducers/landing-page";

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
  const dispatch = useDispatch<Dispatch<LandingPageState>>();

  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h4">
        <FormattedMessage id="landing.top.projects.h" defaultMessage="Top Community Projects" />
      </Typography>
      <Typography className={classes.subTitle} variant="h6" color="textSecondary">
        <FormattedMessage
          id="landing.top.projects.desc"
          defaultMessage="Find, Use and Improve solutions written by Algerians for Algerians"
        />
      </Typography>
      <Grid container className={classes.topProjects} spacing={4} alignContent="center">
        {topProjects === "ERROR" ? (
          <TryAgain
            error="Ops, an error occurred while loading the top projects, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchTopProjects())}
            stretch={true}
          />
        ) : topProjects ? (
          topProjects.map((project, index) => (
            <Grid key={`project-${index}`} item xs={12} md={6} lg={4}>
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
        ) : (
          [1, 2, 3].map((id) => (
            <Grid key={`project-${id}`} item xs={12} md={6} lg={4}>
              <Card />
            </Grid>
          ))
        )}
      </Grid>
    </section>
  );
};
