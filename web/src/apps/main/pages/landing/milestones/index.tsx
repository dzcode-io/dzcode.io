import { Milestones } from "@dzcode.io/ui/dist/milestones";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    direction: "ltr",
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
      ) : (
        <Milestones
          milestones={milestones?.map(({ id, title, description, ...milestone }) => ({
            id,
            title,
            description,
            state: milestone.status,
            progress:
              milestone.closedIssuesCount /
              (milestone.openIssuesCount + milestone.closedIssuesCount),
            date: milestone.closedAt || milestone.dueAt,
          }))}
          onClick={(milestoneIndex) => {
            window.open(milestones?.[milestoneIndex].url, "_blank");
          }}
        />
      )}
    </section>
  );
};
