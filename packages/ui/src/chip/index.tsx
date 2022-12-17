import MUIChip, { ChipProps as MUIChipProps } from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { VFC } from "react";

export interface ChipProps {
  label: string;
  variant: "v1";
  onClick?: () => void;
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
}

const variantToMUIChipSize: Record<ChipProps["variant"], MUIChipProps["size"]> = {
  v1: "small",
};

export const Chip: VFC<ChipProps> = ({ margin, variant, ...props }) => {
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

  return (
    <MUIChip
      sx={{ margin: themedMargin ? `${themedMargin} !important` : undefined }}
      size={variantToMUIChipSize[variant]}
      {...props}
    />
  );
};
