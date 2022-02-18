import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { FC, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Dispatch } from "src/apps/main/redux";
import { fetchTopArticles, fetchTopProjects } from "src/apps/main/redux/actions/landing-page";
import { LandingPageState } from "src/apps/main/redux/reducers/landing-page";
import { LinkV2 } from "src/components/link-v2";

import { Header } from "./header";
import { Mobile } from "./mobile";
import { TopArticles } from "./top-articles";
import { TopProjects } from "./top-projects";

const useStyles = makeStyles((theme) =>
  createStyles({
    hr: {
      maxWidth: "300px",
      width: "90%",
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(0),
    },
    button: {
      marginBottom: theme.spacing(4),
      display: "inline-block",
    },
  }),
);

export const LandingPage: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<LandingPageState>>();

  useEffect(() => {
    dispatch(fetchTopProjects());
    dispatch(fetchTopArticles());
  }, []);

  return (
    <>
      <Header />
      <TopProjects />
      <div style={{ textAlign: "center" }}>
        <LinkV2 className={classes.button} href="/Projects">
          <Button endIcon={<ArrowForwardIcon />} size="large">
            <FormattedMessage id="landing.more.projects" defaultMessage="See More Projects" />
          </Button>
        </LinkV2>
        <hr className={classes.hr} />
      </div>
      <TopArticles />
      <div style={{ textAlign: "center" }}>
        <LinkV2 className={classes.button} href="/Articles">
          <Button endIcon={<ArrowForwardIcon />} size="large">
            <FormattedMessage id="landing.more.articles" defaultMessage="Explore More Articles" />
          </Button>
        </LinkV2>
      </div>
      <Mobile />
    </>
  );
};

export default LandingPage;
