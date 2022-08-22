import CircleIcon from "@mui/icons-material/Circle";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Skeleton from "@mui/material/Skeleton";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepIcon from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { FC } from "react";

import { CircularProgress } from "../circular-progress";

type MilestoneItem = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  progress?: number;
  state: "open" | "closed" | "in-progress";
};

interface MilestonesProps {
  milestones?: MilestoneItem[];
  onClick?: (index: number, item: MilestoneItem) => void;
}

// @TODO-ZM: update colors
const milestoneColors: Record<MilestoneItem["state"], string> = {
  open: "silver",
  closed: "green",
  "in-progress": "primary.main",
};

export const Milestones: FC<MilestonesProps> = ({ milestones, onClick = () => null }) => {
  const large = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  return milestones ? (
    large ? (
      <Timeline dir="ltr" position="alternate" sx={{ marginTop: 3, marginBottom: 3 }}>
        {milestones.map(({ id, title, description, date, state, progress }, milestoneIndex) => (
          <TimelineItem key={id}>
            {date ? (
              <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2">
                {/* @TODO-ZM: localize this  */}
                {new Date(date).toLocaleDateString()}
              </TimelineOppositeContent>
            ) : null}
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: milestoneColors[state] }} />
              {state === "in-progress" ? (
                <CircularProgress style={{ margin: 8 }} value={progress || 0} />
              ) : (
                <TimelineDot sx={{ bgcolor: milestoneColors[state] }} />
              )}
              <TimelineConnector sx={{ bgcolor: milestoneColors[state] }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography
                variant="h6"
                component="span"
                onClick={() => onClick(milestoneIndex, milestones[milestoneIndex])}
                sx={{ cursor: "pointer" }}
              >
                {title}
              </Typography>
              {description && <Typography>{description}</Typography>}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    ) : (
      <Stepper dir="ltr" orientation="vertical" connector={null} sx={{ margin: 3 }}>
        {milestones.map(({ id, title, description, date, state, progress }, milestoneIndex) => (
          <Step key={id} active={true} color="primary">
            <StepLabel
              StepIconComponent={() =>
                state === "in-progress" ? (
                  <CircularProgress style={{ marginLeft: -8 }} value={progress || 0} />
                ) : (
                  <StepIcon icon={<CircleIcon sx={{ color: milestoneColors[state] }} />} />
                )
              }
            >
              <Typography
                variant="h6"
                component="span"
                onClick={() => onClick(milestoneIndex, milestones[milestoneIndex])}
                sx={{ cursor: "pointer", color: theme.palette.text.primary }}
              >
                {title}
              </Typography>
            </StepLabel>
            <StepContent sx={{ borderLeftColor: milestoneColors[state], paddingBottom: 2 }}>
              {date && (
                <Typography variant="body2">{new Date(date).toLocaleDateString()}</Typography>
              )}
              <Typography>{description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    )
  ) : (
    <Timeline dir="ltr" position="alternate" sx={{ marginTop: 3, marginBottom: 3 }}>
      {[1, 2, 3].map((id) => (
        <TimelineItem key={id}>
          <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2">
            <Skeleton width={40} sx={{ display: "inline-block" }} />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: milestoneColors.open }} />
            <TimelineDot sx={{ bgcolor: milestoneColors.open }} />
            <TimelineConnector sx={{ bgcolor: milestoneColors.open }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span" sx={{ cursor: "pointer" }}>
              <Skeleton width={80} sx={{ display: "inline-block" }} />
            </Typography>
            <Typography>
              <Skeleton width={100} sx={{ display: "inline-block" }} />
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
