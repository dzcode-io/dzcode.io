import { useTheme } from "@mui/material/styles";
import { FC } from "react";

export interface ImageProps {
  src: string;
  width?: number | string;
  height?: number | string;
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
}

export const Image: FC<ImageProps> = ({ src, width = "auto", height = "auto", margin }) => {
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

  return <img src={src} width={width} height={height} style={{ margin: themedMargin }} />;
};
