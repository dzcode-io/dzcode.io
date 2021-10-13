import { Box, Button, Grid, Hidden, Typography } from "@material-ui/core";

import { FC } from "react";
import { LinkV2 } from "src/components/link-v2";
import image from "src/apps/main/assets/svg/dzcode.svg";
import { makeStyles } from "@material-ui/core/styles";

export const Header: FC = ({}) => {
  const useStyles = makeStyles((theme) => ({
    greenHighlight: {
      color: theme.palette.primary.main,
    },
    left: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        alignItems: "flex-start",
      },
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.primary,
      textAlign: "center",
      fontSize: theme.typography.h4.fontSize,
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
        fontSize: theme.typography.h2.fontSize,
        marginBottom: 0,
      },
    },
    callToAction: {
      width: "100%",

      [theme.breakpoints.up("sm")]: {
        marginRight: "50px",
      },
    },
    button: {
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    buttons: {
      width: "100%",
    },
    description: {
      fontSize: theme.typography.h5.fontSize,
      margin: "40px 10px",
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
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
              Algerian <span className={classes.greenHighlight}>Open Source</span> Community
            </Typography>

            <Typography
              variant="body1"
              component="p"
              color="textPrimary"
              className={classes.description}
            >
              Whether you&apos;re a maintainer or an open-source enthusiast DzCode helps you{" "}
              <LinkV2 href="/Projects">find</LinkV2>, <LinkV2 href="/Contribute">contribute</LinkV2>{" "}
              and <LinkV2 href="/Projects">list</LinkV2> open-source projects that solve Algerian
              problems.
            </Typography>

            <Box className={classes.buttons}>
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
                  Make a Contribution
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
                  Have a question ?
                </Button>
              </LinkV2>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Hidden smDown>
            <Box display="flex" width="100%" height="100%" alignItems="center">
              <img src={image} alt="scrum board" />
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </Box>
  );
};
