import { CSSProperties, FC } from "react";
import { useTheme } from "src/_hooks/use-theme";
import { BaseUIProps } from "src/_types";

export interface ImageProps
  extends BaseUIProps,
    Pick<CSSProperties, "width" | "height" | "maxWidth" | "maxHeight"> {
  src: string;
}

export const Image: FC<ImageProps> = ({
  src,
  margin,
  width = "auto",
  height = "auto",
  ...cssProps
}) => {
  const { toCSSMargin } = useTheme();

  return (
    <img src={src} {...{ width, height }} style={{ margin: toCSSMargin(margin), ...cssProps }} />
  );
};
