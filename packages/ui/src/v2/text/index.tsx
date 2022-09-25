import { useTheme } from "@mui/material/styles";
import MUITypography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";

export interface TextProps {
  variant: "v1" | "v2";
  margin?: number;
}

const variantToMUITypographyVariant: Record<TextProps["variant"], TypographyProps["variant"]> = {
  v1: "caption",
  v2: "body1",
};

export const Text: FC<TextProps> = ({ children, variant, margin }) => {
  const theme = useTheme();
  const themedMargin = typeof margin === "number" ? theme.spacing(margin) : undefined;

  return (
    <MUITypography
      sx={{ margin: `${themedMargin} !important` }}
      variant={variantToMUITypographyVariant[variant]}
    >
      {children}
    </MUITypography>
  );
};
