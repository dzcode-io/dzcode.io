import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function Image(props: ImageProps): JSX.Element {
  return <img {...props} />;
}
