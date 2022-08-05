import AutoFixHigh from "@mui/icons-material/AutoFixHigh";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface ContributionItemProps {
  description: string;
}

const ContributionItem = ({ description }: ContributionItemProps) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <AutoFixHigh sx={{ color: "#fff" }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={description} />
    </ListItem>
  );
};

interface ContributionListProps {
  title: string;
  items: Array<{
    label: string;
  }>;
}

const ContributionList = ({ title, items }: ContributionListProps) => {
  return (
    <>
      <Typography variant="h4" component="h2" textAlign="center" margin={2}>
        {title}
      </Typography>
      <List>
        {items &&
          items.map((item, index) => <ContributionItem key={index} description={item.label} />)}
      </List>
    </>
  );
};

export interface ContributionsDialogProps {
  repositoriesText: string;
  open: boolean;
  repositories?: { provider: string; owner: string; repository: string }[];
  onClose: () => void;
}

export const ContributionsDialog: FC<ContributionsDialogProps> = ({
  onClose,
  open,
  repositories,
  repositoriesText,
}) => {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      onClose={onClose}
      aria-labelledby="contribution"
      data-testid="contribution-dialog"
      open={open}
    >
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          {repositories && repositories.length > 0 && (
            <ContributionList
              title={repositoriesText}
              items={repositories.map((repository) => ({
                label: repository.repository,
              }))}
            />
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
};
