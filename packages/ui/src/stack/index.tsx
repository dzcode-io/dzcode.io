import MUIStack, { StackProps as MUIStackProps } from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties, FC } from "react";

export interface StackProps
  extends Pick<
    MUIStackProps,
    "alignItems" | "justifyContent" | "overflow" | "height" | "width" | "flexWrap" | "gap"
  > {
  direction: "vertical" | "horizontal";
  grow?: number;
  // @TODO-ZM: dry min max
  max?: Pick<CSSProperties, "width" | "height">;
  min?: Pick<CSSProperties, "width" | "height">;
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
}

export const Stack: FC<StackProps> = ({
  children,
  direction,
  margin,
  max,
  min,
  grow,
  ...props
}) => {
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
      sx={{
        flexGrow: grow,
        margin: themedMargin ? `${themedMargin} !important` : undefined,
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
