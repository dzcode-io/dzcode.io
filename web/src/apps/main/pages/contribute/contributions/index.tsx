import { Dispatch, StateInterface } from "src/apps/main/redux";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import { ContributePageState } from "src/apps/main/redux/reducers/contribute-page";
import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { LinkV2 } from "src/components/link-v2";
import MuiCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
  },
  card: {
    minWidth: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1",
  },
  chip: {
    flex: "1",
    background: "#ddd9",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export const Contributions: FC = () => {
  const classes = useStyles();
  const { contributions, filters } = useSelector<
    StateInterface,
    ContributePageState
  >((state) => state.contributePage);
  const dispatch = useDispatch<Dispatch<ContributePageState>>();

  return (
    <>
      <Grid
        container
        className={classes.root}
        justify="space-evenly"
        spacing={1}
      >
        {contributions
          ? contributions.map(
              ({ id, projectId, title, languages, labels, url: link }) => (
                <Grid
                  key={`contribution-${projectId}-`}
                  item
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <MuiCard className={classes.card} variant="outlined">
                    <CardContent className={classes.content}>
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <div className={classes.content} />
                      {[
                        { filterName: "languages", options: languages },
                        { filterName: "labels", options: labels },
                      ].map(({ filterName, options }) =>
                        options.map((optionName) => (
                          <Chip
                            className={classes.chip}
                            key={`${filterName}-${optionName}`}
                            label={optionName}
                            size="small"
                            variant="default"
                            onClick={() => {
                              const newFilters = filters.map((filter) => {
                                if (filter.name !== filterName) {
                                  return filter;
                                } else {
                                  return {
                                    ...filter,
                                    options: filter.options.map((option) => {
                                      if (option.name !== optionName) {
                                        return option;
                                      } else {
                                        return { ...option, checked: true };
                                      }
                                    }),
                                  };
                                }
                              });
                              dispatch({
                                type: "UPDATE_CONTRIBUTE_PAGE",
                                payload: {
                                  filters: newFilters,
                                },
                              });
                            }}
                          />
                        )),
                      )}
                    </CardContent>
                    <CardActions>
                      <LinkV2 href={link}>
                        <Button size="small" color="primary">
                          Contribute
                        </Button>
                      </LinkV2>
                      <LinkV2 href={`/Contribute/${projectId}/${id}`}>
                        <Button size="small" color="primary">
                          More Details
                        </Button>
                      </LinkV2>
                    </CardActions>
                  </MuiCard>
                </Grid>
              ),
            )
          : "Fetching"}
      </Grid>
    </>
  );
};
