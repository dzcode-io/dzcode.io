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
  projects?: Array<{
    slug: string;
    image?: string;
    title: string;
    description?: string;
    content?: string;
    authors?: string[];
    contributors?: string[];
    views?: number;
    githubURI?: string;
  }>;
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
