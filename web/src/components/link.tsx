import { DefaultLanguage } from "@dzcode.io/models/dist/language";
import React from "react";
import type { PropsWithChildren } from "react";
import type { LinkProps as RRLinkProps } from "react-router-dom";
import { Link as RRLink } from "react-router-dom";
import { getInitialLanguageCode } from "src/utils/website-language";

interface LinkProps extends Omit<RRLinkProps, "to"> {
  href?: string;
}

const initialLanguageCode = getInitialLanguageCode();

export function Link({ href = "/", ...props }: PropsWithChildren<LinkProps>): JSX.Element {
  if (href.startsWith("/") && initialLanguageCode !== DefaultLanguage.code) {
    href = `/${initialLanguageCode}${href}`;
  }
  return <RRLink {...props} to={href} />;
}
