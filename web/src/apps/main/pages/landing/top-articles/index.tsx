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
  topArticles: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
}));

export const TopArticles: FC = () => {
  const classes = useStyles();
  const { topArticles } = useSelector<StateInterface, LandingPageState>(
    (state) => state.landingPage,
  );

  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h4">
        Read Community Articles
      </Typography>
      <Typography
        className={classes.subTitle}
        variant="h6"
        color="textSecondary"
      >
        Read awesome articles, written by Algerian Developers
      </Typography>
      <Grid container className={classes.topArticles} spacing={4}>
        {topArticles
          ? topArticles.map((article) => (
              <Grid key={`article-${article.slug}`} item xs={12} md={6} lg={4}>
                <Card
                  info={{
                    image: article.image || "",
                    title: article.title,
                    description: article.description || "",
                    link: `/Articles/${article.slug}`,
                    actionLabel: "Read Article",
                  }}
                />
              </Grid>
            ))
          : [1, 2, 3].map((id) => (
              <Grid key={`article-${id}`} item xs={12} md={6} lg={4}>
                <Card />
              </Grid>
            ))}
      </Grid>
    </section>
  );
};
