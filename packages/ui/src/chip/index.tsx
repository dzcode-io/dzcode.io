import MUIChip, { ChipProps as MUIChipProps } from "@mui/material/Chip";
import { VFC } from "react";
import { useTheme } from "src/_hooks/use-theme";
import { BaseUIProps } from "src/_types";

export interface ChipProps extends BaseUIProps {
  label: string;
  variant: "v1";
  onClick?: () => void;
}

const variantToMUIChipSize: Record<ChipProps["variant"], MUIChipProps["size"]> = {
  v1: "small",
};

export const Chip: VFC<ChipProps> = ({ margin, variant, ...props }) => {
  const { toCSSMargin } = useTheme();

  return (
    <MUIChip sx={{ margin: toCSSMargin(margin) }} size={variantToMUIChipSize[variant]} {...props} />
  );
};
