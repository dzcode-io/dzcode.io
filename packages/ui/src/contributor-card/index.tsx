import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";

import { ContributionsDialog } from "../dialog";

const styles = {
  root: {
    width: "100%",
    maxWidth: 300,
  },
  content: {
    width: "100%",
  },
  media: {
    height: 300,
    width: 300,
  },
};

export const ContributorSkeleton = () => {
  return (
    <MuiCard variant="outlined" sx={{ ...styles.root }}>
      <CardActionArea data-testid="contributor-card-skeleton">
        <Skeleton animation="wave" variant="rectangular" sx={{ ...styles.media }} />
        <CardContent sx={{ ...styles.content }}>
          <Typography variant="h3">
            <Skeleton animation="wave" />
          </Typography>
          <Skeleton animation="wave" width={100} />
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};

interface ContributorCardProps {
  contributor: ContributorEntity;
}

export const ContributorCard: FC<ContributorCardProps> = ({ contributor }) => {
  const [open, setOpen] = useState(false);
  const { avatarUrl, username, repositories } = contributor;
  return (
    <MuiCard variant="outlined" sx={{ ...styles.root }}>
      <CardMedia image={avatarUrl} title={username} sx={{ ...styles.media }} />
      <CardContent sx={{ ...styles.content }}>
        <Typography component="h3" variant="h6" textAlign="center">
          {username}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => setOpen(true)}
          size="small"
          color="primary"
          fullWidth
          variant="contained"
        >
          Contributions
        </Button>
      </CardActions>
      <ContributionsDialog repositories={repositories} open={open} onClose={() => setOpen(false)} />
    </MuiCard>
  );
};
