import { default as BottomSheetWrapper } from "@gorhom/bottom-sheet";
import React, { FC } from "react";
import { useTheme } from "src/hooks";

import { bottomSheetStyles } from "./styles";

export const BottomSheet: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <BottomSheetWrapper
      index={0}
      snapPoints={["10%", "75%"]}
      style={bottomSheetStyles.container}
      backgroundStyle={{ backgroundColor: colors.background }}
      handleIndicatorStyle={{ backgroundColor: colors.placeholder }}
    >
      {children}
    </BottomSheetWrapper>
  );
};
