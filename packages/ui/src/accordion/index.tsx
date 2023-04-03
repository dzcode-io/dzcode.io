import ExpandMore from "@mui/icons-material/ExpandMore";
import MUIAccordion from "@mui/material/Accordion";
import MUIAccordionDetails from "@mui/material/AccordionDetails";
import MUIAccordionSummary from "@mui/material/AccordionSummary";
import { FC, ReactNode } from "react";
import { Stack } from "src/stack";
import { Text } from "src/text";

interface AccordionProps {
  items: Array<{
    title: ReactNode;
    body: ReactNode;
  }>;
  margin?: number | number[];
}

export const Accordion: FC<AccordionProps> = ({ items, ...props }) => {
  return (
    <Stack direction="vertical" grow={1} {...props}>
      {items.map(({ title, body }, index) => (
        <MUIAccordion key={`accordion-item-${index}`} variant="outlined" style={{ marginTop: -1 }}>
          <MUIAccordionSummary expandIcon={<ExpandMore />}>
            <Text variant="v2">{title}</Text>
          </MUIAccordionSummary>
          <MUIAccordionDetails>{body}</MUIAccordionDetails>
        </MUIAccordion>
      ))}
    </Stack>
  );
};
