import { useTheme } from "@mui/material/styles";
import MUITypography, { TypographyProps } from "@mui/material/Typography";
import type { CSSProperties, FC } from "react";

export interface TextProps extends Pick<CSSProperties, "wordWrap" | "flexShrink"> {
  variant: "v1" | "v2" | "v3" | "v4";
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
}

const variantToMUITypographyVariant: Record<TextProps["variant"], TypographyProps["variant"]> = {
  v1: "caption",
  v2: "body1",
  v3: "h4",
  v4: "h5",
};

export const Text: FC<TextProps> = ({ children, variant, margin, ...cssProps }) => {
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
    <MUITypography
      sx={{
        margin: themedMargin ? `${themedMargin} !important` : undefined,
        ...cssProps,
      }}
      variant={variantToMUITypographyVariant[variant]}
    >
      {children}
    </MUITypography>
  );
};
