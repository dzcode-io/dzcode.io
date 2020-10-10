import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MuiCard from "@material-ui/core/Card";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  image?: string;
  title?: string;
  description?: string;
  githubURI?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    textAlign: "center",
  },
  media: {
    height: 300,
  },
}));

export const Card = ({ image, title, description, githubURI }: Props) => {
  const classes = useStyles();

  return (
    <MuiCard>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={`https://github.com/${githubURI}`}
        >
          Github Repository
        </Button>
      </CardActions>
    </MuiCard>
  );
};
