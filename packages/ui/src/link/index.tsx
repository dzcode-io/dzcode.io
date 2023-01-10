import MUILink, { LinkProps as MUILinkProps } from "@mui/material/Link";
import { AnchorHTMLAttributes, createContext, CSSProperties, FC, useContext } from "react";
import { Link as ReactRouterLink, Router, RouterProps as RRDRouterProps } from "react-router-dom";
import { useTheme } from "src/_hooks/use-theme";
import { BaseUIProps } from "src/_types";

export type LinkContextValue = {
  prefix?: string;
};

const LinkContext = createContext<LinkContextValue>({ prefix: "" });

export const LinkProvider: FC<LinkContextValue & { history: RRDRouterProps["history"] }> = ({
  children,
  prefix,
  history,
}) => {
  return (
    <Router history={history}>
      <LinkContext.Provider value={{ prefix }}>{children}</LinkContext.Provider>
    </Router>
  );
};

export type LinkProps = {
  // @TODO-ZM: make this required
  variant?: "v1" | "v2";
  // @TODO-ZM: to remove these
  className?: string;
  style?: any;
  color?: any;
} & BaseUIProps &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "href"> &
  Pick<MUILinkProps, "underline">;

const variantToLinkStyle: Record<Required<LinkProps>["variant"], CSSProperties> = {
  v1: { wordBreak: "break-word" },
  v2: { display: "flex", flexShrink: 0 },
};

// @TODO-ZM: remove default variant
export const Link: FC<LinkProps> = ({
  variant = "v1",
  margin,
  href,
  underline = "hover",
  ...props
}) => {
  const { prefix } = useContext<LinkContextValue>(LinkContext);

  const { toCSSMargin } = useTheme();

  const style: CSSProperties = {
    cursor: "pointer",
    margin: toCSSMargin(margin),
    flexShrink: 0,
    ...variantToLinkStyle[variant],
  };

  if (href?.startsWith("/") || href?.startsWith(location.origin)) {
    return (
      <MUILink
        component={ReactRouterLink}
        style={style}
        underline={underline}
        {...props}
        to={prefix ? `/${prefix}${href}` : href}
      />
    );
  } else {
    return <MUILink style={style} href={href} {...props} underline={underline} />;
  }
};
