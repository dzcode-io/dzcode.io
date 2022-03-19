import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import { AutoFixHigh } from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

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
      <Typography variant="h4" component="h2" textAlign="center">
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
  open: boolean;
  projects?: Project[];
  repositories?: { provider: string; owner: string; repository: string }[];
  onClose: () => void;
}

export function ContributionsDialog(props: ContributionsDialogProps) {
  const { onClose, open, projects, repositories } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-labelledby="contribution"
      data-testid="contribution-dialog"
      open={open}
    >
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <DialogTitle
            id="contribution"
            sx={{ textAlign: "center", fontSize: "typography.h2.fontSize" }}
          >
            Contributions
          </DialogTitle>
        </Grid>
        <Grid item xs={12}>
          {repositories && repositories.length > 0 && (
            <ContributionList
              title="Repositories"
              items={repositories.map((repository) => ({
                label: repository.repository,
              }))}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {projects && projects.length > 0 && (
            <ContributionList
              title="Projects"
              items={projects.map((project) => ({ label: project.title }))}
            />
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
}
