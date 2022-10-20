import MUIStack, { StackProps as MUIStackProps } from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import type { FC } from "react";

export interface StackProps
  extends Pick<
    MUIStackProps,
    "alignItems" | "justifyContent" | "overflow" | "height" | "width" | "flexWrap"
  > {
  direction: "vertical" | "horizontal";
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
}

export const Stack: FC<StackProps> = ({ children, direction, margin, ...props }) => {
  const theme = useTheme();
  // @TODO-ZM: dry Margin code
  let themedMargin: string | undefined;
  switch (typeof margin) {
    case "number":
      themedMargin = theme.spacing(margin);
      break;
    case "object":
      themedMargin = margin.map((value) => theme.spacing(value)).join(" ");
      break;
  }

  return (
    <MUIStack
      {...props}
      sx={{ margin: themedMargin ? `${themedMargin} !important` : undefined }}
      direction={direction === "vertical" ? "column" : "row"}
    >
      {children}
    </MUIStack>
  );
};
