import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SettingsState } from "src/apps/main/redux/reducers/settings";
import { Translate } from "@material-ui/icons";
import { languages } from "src/_common/config/languages";

export const LanguageSwitch: FC = () => {
  const { settings } = useSelector<StateInterface, StateInterface>((state) => state);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch<Dispatch<SettingsState>>();
  const anchorButton = useRef(null);

  return (
    <Box minWidth={20}>
      <Button ref={anchorButton} onClick={() => setDropDownOpen(true)} startIcon={<Translate />}>
        {settings.language.shortLabel}
      </Button>
      <Menu
        anchorEl={anchorButton.current}
        open={dropDownOpen}
        onClose={() => setDropDownOpen(false)}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.label}
            onClick={() => {
              dispatch({
                type: "UPDATE_SETTINGS",
                payload: { language },
              });
              setDropDownOpen(false);
            }}
          >
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
