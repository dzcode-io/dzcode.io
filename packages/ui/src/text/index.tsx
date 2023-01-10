import MUITypography, { TypographyProps } from "@mui/material/Typography";
import type { CSSProperties, FC } from "react";
import { useTheme } from "src/_hooks/use-theme";
import { BaseUIProps } from "src/_types";

export interface TextProps extends BaseUIProps, Pick<CSSProperties, "wordWrap" | "flexShrink"> {
  variant: "v1" | "v2" | "v3" | "v4";
}

const variantToMUITypographyVariant: Record<TextProps["variant"], TypographyProps["variant"]> = {
  v1: "caption",
  v2: "body1",
  v3: "h4",
  v4: "h5",
};

export const Text: FC<TextProps> = ({ children, variant, margin, ...cssProps }) => {
  const { toCSSMargin } = useTheme();

  return (
    <MUITypography
      sx={{
        margin: toCSSMargin(margin),
        ...cssProps,
      }}
      variant={variantToMUITypographyVariant[variant]}
    >
      {children}
    </MUITypography>
  );
};
