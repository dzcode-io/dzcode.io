import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Link } from "@dzcode.io/ui/dist/link";
import { Markdown } from "@dzcode.io/ui/dist/v2/markdown";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { FC } from "react";
import { Helmet } from "react-helmet";
import svg from "src/assets/svg/404.svg";
import { T, t } from "src/components/t";
import { useSliceSelector } from "src/redux/selectors";

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
  const { language } = useSliceSelector("settings");

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
        <Link href="/">
          <Button
            startIcon={language.code === "ar" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
            size="large"
          >
            <T notfound-back-home />
          </Button>
        </Link>
      </div>
    </ErrorBoundary>
  );
};

export default NotFound;
