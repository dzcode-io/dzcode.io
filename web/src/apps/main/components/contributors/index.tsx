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

interface ContributorsProps {
  contributors?: GithubUser[];
}

export const Contributors: FC<ContributorsProps> = ({ contributors }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" color="textSecondary">
        Contributors
      </Typography>
      <div className={classes.avatarsContainer}>
        {contributors
          ? contributors.map((contributor, index) => (
              <LinkV2
                key={`contributor-${index}`}
                className={classes.avatar}
                href={contributor.html_url}
              >
                <Tooltip
                  title={contributor.login}
                  aria-label={contributor.login}
                >
                  <Avatar src={contributor.avatar_url} />
                </Tooltip>
              </LinkV2>
            ))
          : [1, 2, 3].map((item, index) => (
              <Skeleton
                key={`contributor-${index}`}
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

Contributors.propTypes = {
  contributors: PropTypes.array,
};
