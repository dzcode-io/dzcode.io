import React from "react";
import { LinkProps, Link } from "react-router-dom";

interface LinkV2Props extends LinkProps {}

export const LinkV2 = (props: LinkV2Props) => {
  console.log(props.to, location.origin);
  if (
    (props.to as string).startsWith("/") ||
    (props.to as string).startsWith(location.origin)
  ) {
    return <Link {...props} />;
  } else {
    return <a {...props} href={props.to as string} />;
  }
};
