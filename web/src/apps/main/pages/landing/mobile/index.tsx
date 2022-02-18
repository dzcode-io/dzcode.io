import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import androidDark from "src/apps/main/assets/png/android-dark.png";
import androidLight from "src/apps/main/assets/png/android-light.png";
import iosDark from "src/apps/main/assets/png/ios-dark.png";
import iosLight from "src/apps/main/assets/png/ios-light.png";
import { StateInterface } from "src/apps/main/redux";
import { LinkV2 } from "src/components/link-v2";
import { fullstackConfig } from "src/config";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    minHeight: "80vh",
    [theme.breakpoints.up("lg")]: {
      minHeight: "40vh",
    },
  },
  title: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
  subTitle: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
  mobile: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  mobileApps: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    textAlign: "center",
  },
  mobileApp: {
    height: 480,
    borderRadius: 25,
    transition: "boxShadow .5s",
    "&:hover": {
      boxShadow: "inset 0 0 25px 20px #7c6d6d4d",
      cursor: "pointer",
    },
  },
}));

export const Mobile: FC = () => {
  const classes = useStyles();
  const { settings } = useSelector<StateInterface, StateInterface>((state) => state);
  const mobileApps = [
    {
      image: settings.darkMode ? androidDark : androidLight,
      href: fullstackConfig.mobile.android.url,
    },
    { image: settings.darkMode ? iosDark : iosLight, href: fullstackConfig.mobile.ios.url },
  ];

  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h4">
        <FormattedMessage id="landing.mobile.h" defaultMessage="Going Mobile" />
      </Typography>
      <Typography className={classes.subTitle} variant="h6" color="textSecondary">
        <FormattedMessage
          id="landing.mobile.desc"
          defaultMessage={`Meet the DzCode i/o Mobile App and
              Stay up-to-date with state of dz open-source on iOS and
              Android`}
        />
      </Typography>
      <Grid container className={classes.mobileApps} spacing={4}>
        {mobileApps.map((mobileApp, i) => (
          <Grid key={`mobile-app-${i}`} item xs={12} md={6} lg={6}>
            <LinkV2 href={mobileApp.href}>
              <img className={classes.mobileApp} src={mobileApp.image} />
            </LinkV2>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
