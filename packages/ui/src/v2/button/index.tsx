import MUIButton, { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { FC, MouseEvent } from "react";
import { Link } from "src/link";

export interface ButtonProps {
  variant: "v1" | "v2" | "v3";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  href?: string;
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
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

  switch (variant) {
    case "v1":
      return (
        <Link {...props} variant="v2" margin={margin}>
          {children}
        </Link>
      );

    default:
      return (
        // @TODO-ZM: overwrite default MUI link component
        <MUIButton
          sx={{ margin: themedMargin ? `${themedMargin} !important` : undefined }}
          {...props}
          variant={variantToMUIButtonVariant[variant]}
        >
          {children}
        </MUIButton>
      );
  }
};
