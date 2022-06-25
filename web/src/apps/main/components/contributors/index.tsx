import { GithubUser } from "@dzcode.io/api/dist/app/types/legacy";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "src/apps/main/redux";
import { fetchCurrentArticleContributors } from "src/apps/main/redux/actions/articles-page";
import { ArticlesPageState } from "src/apps/main/redux/reducers/articles-page";
import { LinkV2 } from "src/components/link-v2";

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
  contributors: LOADABLE<GithubUser[]>;
}

export const Contributors: FC<ContributorsProps> = ({ contributors }) => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<ArticlesPageState>>();

  return (
    <div>
      {contributors === "ERROR" ? (
        <TryAgain
          error="Ops, an error occurred while loading the contributors for the selected article, please try again..."
          action="Try Again"
          onClick={() => dispatch(fetchCurrentArticleContributors())}
        />
      ) : (
        <>
          <Typography variant="h6" color="textSecondary">
            With the help of
          </Typography>
          <div className={classes.avatarsContainer}>
            {contributors
              ? contributors.map((contributor, index) => (
                  <LinkV2
                    key={`contributor-${index}`}
                    className={classes.avatar}
                    href={contributor.html_url}
                  >
                    <Tooltip title={contributor.login} aria-label={contributor.login}>
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
        </>
      )}
    </div>
  );
};
