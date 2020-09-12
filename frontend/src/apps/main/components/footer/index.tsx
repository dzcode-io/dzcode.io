import * as React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { LinkV2 } from "src/components/link-v2";
import { StateInterface } from "t9/types/main";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.background.paper}`,
    padding: "30px",
  },
  copyright: {
    fontSize: "14px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,

    "&:hover": {
      color: theme.palette.primary.light,
      textDecoration: "none",
    },
  },
  linkText: {
    paddingBottom: "8px",
  },
  categoryTitle: {
    color: theme.palette.text.secondary,
    paddingBottom: "12px",
  },
}));

export const Footer: React.FC = () => {
  const classes = useStyles();

  const data = useSelector(
    (state: StateInterface) => state.layout.footerInitialState.data,
  );

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          alignContent="stretch"
        >
          <Grid container item xs={12} md={9} spacing={6}>
            {data
              ? data.map((category, i) => (
                  <Grid
                    direction="column"
                    container
                    item
                    xs={12}
                    md={6}
                    key={i}
                  >
                    <Typography variant="h6" className={classes.categoryTitle}>
                      {category.title}
                    </Typography>
                    {category.links.map((link, i) => {
                      return (
                        <Typography
                          key={i}
                          variant="subtitle2"
                          color="initial"
                          className={classes.linkText}
                        >
                          <LinkV2 href={link.href} className={classes.link}>
                            {link.text}
                          </LinkV2>
                        </Typography>
                      );
                    })}
                  </Grid>
                ))
              : null}
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid item>
              <h1>dzCode.io</h1>
              <h5>dzCode, Algeria</h5>
              <Grid item>
                <a href="tel:+21367-626-1157">+213 06-76-26-11-57</a>
              </Grid>
              <Grid item>
                <a href="mailto:contact@dzcode.io">contact@dzcode.io</a>
              </Grid>
            </Grid>
            <Typography variant="h6" className={classes.copyright}>
              Copyright © 2020{" "}
              <LinkV2
                className={classes.link}
                href="https://twitter.com/dzcode_io"
              >
                @dzCode.io
              </LinkV2>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
