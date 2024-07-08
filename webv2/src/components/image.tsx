interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function Image(props: ImageProps): JSX.Element {
  return <img {...props} />;
}
