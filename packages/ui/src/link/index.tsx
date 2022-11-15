import MUILink, { LinkProps as MUILinkProps } from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { AnchorHTMLAttributes, createContext, CSSProperties, FC, useContext } from "react";
import { Link as ReactRouterLink, Router, RouterProps as RRDRouterProps } from "react-router-dom";

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
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
  // @TODO-ZM: to remove these
  className?: string;
  style?: any;
  color?: any;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "href"> &
  Pick<MUILinkProps, "underline">;

const variantToLinkStyle: Record<Required<LinkProps>["variant"], CSSProperties> = {
  v1: {},
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

  const theme = useTheme();

  // @TODO-ZM: dry Margin code
  let themedMargin: string | undefined;
  switch (typeof margin) {
    case "number":
      themedMargin = theme.spacing(margin);
      break;
    case "object":
      themedMargin = margin.map((value) => theme.spacing(value)).join(" ");
      break;
  }

  const style: CSSProperties = {
    cursor: "pointer",
    margin: themedMargin ? `${themedMargin}` : undefined,
    flexShrink: 0,
    ...variantToLinkStyle[variant],
  };

  if (href?.startsWith("/") || href?.startsWith(location.origin)) {
    return (
      <ReactRouterLink
        component={(reactRouterLinkProps) => (
          <MUILink {...reactRouterLinkProps} underline={underline} />
        )}
        style={style}
        {...props}
        to={prefix ? `/${prefix}${href}` : href}
      />
    );
  } else {
    return <MUILink style={style} href={href} {...props} underline={underline} />;
  }
};
