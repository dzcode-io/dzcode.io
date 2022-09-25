import { useTheme } from "@mui/material/styles";
import { FC } from "react";

export interface ImageProps {
  src: string;
  width?: number | string;
  height?: number | string;
  margin?: number;
}

export const Image: FC<ImageProps> = ({ src, width = "auto", height = "auto", margin }) => {
  const theme = useTheme();
  const themedMargin = typeof margin === "number" ? theme.spacing(margin) : undefined;

  return <img src={src} width={width} height={height} style={{ margin: themedMargin }} />;
};
