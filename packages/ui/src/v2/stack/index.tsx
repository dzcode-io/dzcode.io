import MUIStack, { StackProps as MUIStackProps } from "@mui/material/Stack";
import type { FC } from "react";

export interface StackProps extends Pick<MUIStackProps, "alignItems"> {
  direction: "vertical" | "horizontal";
}

export const Stack: FC<StackProps> = ({ children, direction, ...props }) => {
  return (
    <MUIStack {...props} direction={direction === "vertical" ? "column" : "row"}>
      {children}
    </MUIStack>
  );
};
