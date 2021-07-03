import { Dispatch, StateInterface } from "src/apps/main/redux";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import { ContributePageState } from "src/apps/main/redux/reducers/contribute-page";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { LinkV2 } from "src/components/link-v2";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import MuiCard from "@material-ui/core/Card";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { elapsedTime } from "src/common/utils/elapsed-time";
import { makeStyles } from "@material-ui/core/styles";
import { updateFilterValue } from "src/apps/main/redux/actions/contribute-page";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {},
  project: { flex: "1" },
  content: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  chip: {
    flex: "1",
    background: "#ddd9",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  contribute: {
    marginRight: "auto",
  },
}));

export const Contributions: FC = () => {
  const classes = useStyles();
  const { contributions } = useSelector<StateInterface, ContributePageState>(
    (state) => state.contributePage,
  );
  const dispatch = useDispatch<Dispatch<ContributePageState>>();

  return (
    <>
      <Grid container className={classes.root} justify="space-evenly" spacing={1}>
        {contributions
          ? contributions.map(
              (
                { project, title, languages, labels, url: link, type, commentsCount, updatedAt },
                index,
              ) => (
                <Grid key={`contribution-${index}-`} item xs={12} md={6} lg={4}>
                  <MuiCard className={classes.card} variant="outlined">
                    <CardContent className={classes.content}>
                      <Typography className={classes.title} variant="h6">
                        {title}
                      </Typography>
                      <Typography className={classes.project} color="textSecondary">
                        {project.name}
                      </Typography>
                      <div>
                        {[
                          { filterName: "labels", options: labels },
                          { filterName: "languages", options: languages },
                        ].map(({ filterName, options }) =>
                          options.map((optionName) => (
                            <Chip
                              className={classes.chip}
                              key={`${filterName}-${optionName}`}
                              label={optionName}
                              size="small"
                              variant="default"
                              onClick={() => {
                                dispatch(
                                  updateFilterValue(filterName, optionName, true, true, true),
                                );
                              }}
                            />
                          )),
                        )}
                      </div>
                    </CardContent>
                    <CardActions
                      style={{
                        color: type === "issue" ? "#56d364" : "#a371f7",
                      }}
                    >
                      <LinkV2 href={link} className={classes.contribute}>
                        <Button
                          size="small"
                          style={{
                            color: type === "issue" ? "#56d364" : "#a371f7",
                          }}
                        >
                          {type === "issue" ? "Read Issue" : "Review Changes"}
                        </Button>
                      </LinkV2>
                      <Typography variant="caption">{elapsedTime(updatedAt)}</Typography>
                      {commentsCount > 0 && (
                        <Badge badgeContent={commentsCount}>
                          <QuestionAnswerIcon />
                        </Badge>
                      )}
                      {type === "issue" ? (
                        <ErrorOutlineIcon style={{ color: "#56d364" }} />
                      ) : (
                        <MergeTypeIcon style={{ color: "#a371f7" }} />
                      )}
                    </CardActions>
                  </MuiCard>
                </Grid>
              ),
            )
          : [1, 2, 3].map((id) => (
              <Grid key={`loading-${id}`} item xs={12} md={6} lg={4}>
                <MuiCard className={classes.card} variant="outlined">
                  <CardContent className={classes.content}>
                    <Skeleton animation="wave" variant="text" />
                    <Skeleton animation="wave" variant="text" style={{ width: "30%" }} />
                    <Skeleton animation="wave" variant="text" />
                  </CardContent>
                  <CardActions>
                    <Skeleton animation="wave" variant="text" style={{ width: "30%" }} />
                  </CardActions>
                </MuiCard>
              </Grid>
            ))}
      </Grid>
    </>
  );
};
