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
import { LinkV2 } from "src/apps/main/components/link-v2";
import { Dispatch } from "src/apps/main/redux";
import { fetchCurrentArticleAuthors } from "src/apps/main/redux/actions/articles-page";
import { ArticlesPageState } from "src/apps/main/redux/reducers/articles-page";

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
  githubAuthors: LOADABLE<GithubUser[]>;
}

export const Authors: FC<AuthorsProps> = ({ githubAuthors }) => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<ArticlesPageState>>();

  return (
    <div>
      {githubAuthors === "ERROR" ? (
        <TryAgain
          error="Ops, an error occurred while loading the authors for the selected article, please try again..."
          action="Try Again"
          onClick={() => dispatch(fetchCurrentArticleAuthors())}
        />
      ) : (
        <>
          <Typography variant="h6" color="textSecondary">
            Written by
          </Typography>
          <div className={classes.avatarsContainer}>
            {githubAuthors
              ? githubAuthors.map((author, index) => (
                  <LinkV2 key={`author-${index}`} className={classes.avatar} href={author.html_url}>
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
        </>
      )}
    </div>
  );
};
