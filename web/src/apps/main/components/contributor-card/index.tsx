import { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import MuiCard from "@material-ui/core/Card";
import { SimpleDialog } from "src/apps/main/components/dialog";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface ContributorCardProps {
  contributor?: ContributorEntity;
}

const useStyles = makeStyles(() => ({
  root: {
    width: 250,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1",
  },
  media: {
    height: 250,
    width: 250,
  },
}));

export const ContributorCard: FC<ContributorCardProps> = ({ contributor }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <MuiCard className={classes.root} variant="outlined">
        {contributor ? (
          <>
            <CardMedia
              className={classes.media}
              image={contributor.avatarUrl}
              title={contributor.username}
            />
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h6">
                {contributor.username}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => setOpen(true)} size="small" color="primary">
                Contributions
              </Button>
            </CardActions>
            {open && (
              <SimpleDialog
                repositories={contributor.repositories}
                open={open}
                onClose={() => setOpen(false)}
              />
            )}
          </>
        ) : (
          <CardActionArea>
            <Skeleton animation="wave" variant="rect" className={classes.media} />
            <CardContent>
              <>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </>
            </CardContent>
          </CardActionArea>
        )}
      </MuiCard>
    </>
  );
};
