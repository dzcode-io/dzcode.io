import { FC, useState } from "react";
import { Card } from "src/apps/main/components/card";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { SimpleDialog } from "src/apps/main/components/dialog";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatarsContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  avatar: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

interface ContributorsProps {
  contributor: { login: string; avatar_url: string; projects: string[] };
}

export const Contributors: FC<ContributorsProps> = ({ contributor }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        info={{
          image: contributor.avatar_url || "",
          title: contributor.login || "",
          description: "",
          actionLabel: "Contributions",
          handleOpen: handleOpen,
        }}
      />

      {open && (
        <SimpleDialog
          projects={contributor.projects}
          open={open}
          onClose={handleClose}
        />
      )}
    </>
  );
};

Contributors.propTypes = {
  contributor: PropTypes.any,
};
