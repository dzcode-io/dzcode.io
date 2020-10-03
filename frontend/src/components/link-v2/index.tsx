import { Link } from "react-router-dom";
import { LinkProps } from "@material-ui/core";
import React from "react";

export const LinkV2 = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) => {
  if (
    props.href &&
    (props.href.startsWith("/") || props.href.startsWith(location.origin))
  ) {
    return <Link {...(props as LinkProps)} to={props.href} />;
  } else {
    return <a {...props} />;
  }
};
