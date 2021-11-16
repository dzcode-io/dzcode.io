import { ContributorCard } from "src/apps/main/components/contributor-card";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import { TeamPageState } from "src/apps/main/redux/reducers/team-page";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
  },
  header: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    textAlign: "center",
  },
}));

interface CatalogProps {
  teamList: TeamPageState["teamList"];
}

export const Catalog: FC<CatalogProps> = ({ teamList }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        <FormattedMessage id="faq.teampage.header" defaultMessage="Say Hi to the team 💻" />
      </Typography>
      <Grid container className={classes.root} spacing={4} justifyContent="space-around">
        {teamList
          ? teamList.map((contributor) => (
              <Grid key={`contributor-${contributor.id}`} item>
                <ContributorCard contributor={contributor} />
              </Grid>
            ))
          : [1, 2, 3, 4].map((id) => (
              <Grid key={`contributor-${id}`} item>
                <ContributorCard />
              </Grid>
            ))}
      </Grid>
    </>
  );
};
