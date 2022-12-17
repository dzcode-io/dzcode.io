import { Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { FC } from "react";

interface MediaQueryProps {
  upTo?: Breakpoint;
  downTo?: Breakpoint;
}

export const MediaQuery: FC<MediaQueryProps> = ({ children, upTo, downTo }) => {
  const theme = useTheme();
  const minMatches =
    typeof upTo !== "undefined" ? useMediaQuery(theme.breakpoints.down(upTo)) : true;
  const maxMatches =
    typeof downTo !== "undefined" ? useMediaQuery(theme.breakpoints.up(downTo)) : true;
  if (minMatches && maxMatches) {
    return <>{children}</>;
  } else {
    return null;
  }
};
