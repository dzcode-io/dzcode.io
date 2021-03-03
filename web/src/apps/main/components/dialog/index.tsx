import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import { Project } from "@dzcode.io/common/dist/types";
import React from "react";
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
  onClose: () => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, open, projects } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Contributions : </DialogTitle>
      <List style={{ margin: "1em" }}>
        {projects
          ? projects.map((project) => (
              <ListItem button key={`contributors-project-${project.slug}`}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={project.title} />
              </ListItem>
            ))
          : "Nothing to show here"}
      </List>
    </Dialog>
  );
}
