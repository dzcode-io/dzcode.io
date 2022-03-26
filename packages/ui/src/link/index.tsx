import { FC, HTMLProps } from "react";
import { Link as ReactRouterLink, LinkProps } from "react-router-dom";

export const Link: FC<HTMLProps<HTMLAnchorElement>> = (props) => {
  if (props.href && (props.href.startsWith("/") || props.href.startsWith(location.origin))) {
    return <ReactRouterLink {...(props as LinkProps)} to={props.href} />;
  } else {
    return <a {...props} />;
  }
};
