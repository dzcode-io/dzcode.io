import MUIDivider, { DividerProps as MUIDividerProps } from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { CSSProperties, FC } from "react";

export interface DividerProps extends Pick<MUIDividerProps, "flexItem"> {
  orientation: "vertical" | "horizontal";
  margin?: number | number[];
  width?: CSSProperties["width"];
  thickness?: number;
}

export const Divider: FC<DividerProps> = ({
  orientation,
  margin,
  width,
  flexItem = true,
  thickness = 1,
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
    <MUIDivider
      sx={{ margin: themedMargin, width, borderBottomWidth: thickness }}
      orientation={orientation}
      flexItem={flexItem}
    />
  );
};
