import { Milestones } from "@dzcode.io/ui/dist/milestones";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { FC, useEffect } from "react";
import { T, t } from "src/components/t";
import { fetchDzCodeMilestones } from "src/redux/actions/landing-page";
import { useSliceSelector } from "src/redux/selectors";

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

export const MilestonesSection: FC = () => {
  const classes = useStyles();
  const { milestones } = useSliceSelector("landingPage");

  useEffect(() => {
    fetchDzCodeMilestones();
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
          onClick={() => fetchDzCodeMilestones()}
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
