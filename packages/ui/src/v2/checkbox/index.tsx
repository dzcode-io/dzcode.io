import MUICheckbox, { CheckboxProps as MUICheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";
import { VFC } from "react";

export interface CheckboxProps extends Pick<Required<MUICheckboxProps>, "checked" | "onChange"> {
  label: string;
  // @TODO-ZM: dry Margin interface and code
  margin?: number | number[];
}

export const Checkbox: VFC<CheckboxProps> = ({ margin, checked, onChange, ...props }) => {
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
    <FormControlLabel
      control={<MUICheckbox checked={checked} onChange={onChange} />}
      sx={{ margin: themedMargin ? `${themedMargin} !important` : undefined }}
      {...props}
    />
  );
};
