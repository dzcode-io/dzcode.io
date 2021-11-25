import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Edit } from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface SimpleDialogProps {
  open: boolean;
  projects?: Project[];
  repositories?: { provider: string; owner: string; repository: string }[];
  onClose: () => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, open, projects, repositories } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {open && (
        <Dialog
          maxWidth={"sm"}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">Contributions : </DialogTitle>
          <List style={{ margin: "0.6em" }}>
            {projects
              ? projects.map((project) => (
                  <ListItem
                    style={{ marginBottom: "1em" }}
                    button
                    key={`contributors-project-${project.slug}`}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <Edit />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={project.title} />
                  </ListItem>
                ))
              : repositories
              ? repositories.map((repository) => (
                  <ListItem
                    style={{ marginBottom: "1em" }}
                    button
                    key={`contributors-project-${repository.repository}`}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <Edit />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={repository.repository} />
                  </ListItem>
                ))
              : "Nothing To See Here"}
          </List>
        </Dialog>
      )}
    </>
  );
}
