import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Article } from "t9/types/fullstack";
import EditIcon from "@material-ui/icons/Edit";
import FacebookIcon from "@material-ui/icons/Facebook";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Markdown } from "t9/apps/main/components/markdown";
import Skeleton from "@material-ui/lab/Skeleton";
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
    ContentSkeleton: {},
  }),
);

export const Content = (props: ContentInterface) => {
  useEffect(() => {
    props.fetchCurrentArticle();
    setTimeout(() => {
      window.FB && window.FB.XFBML.parse();
    }, 3000);
  }, []);

  const classes = useStyles();
  const { currentArticle } = props;

  const ContentSkeleton = (
    <>
      <Skeleton variant="rect" width="100%">
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>
      <Typography variant="h3" gutterBottom>
        <Skeleton />
      </Typography>

      {[80, 70, 40, 80, 80, 10].map((width, index) => (
        <Skeleton
          key={`ss-${index}`}
          className={classes.ContentSkeleton}
          animation={index % 2 ? "pulse" : "wave"}
          width={`${width}%`}
        />
      ))}
    </>
  );

  return (
    <div className="content">
      {currentArticle ? (
        <div>
          {/* Image */}
          {currentArticle.image && (
            <img
              className={classes.heroImage}
              src={currentArticle.image}
              alt={currentArticle.title}
            />
          )}
          {/* Title */}
          <Typography variant="h3" gutterBottom>
            {currentArticle.title}
          </Typography>
          {/* Description */}
          <Typography variant="caption" display="block" gutterBottom>
            {currentArticle.description}
          </Typography>
          <hr />
          {/* Content */}
          <Markdown>{currentArticle.content + ""}</Markdown>
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
        ContentSkeleton
      )}
    </div>
  );
};

export interface ContentInterface {
  fetchCurrentArticle: () => void;
  currentArticle: Article | null;
}
