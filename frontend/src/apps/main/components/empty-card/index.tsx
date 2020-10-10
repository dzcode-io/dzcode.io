import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
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
  cardRoot: {
    maxWidth: 300,
    width: "90vw",
  },
  media: {
    height: 300,
  },
}));

export const EmptyCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.cardRoot}>
      <CardActionArea>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <CardContent>
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
