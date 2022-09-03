import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { FC } from "react";
import image from "src/assets/svg/dzcode.svg";
import { LinkV2 } from "src/components/link-v2";
import { Markdown } from "src/components/markdown";
import { T, t } from "src/components/t";

export const Header: FC = () => {
  const useStyles = makeStyles((theme) => ({
    greenHighlight: {
      color: theme.palette.primary.main,
    },
    left: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        alignItems: "flex-start",
      },
    },
    title: {
      color: theme.palette.text.primary,
      textAlign: "center",
      fontSize: theme.typography.h5.fontSize,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.h4.fontSize,
      },
    },
    callToAction: {
      width: "100%",
    },
    button: {
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    description: {
      fontSize: theme.typography.body1.fontSize,
      margin: "40px 10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.h5.fontSize,
        margin: "65px 0",
        width: "90%",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Box width="100%" height="85vh">
      <Grid
        container
        style={{ width: "100%", height: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={7}>
          <Box className={classes.left}>
            <Typography component="h1" className={classes.title}>
              <Markdown
                t={t("landing-heading-title", {
                  CLASS: classes.greenHighlight,
                })}
              />
            </Typography>

            <Typography
              variant="body1"
              component="p"
              color="textPrimary"
              className={classes.description}
            >
              <Markdown t={t("landing-heading-subtitle")} />
            </Typography>

            <Box>
              <LinkV2 href="/Contribute" className={classes.callToAction}>
                <Button
                  color="primary"
                  variant="contained"
                  disableRipple
                  disableFocusRipple
                  size="large"
                  disableTouchRipple
                  className={classes.button}
                >
                  <T landing-cta-button />
                </Button>
              </LinkV2>
              <LinkV2 href="/FAQ">
                <Button
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  disableElevation
                  color="primary"
                  variant="text"
                  size="large"
                  className={classes.button}
                >
                  <T landing-help-button />
                </Button>
              </LinkV2>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Hidden smDown>
            <img src={image} alt="scrum board" />
          </Hidden>
        </Grid>
      </Grid>
    </Box>
  );
};
