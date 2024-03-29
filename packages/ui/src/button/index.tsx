import MUIButton, { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import { FC, MouseEvent } from "react";
import { useTheme } from "src/_hooks/use-theme";
import { BaseUIProps, ChildrenProp } from "src/_types";
import { Link } from "src/link";

export interface ButtonProps extends BaseUIProps, ChildrenProp {
  variant: "v1" | "v2" | "v3" | "v4";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  href?: string;
}

const variantToMUIButtonVariant: Record<
  Exclude<ButtonProps["variant"], "v1">,
  MUIButtonProps["variant"]
> = {
  v2: "text",
  v3: "contained",
  v4: "outlined",
};

export const Button: FC<ButtonProps> = ({ children, variant, margin, ...props }) => {
  const { toCSSMargin } = useTheme();

  switch (variant) {
    case "v4":
      return (
        <MUIButton
          sx={{ margin: toCSSMargin(margin), textTransform: "capitalize" }}
          {...props}
          variant="outlined"
          LinkComponent={Link}
        >
          {children}
        </MUIButton>
      );

    case "v1":
      return (
        <Link {...props} variant="v2" margin={margin}>
          {children}
        </Link>
      );

    default:
      return (
        <MUIButton
          sx={{ margin: toCSSMargin(margin), textTransform: "capitalize" }}
          {...props}
          variant={variantToMUIButtonVariant[variant]}
          LinkComponent={Link}
        >
          {children}
        </MUIButton>
      );
  }
};
