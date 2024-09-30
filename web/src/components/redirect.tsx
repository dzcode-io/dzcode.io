import React from "react";
import type { PropsWithChildren } from "react";
import type { NavigateProps } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getInitialLanguageCode } from "src/utils/website-language";

import { Languages } from "./locale/languages";

interface RedirectProps extends Omit<NavigateProps, "to"> {
  href?: string;
}

const initialLanguageCode = getInitialLanguageCode();

export function Redirect({ href = "/", ...props }: PropsWithChildren<RedirectProps>): JSX.Element {
  if (href.startsWith("/") && initialLanguageCode !== Languages[0].code) {
    href = `/${initialLanguageCode}${href}`;
  }
  return <Navigate {...props} to={href} />;
}
