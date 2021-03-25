import "./style.scss";

import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { ArticlesPageState } from "src/apps/main/redux/reducers/articles-page";
import { Authors } from "src/apps/main/components/authors";
import { Contributors } from "src/apps/main/components/contributors";
import { Divider } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import FacebookIcon from "@material-ui/icons/Facebook";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Markdown } from "src/apps/main/components/markdown";
import Skeleton from "@material-ui/lab/Skeleton";
import { SpeedDial } from "src/apps/main/components/speed-dial";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import { fetchCurrentArticle } from "src/apps/main/redux/actions/articles-page";

const actions = [
  { icon: <EditIcon />, name: "Edit This Article" },
  { icon: <FileCopyIcon />, name: "Copy URL" },
  { icon: <FacebookIcon />, name: "Share to Facebook" },
  { icon: <TwitterIcon />, name: "Share to Twitter" },
  { icon: <LinkedInIcon />, name: "Share to LinkedIn" },
  { icon: <InstagramIcon />, name: "Share to Instagram" },
];

const useStyles = makeStyles((theme) =>
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
    spacing: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  }),
);

export const Content: FC = () => {
  const { currentArticle } = useSelector<StateInterface, ArticlesPageState>(
    (state) => state.articlesPage,
  );
  const dispatch = useDispatch<Dispatch<ArticlesPageState>>();

  useEffect(() => {
    dispatch(fetchCurrentArticle());

    setTimeout(() => window.FB && window.FB.XFBML.parse(), 3000);
  }, []);

  const classes = useStyles();

  const ContentSkeleton = (
    <>
      <Skeleton variant="rect" width="100%">
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>
      <Typography variant="h4" gutterBottom>
        <Skeleton />
      </Typography>

      {[80, 70, 40, 80, 80, 10].map((width, index) => (
        <Skeleton
          key={`ss-${index}`}
          animation={index % 2 ? "pulse" : "wave"}
          width={`${width}%`}
        />
      ))}
    </>
  );

  return (
    <>
      {currentArticle ? (
        <>
          {/* Image */}
          {currentArticle.image && (
            <img
              className={classes.heroImage}
              src={currentArticle.image}
              alt={currentArticle.title}
            />
          )}
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            {currentArticle.title}
          </Typography>
          {/* Description */}
          <Typography variant="caption" display="block" gutterBottom>
            {currentArticle.description}
          </Typography>
          <Divider className={classes.spacing} />
          {/* Content */}
          <Markdown>{currentArticle.content + ""}</Markdown>
          {/* Actions */}
          <SpeedDial
            className={classes.speedDial}
            ariaLabel="Actions SpeedDial"
            actions={actions}
            open
          />
          <Divider className={classes.spacing} />
          {/* AUhtors */}
          <Authors githubAuthors={currentArticle.githubAuthors} />

          <Divider className={classes.spacing} />
          {/* Contributors */}
          <Contributors contributors={currentArticle.contributors} />
          <Divider className={classes.spacing} />
          {/* Comments */}
          <div
            className="fb-comments"
            data-href={location.origin + location.pathname}
            data-width="100%"
            data-numposts="5"
          />
          <div className={classes.spacing} />
        </>
      ) : (
        ContentSkeleton
      )}
    </>
  );
};
