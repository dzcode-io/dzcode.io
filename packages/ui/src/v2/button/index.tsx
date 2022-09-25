import MUIButton, { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { FC, MouseEvent } from "react";
import { Link } from "src/link-factory";

export interface ButtonProps {
  variant: "v1" | "v2" | "v3";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  href?: string;
  margin?: number;
}

const variantToMUIButtonVariant: Record<
  Exclude<ButtonProps["variant"], "v1">,
  MUIButtonProps["variant"]
> = {
  v2: "text",
  v3: "contained",
};

export const Button: FC<ButtonProps> = ({ children, variant, margin, ...props }) => {
  const theme = useTheme();
  const themedMargin = typeof margin === "number" ? theme.spacing(margin) : undefined;

  switch (variant) {
    case "v1":
      return (
        <Link {...props} variant="v2" margin={margin}>
          {children}
        </Link>
      );

    default:
      return (
        <MUIButton
          sx={{ margin: themedMargin }}
          {...props}
          variant={variantToMUIButtonVariant[variant]}
        >
          {children}
        </MUIButton>
      );
  }
};
