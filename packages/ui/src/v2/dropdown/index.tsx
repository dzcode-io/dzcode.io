import GlobalStyles from "@mui/material/GlobalStyles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, ReactNode, useState } from "react";
import { Button } from "src/v2/button";
import { Stack } from "src/v2/stack";

export interface DropdownProps<C = string> {
  items: Array<{
    code: C;
    text: ReactNode;
  }>;
  text: string;
  onSelect?: (code: C) => void;
}

export const Dropdown = <C extends string>({
  items,
  text,
  onSelect,
}: DropdownProps<C>): ReturnType<FC<DropdownProps<C>>> => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (code: C) => {
    setAnchorEl(null);
    onSelect?.(code);
  };
  return (
    <>
      <Button variant="v2" onClick={(event) => setAnchorEl(event.currentTarget)}>
        {text}
      </Button>
      <GlobalStyles styles="ul { padding: 0 !important; }" />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Stack direction="vertical">
          {items.map((item, index) => (
            <MenuItem key={`item-${index}`} onClick={() => handleClose(item.code)}>
              {item.text}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};
