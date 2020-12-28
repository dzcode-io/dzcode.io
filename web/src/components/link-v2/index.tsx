import { FC, HTMLProps } from "react";
import { Link, LinkProps } from "react-router-dom";

export const LinkV2: FC<HTMLProps<HTMLAnchorElement>> = (props) => {
  if (
    props.href &&
    (props.href.startsWith("/") || props.href.startsWith(location.origin))
  ) {
    return <Link {...(props as LinkProps)} to={props.href} />;
  } else {
    return <a {...props} />;
  }
};
