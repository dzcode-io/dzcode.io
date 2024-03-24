import MUIDivider, { DividerProps as MUIDividerProps } from "@mui/material/Divider";
import { CSSProperties, FC } from "react";
import { Color, useColors } from "src/_hooks/use-colors";
import { useTheme } from "src/_hooks/use-theme";
import { BaseUIProps } from "src/_types";

export interface DividerProps extends BaseUIProps, Pick<MUIDividerProps, "flexItem"> {
  orientation: "vertical" | "horizontal";
  width?: CSSProperties["width"];
  thickness?: number;
  color?: Color;
}

export const Divider: FC<DividerProps> = ({
  orientation,
  margin,
  width,
  flexItem = true,
  thickness = 1,
  color = "DIVIDER",
}) => {
  const { from } = useColors();
  const { toCSSMargin } = useTheme();

  return (
    <MUIDivider
      sx={{
        margin: toCSSMargin(margin),
        width,
        [orientation === "horizontal" ? "borderBottomWidth" : "borderRightWidth"]: thickness,
        borderColor: from(color),
      }}
      orientation={orientation}
      flexItem={flexItem}
    />
  );
};
