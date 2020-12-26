import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { Article } from "src/types/fullstack";
import { Card } from "src/apps/main/components/card";
import { EmptyCard } from "src/apps/main/components/empty-card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "80vh",
      [theme.breakpoints.up("lg")]: {
        minHeight: "40vh",
        margin: `15vh 0`,
      },
    },
    title: {
      textAlign: "center",
      margin: "60px 0",
      color: theme.palette.text.secondary,
    },
    subTitle: {
      textAlign: "center",
      marginBottom: "60px",
    },
    TopArticles: {
      flexGrow: 1,
      paddingBottom: theme.spacing(4),
    },
  }),
);

export const TopArticles = (props: { topArticles: Article[] | null }) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h2">
        Read Community Articles
      </Typography>
      <Typography className={classes.subTitle} variant="h4">
        Read awesome articles, written by Algerian Developers
      </Typography>
      <Grid container className={classes.TopArticles} spacing={4}>
        {props.topArticles
          ? props.topArticles.map((article: Article) => (
              <Grid key={`article-${article.slug}`} item xs={12} md={6} lg={4}>
                <Card
                  title={article.title}
                  image={article.image}
                  slug={article.slug}
                  description={article.description}
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
