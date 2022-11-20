import MUIDivider, { DividerProps as MUIDividerProps } from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { CSSProperties, FC } from "react";
import { Color, useColors } from "src/_hooks/use-colors";

export interface DividerProps extends Pick<MUIDividerProps, "flexItem"> {
  orientation: "vertical" | "horizontal";
  margin?: number | number[];
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
  // @TODO-ZM: use our own hook
  const { from } = useColors();
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
    <MUIDivider
      sx={{
        margin: themedMargin,
        width,
        [orientation === "horizontal" ? "borderBottomWidth" : "borderRightWidth"]: thickness,
        borderColor: from(color),
      }}
      orientation={orientation}
      flexItem={flexItem}
    />
  );
};
