import { useTheme } from "@mui/material/styles";
import { AnchorHTMLAttributes, CSSProperties, FC } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export type LinkProps = {
  // @TODO-ZM: make this required
  variant?: "v1" | "v2";
  margin?: number;
  // @TODO-ZM: to remove these
  className?: string;
  style?: any;
  color?: any;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "href">;

const variantToLinkStyle: Record<Required<LinkProps>["variant"], CSSProperties> = {
  v1: {},
  v2: { display: "flex", flexShrink: 0 },
};

export const linkFactory =
  (getLanguageCode: () => string, defaultLanguageCode: string): FC<LinkProps> =>
  // @TODO-ZM: remove default variant
  // eslint-disable-next-line react/display-name
  ({ variant = "v1", margin, href, ...props }) => {
    const languageCode = getLanguageCode();
    const theme = useTheme();
    const themedMargin = typeof margin === "number" ? theme.spacing(margin) : undefined;

    const style: CSSProperties = {
      cursor: "pointer",
      margin: themedMargin,
      ...variantToLinkStyle[variant],
    };

    if (href?.startsWith("/") || href?.startsWith(location.origin)) {
      return (
        <ReactRouterLink
          style={style}
          {...props}
          to={defaultLanguageCode === languageCode ? href : `/${languageCode}${href}`}
        />
      );
    } else {
      return <a style={style} href={href} {...props} />;
    }
  };

// @TODO-ZM: update this, to get the Language from React Context
export const Link = linkFactory(() => "en", "en");
