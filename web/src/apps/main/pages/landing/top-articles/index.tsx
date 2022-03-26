import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "src/apps/main/components/card";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { fetchTopArticles } from "src/apps/main/redux/actions/landing-page";
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
  const dispatch = useDispatch<Dispatch<LandingPageState>>();

  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h4">
        <FormattedMessage id="landing.read.articles.h" defaultMessage="Read Community Articles" />
      </Typography>
      <Typography className={classes.subTitle} variant="h6" color="textSecondary">
        <FormattedMessage
          id="landing.read.articles.desc"
          defaultMessage="Read awesome articles, written by Algerian Developers"
        />
      </Typography>
      <Grid container className={classes.topArticles} spacing={4}>
        {topArticles === "ERROR" ? (
          <TryAgain
            error="Ops, an error occurred while loading the top articles, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchTopArticles())}
            stretch={true}
          />
        ) : topArticles ? (
          topArticles.map((article) => (
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
        ) : (
          [1, 2, 3].map((id) => (
            <Grid key={`article-${id}`} item xs={12} md={6} lg={4}>
              <Card />
            </Grid>
          ))
        )}
      </Grid>
    </section>
  );
};
