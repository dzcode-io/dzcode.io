import ExpandMore from "@mui/icons-material/ExpandMore";
import MUIAccordion from "@mui/material/Accordion";
import MUIAccordionDetails from "@mui/material/AccordionDetails";
import MUIAccordionSummary from "@mui/material/AccordionSummary";
import { ReactNode, VFC } from "react";
import { Stack } from "src/stack";
import { Text } from "src/text";

interface AccordionProps {
  items: Array<{
    title: ReactNode;
    // @TODO-ZM: renamed this to body
    description: ReactNode;
  }>;
  margin?: number | number[];
}

export const Accordion: VFC<AccordionProps> = ({ items, ...props }) => {
  return (
    <Stack direction="vertical" grow={1} {...props}>
      {items.map(({ title, description }, index) => (
        <MUIAccordion key={`accordion-item-${index}`} variant="outlined" style={{ marginTop: -1 }}>
          <MUIAccordionSummary expandIcon={<ExpandMore />}>
            <Text variant="v2">{title}</Text>
          </MUIAccordionSummary>
          <MUIAccordionDetails>{description}</MUIAccordionDetails>
        </MUIAccordion>
      ))}
    </Stack>
  );
};
