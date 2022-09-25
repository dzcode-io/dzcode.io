import GlobalStyles from "@mui/material/GlobalStyles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, ReactNode, useState } from "react";
import { Button } from "src/v2/button";
import { Stack } from "src/v2/stack";

export interface DropdownProps {
  items: Array<{
    code: string;
    text: ReactNode;
  }>;
  text: string;
  onSelect?: (code: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({ items, text, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (code: string) => {
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
