import MUIDivider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";

export interface DividerProps {
  orientation: "vertical" | "horizontal";
  margin?: number;
}

export const Divider: FC<DividerProps> = ({ orientation, margin }) => {
  const theme = useTheme();
  const themedMargin = typeof margin === "number" ? theme.spacing(margin) : undefined;

  return <MUIDivider sx={{ margin: themedMargin }} orientation={orientation} flexItem />;
};
