import type { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export function Image(props: ImageProps): JSX.Element {
  return <img {...props} />;
}
