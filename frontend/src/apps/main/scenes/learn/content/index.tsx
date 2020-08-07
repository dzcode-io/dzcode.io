import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Document } from "t9/types/fullstack";
import EditIcon from "@material-ui/icons/Edit";
import FacebookIcon from "@material-ui/icons/Facebook";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Markdown } from "t9/apps/main/components/markdown";
import { SpeedDial } from "t9/apps/main/components/SpeedDial";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";

const actions = [
  { icon: <EditIcon />, name: "Edit This Article" },
  { icon: <FileCopyIcon />, name: "Copy URL" },
  { icon: <FacebookIcon />, name: "Share to Facebook" },
  { icon: <TwitterIcon />, name: "Share to Twitter" },
  { icon: <LinkedInIcon />, name: "Share to LinkedIn" },
  { icon: <InstagramIcon />, name: "Share to Instagram" },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroImage: {
      width: "100%",
      maxHeight: "400px",
      objectFit: "cover",
    },
    speedDial: {
      position: "fixed",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
  }),
);

export const Content = (props: ContentInterface) => {
  const classes = useStyles();
  useEffect(() => {
    props.fetchCurrentDocument();
    setTimeout(() => {
      window.FB && window.FB.XFBML.parse();
    }, 3000);
  }, []);
  const { currentDocument } = props;
  return (
    <div className="content">
      {currentDocument ? (
        <div>
          {/* Image */}
          {currentDocument.image && (
            <img
              className={classes.heroImage}
              src={currentDocument.image}
              alt={currentDocument.title}
            />
          )}
          {/* Title */}
          <Typography variant="h2" component="h2" gutterBottom>
            {currentDocument.title}
          </Typography>
          {/* Description */}
          <Typography variant="caption" display="block" gutterBottom>
            {currentDocument.description}
          </Typography>
          <hr />
          {/* Content */}
          <Markdown>{currentDocument.content + ""}</Markdown>
          {/* Actions */}
          <SpeedDial
            className={classes.speedDial}
            ariaLabel="Actions SpeedDial"
            actions={actions}
          />
          {/* Comments */}
          <div
            className="fb-comments"
            data-href={location.origin + location.pathname}
            data-width="100%"
            data-numposts="5"
          />
        </div>
      ) : (
        "Loading Document..."
      )}
    </div>
  );
};

export interface ContentInterface {
  fetchCurrentDocument: () => void;
  currentDocument: Document | null;
}
