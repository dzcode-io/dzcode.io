import MUIDivider, { DividerProps as MUIDividerProps } from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { CSSProperties, FC } from "react";

export interface DividerProps extends Pick<MUIDividerProps, "flexItem"> {
  orientation: "vertical" | "horizontal";
  margin?: number;
  width?: CSSProperties["width"];
}

export const Divider: FC<DividerProps> = ({ orientation, margin, width, flexItem = true }) => {
  const theme = useTheme();
  const themedMargin = typeof margin === "number" ? theme.spacing(margin) : undefined;

  return (
    <MUIDivider
      sx={{ margin: themedMargin, width }}
      orientation={orientation}
      flexItem={flexItem}
    />
  );
};
