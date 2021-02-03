import Avatar from "@material-ui/core/Avatar";
import { FC } from "react";
import { GithubUser } from "@dzcode.io/common/dist/types";
import { LinkV2 } from "src/components/link-v2";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
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

interface AuthorsProps {
  githubAuthors?: GithubUser[];
}

export const Authors: FC<AuthorsProps> = ({ githubAuthors }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" color="textSecondary">
        Authors
      </Typography>
      <div className={classes.avatarsContainer}>
        {githubAuthors
          ? githubAuthors.map((author, index) => (
              <LinkV2
                key={`author-${index}`}
                className={classes.avatar}
                href={author.html_url}
              >
                <Tooltip title={author.login} aria-label={author.login}>
                  <Avatar src={author.avatar_url} />
                </Tooltip>
              </LinkV2>
            ))
          : [1, 2, 3].map((item, index) => (
              <Skeleton
                key={`author-${index}`}
                className={classes.avatar}
                variant="circle"
                width={40}
                height={40}
              />
            ))}
      </div>
    </div>
  );
};

Authors.propTypes = {
  githubAuthors: PropTypes.array,
};
