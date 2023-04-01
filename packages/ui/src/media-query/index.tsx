import { Breakpoint, useTheme } from "@mui/material/styles";
import type { FC } from "react";
import { ChildrenProp } from "src/_types";
import { useMediaQuery } from "usehooks-ts";

interface MediaQueryProps extends ChildrenProp {
  upTo?: Breakpoint;
  downTo?: Breakpoint;
}

export const MediaQuery: FC<MediaQueryProps> = ({ children, upTo, downTo }) => {
  const theme = useTheme();
  console.log("zako", { string: theme.breakpoints.down(500), upTo, downTo });
  const minMatches =
    typeof upTo !== "undefined"
      ? useMediaQuery(theme.breakpoints.down(upTo).replace("@media ", ""))
      : true;
  const maxMatches =
    typeof downTo !== "undefined"
      ? useMediaQuery(theme.breakpoints.up(downTo).replace("@media ", ""))
      : true;
  if (minMatches && maxMatches) {
    return <>{children}</>;
  } else {
    return null;
  }
};
