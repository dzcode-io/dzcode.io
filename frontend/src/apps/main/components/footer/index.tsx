import * as React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { LinkV2 as Link } from "../../../../components/link-v2";
import { ReduxState } from "../../types";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

type link = {
  href: string;
  text: string;
};

type category = {
  title: string;
  links: link[];
};

export interface FooterInitialState {
  data: category[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    padding: "30px",
  },
  copyright: {
    fontSize: "14px",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.light,
      textDecoration: "none",
    },
  },
  linkText: {
    paddingBottom: "8px",
  },
  categoryTitle: {
    paddingBottom: "12px",
  },
}));

export const Footer: React.FC = () => {
  const classes = useStyles();

  const data = useSelector(
    (state: ReduxState) => state.layout.footerInitialState.data,
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
                          <Link href={link.href} className={classes.link}>
                            {link.text}
                          </Link>
                        </Typography>
                      );
                    })}
                  </Grid>
                ))
              : null}
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className={classes.copyright}>
              Copyright © 2020 dzCode inc
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
