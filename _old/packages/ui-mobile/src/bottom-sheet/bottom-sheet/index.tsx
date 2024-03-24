import { default as BottomSheetWrapper } from "@gorhom/bottom-sheet";
import { FC } from "react";
import { useTheme } from "src/_hooks/use-theme";

import { bottomSheetStyles } from "./styles";

interface BottomSheetProps {
  /**
   * the children of the bottom sheet
   */
  children: React.ReactNode;
}

/**
 * BottomSheet component used to display the bottom sheet in the app
 * @example
 * <BottomSheet>
 *  <Text>Bottom Sheet Content</Text>
 * </BottomSheet>
 */
export const BottomSheet: FC<BottomSheetProps> = ({ children }) => {
  const { colors } = useTheme();
  return (
    <BottomSheetWrapper
      index={0}
      snapPoints={["10%", "75%"]}
      style={bottomSheetStyles.container}
      backgroundStyle={{ backgroundColor: colors.background }}
      handleIndicatorStyle={{ backgroundColor: colors.surfaceDisabled }}
    >
      {children}
    </BottomSheetWrapper>
  );
};
