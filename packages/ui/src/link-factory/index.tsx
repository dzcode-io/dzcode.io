import { FC, HTMLProps } from "react";
import { Link as ReactRouterLink, LinkProps } from "react-router-dom";

export const linkFactory =
  (getLanguageCode: () => string, defaultLanguageCode: string): FC<HTMLProps<HTMLAnchorElement>> =>
  // eslint-disable-next-line react/display-name
  (props) => {
    const languageCode = getLanguageCode();

    if (props.href && (props.href.startsWith("/") || props.href.startsWith(location.origin))) {
      return (
        <ReactRouterLink
          {...(props as LinkProps)}
          to={defaultLanguageCode === languageCode ? props.href : `/${languageCode}${props.href}`}
        />
      );
    } else {
      return <a {...props} />;
    }
  };

export const Link = linkFactory(() => "en", "en");
