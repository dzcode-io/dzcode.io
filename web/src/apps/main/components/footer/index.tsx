import Container from "@material-ui/core/Container";
import { FC } from "react";
import { FooterComponentState } from "src/apps/main/redux/reducers/footer-component";
import Grid from "@material-ui/core/Grid";
import { LinkV2 } from "src/components/link-v2";
import { StateInterface } from "src/apps/main/redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.background.paper}`,
    padding: "30px",
    marginTop: "auto",
  },
  linkText: {
    paddingBottom: "8px",
    color: theme.palette.text.secondary,
  },
  categoryTitle: {
    paddingBottom: "12px",
  },
  contactDetails: {
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(6),
    },
  },
}));

export const Footer: FC = () => {
  const classes = useStyles();

  const { sections } = useSelector<StateInterface, FooterComponentState>(
    (state: StateInterface) => state.footerComponent,
  );

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          alignContent="stretch"
        >
          <Grid container item xs={12} md={9} spacing={6}>
            {sections
              ? sections.map((category, i) => (
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
                        <LinkV2 key={i} href={link.href}>
                          <Typography
                            variant="subtitle2"
                            className={classes.linkText}
                          >
                            {link.text}
                          </Typography>
                        </LinkV2>
                      );
                    })}
                  </Grid>
                ))
              : null}
          </Grid>
          <Grid item xs={12} md={3} className={classes.contactDetails}>
            <Typography variant="h6" className={classes.categoryTitle}>
              Contact Information
            </Typography>
            <a href="tel:+21367-626-1157">
              <Typography className={classes.linkText}>
                +213 06-76-26-11-57
              </Typography>
            </a>
            <a href="mailto:contact@dzcode.io">
              <Typography className={classes.linkText}>
                contact@dzcode.io
              </Typography>
            </a>
            <Typography className={classes.linkText}>
              Copyright © {new Date().getFullYear() + " "}
              <LinkV2 href="https://twitter.com/dzcode_io">@dzCode_io</LinkV2>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
