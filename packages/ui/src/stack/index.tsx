import MUIStack, { StackProps as MUIStackProps } from "@mui/material/Stack";
import type { CSSProperties, FC } from "react";
import { useTheme } from "src/_hooks/use-theme";
import { BaseUIProps } from "src/_types";

export interface StackProps
  extends BaseUIProps,
    Pick<
      MUIStackProps,
      "alignItems" | "justifyContent" | "overflow" | "height" | "width" | "flexWrap" | "gap"
    > {
  direction: "vertical" | "horizontal";
  grow?: number;
  // @TODO-ZM: dry min max
  max?: Pick<CSSProperties, "width" | "height">;
  min?: Pick<CSSProperties, "width" | "height">;
}

export const Stack: FC<StackProps> = ({
  children,
  direction,
  margin,
  padding,
  max,
  min,
  grow,
  ...props
}) => {
  const { toCSSMargin } = useTheme();

  return (
    <MUIStack
      {...props}
      sx={{
        flexGrow: grow,
        margin: toCSSMargin(margin),
        padding: toCSSMargin(padding),
        ...(max
          ? { maxWidth: max.width, maxHeight: max.height }
          : { maxWidth: "100%", maxHeight: "100%" }),
        ...(min ? { minWidth: min.width, minHeight: min.height } : {}),
      }}
      direction={direction === "vertical" ? "column" : "row"}
    >
      {children}
    </MUIStack>
  );
};
