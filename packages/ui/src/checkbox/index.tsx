import MUICheckbox, { CheckboxProps as MUICheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { VFC } from "react";
import { useTheme } from "src/_hooks/use-theme";
import { BaseUIProps } from "src/_types";

export interface CheckboxProps
  extends BaseUIProps,
    Pick<Required<MUICheckboxProps>, "checked" | "onChange"> {
  label: string;
}

export const Checkbox: VFC<CheckboxProps> = ({ margin, checked, onChange, ...props }) => {
  const { toCSSMargin } = useTheme();

  return (
    <FormControlLabel
      control={<MUICheckbox checked={checked} onChange={onChange} />}
      sx={{ margin: toCSSMargin(margin) }}
      {...props}
    />
  );
};
