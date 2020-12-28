import { FC, ValidationMap } from "react";

import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { LinkV2 } from "src/components/link-v2";
import MuiCard from "@material-ui/core/Card";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/core/Skeleton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface CardInfo {
  image: string;
  title: string;
  description: string;
  link: string;
  actionLabel: string;
}

interface CardProps {
  info?: CardInfo;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1",
  },
  media: {
    height: 200,
  },
  link: {
    color: theme.palette.primary.dark,
  },
}));

export const Card: FC<CardProps> = ({ info }) => {
  const classes = useStyles();
  return (
    <MuiCard className={classes.root}>
      {info ? (
        <>
          <CardMedia
            className={classes.media}
            image={info.image}
            title={info.title}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {info.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {info.description}
            </Typography>
          </CardContent>
          <CardActions>
            <LinkV2 href={info.link}>
              <Button size="small" color="primary">
                {info.actionLabel}
              </Button>
            </LinkV2>
          </CardActions>
        </>
      ) : (
        <CardActionArea>
          <Skeleton
            animation="wave"
            variant="rectangular"
            className={classes.media}
          />
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
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  info: PropTypes.shape<ValidationMap<CardInfo>>({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    actionLabel: PropTypes.string.isRequired,
  }),
};
