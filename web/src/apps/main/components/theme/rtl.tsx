import { StylesProvider, jssPreset } from "@material-ui/core/styles";

import { FC } from "react";
import { create } from "jss";
import rtl from "jss-rtl";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const RTLprovider: FC = ({ children }) => {
  return <StylesProvider jss={jss}>{children}</StylesProvider>;
};
