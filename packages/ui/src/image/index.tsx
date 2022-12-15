import { useTheme } from "@mui/material/styles";
import { CSSProperties, FC } from "react";

export interface ImageProps
  extends Pick<CSSProperties, "width" | "height" | "maxWidth" | "maxHeight"> {
  src: string;
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
}

export const Image: FC<ImageProps> = ({
  src,
  margin,
  width = "auto",
  height = "auto",
  ...cssProps
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

  return <img src={src} {...{ width, height }} style={{ margin: themedMargin, ...cssProps }} />;
};
