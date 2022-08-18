import { MilestoneEntity } from "@dzcode.io/models/dist/milestone";
import { CircularProgress } from "@dzcode.io/ui/dist/circular-progress";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkV2 } from "src/apps/main/components/link-v2";
import { T, t } from "src/apps/main/components/t";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { fetchDzCodeMilestones } from "src/apps/main/redux/actions/landing-page";
import { LandingPageState } from "src/apps/main/redux/reducers/landing-page";

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
}));

// @TODO-ZM: update colors
const milestoneColors: Record<MilestoneEntity["status"], string> = {
  open: "grey",
  closed: "green",
  "in-progress": "primary.main",
};

// @TODO-ZM: move this to @dzcode.io/ui and move deps with it (@mui/lab & @mui/material)
export const MilestonesSection: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<LandingPageState>>();
  const { milestones } = useSelector<StateInterface, LandingPageState>(
    (state) => state.landingPage,
  );

  useEffect(() => {
    dispatch(fetchDzCodeMilestones());
  }, []);

  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h4">
        <T landing-milestones-title />
      </Typography>
      <Typography className={classes.subTitle} variant="h6" color="textSecondary">
        <T landing-milestones-subtitle />
      </Typography>
      {milestones === "ERROR" ? (
        <TryAgain
          error={t("landing-milestones-error")}
          action={t("landing-milestones-try-again")}
          onClick={() => dispatch(fetchDzCodeMilestones())}
        />
      ) : milestones ? (
        <Timeline position="alternate" sx={{ margin: 3 }}>
          {milestones.map((milestone) => (
            <TimelineItem key={milestone.id}>
              {milestone.closedAt || milestone.dueAt ? (
                <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2">
                  {new Date(milestone.closedAt || milestone.dueAt || "").toLocaleDateString()}
                </TimelineOppositeContent>
              ) : null}
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: milestoneColors[milestone.status] }} />
                {milestone.status === "in-progress" ? (
                  <CircularProgress
                    style={{ margin: 8 }}
                    value={
                      milestone.closedIssuesCount /
                        (milestone.closedIssuesCount + milestone.openIssuesCount) || 0
                    }
                  />
                ) : (
                  <TimelineDot sx={{ bgcolor: milestoneColors[milestone.status] }} />
                )}
                <TimelineConnector sx={{ bgcolor: milestone.closedAt ? "success.main" : "grey" }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  <LinkV2 style={{ color: "inherit" }} href={milestone.url}>
                    {milestone.title}
                  </LinkV2>
                </Typography>
                {milestone.description && <Typography>{milestone.description}</Typography>}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      ) : null}
    </section>
  );
};
