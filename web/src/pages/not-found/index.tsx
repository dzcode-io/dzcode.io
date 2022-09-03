import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { FC } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import svg from "src/assets/svg/404.svg";
import { LinkV2 } from "src/components/link-v2";
import { T, t } from "src/components/t";

import { Markdown } from "../../components/markdown";
import { StateInterface } from "../../redux";
import { SettingsState } from "../../redux/reducers/settings";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  image: {
    marginTop: theme.spacing(4),
    width: "80%",
    maxWidth: "600px",
  },
  text: {
    padding: theme.spacing(4),
  },
}));

const NotFound: FC = () => {
  const classes = useStyles();
  const { language } = useSelector<StateInterface, SettingsState>((state) => state.settings);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("notfound-title")}</title>
        <meta name="description" content={t("notfound-description")} />
      </Helmet>
      <div className={classes.root}>
        <img className={classes.image} src={svg} alt="DzCode i/o: 404 page not found" />
        <Typography className={classes.text}>
          <Markdown t={t("notfound-subtitle")} />
        </Typography>
        <LinkV2 href="/">
          <Button
            startIcon={language.code === "ar" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
            size="large"
          >
            <T notfound-back-home />
          </Button>
        </LinkV2>
      </div>
    </ErrorBoundary>
  );
};

export default NotFound;
