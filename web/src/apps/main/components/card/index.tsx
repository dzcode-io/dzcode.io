import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { LinkV2 } from "src/components/link-v2";
import MuiCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  image?: string;
  title?: string;
  description?: string;
  githubURI?: string;
  slug?: string;
}

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    textAlign: "center",
  },
  media: {
    height: 300,
  },
  link: {
    color: theme.palette.primary.dark,
  },
}));

export const Card = ({ image, title, description, githubURI, slug }: Props) => {
  const classes = useStyles();
  return (
    <MuiCard>
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {githubURI && (
          <Button
            size="small"
            color="primary"
            href={`https://github.com/${githubURI}`}
          >
            Github Repository
          </Button>
        )}
        {!githubURI && slug && (
          <Button size="small" color="primary">
            <LinkV2 href={`/Articles/${slug}`} className={classes.link}>
              Read Article
            </LinkV2>
          </Button>
        )}
      </CardActions>
    </MuiCard>
  );
};
