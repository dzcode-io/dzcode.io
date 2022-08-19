import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";
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
  open: "grey",
  closed: "green",
  "in-progress": "primary.main",
};

// @TODO-ZM: move this to @dzcode.io/ui and move deps with it (@mui/lab & @mui/material)
export const Milestones: FC<MilestonesProps> = ({ milestones, onClick = () => null }) => {
  return milestones ? (
    <Timeline position="alternate" sx={{ marginTop: 3, marginBottom: 3 }}>
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
    // @TODO-ZM: render a skeleton
    <div>Loading ...</div>
  );
};
