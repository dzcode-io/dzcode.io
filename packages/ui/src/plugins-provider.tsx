import { Direction } from "@mui/system";
import { FC } from "react";
import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";

interface Props {
  direction: Direction;
}
export const PluginsProvider: FC<Props> = ({ children, direction }) => {
  return (
    <StyleSheetManager stylisPlugins={direction ? [rtlPlugin] : []}>
      <div dir={direction}>{children}</div>
    </StyleSheetManager>
  );
};
