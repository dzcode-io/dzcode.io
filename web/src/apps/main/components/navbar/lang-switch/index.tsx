import { FC, useState } from "react";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const LanguageSwitch: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="btnAnchor"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        🇺🇸 EN
      </Button>
      <Menu
        id="simple-menu"
        // anchorEl={anchorEl}
        anchorEl={document.getElementById("btnAnchor")}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>🇫🇷 FR</MenuItem>
        <br />
        <MenuItem onClick={handleClose}>🇩🇿 AR</MenuItem>
      </Menu>
    </div>
  );
};
