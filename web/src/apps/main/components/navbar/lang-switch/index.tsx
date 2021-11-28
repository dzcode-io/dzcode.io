import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { SettingsState } from "src/apps/main/redux/reducers/settings";
import { allLanguages } from "@dzcode.io/models/dist/language";

export const LanguageSwitch: FC = () => {
  const { settings } = useSelector<StateInterface, StateInterface>((state) => state);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch<Dispatch<SettingsState>>();
  const anchorButton = useRef(null);

  return (
    <div>
      <Button ref={anchorButton} onClick={() => setDropDownOpen(true)}>
        {settings.language.shortLabel}
      </Button>
      <Menu
        anchorEl={anchorButton.current}
        open={dropDownOpen}
        onClose={() => setDropDownOpen(false)}
      >
        {allLanguages.map((language) => (
          <MenuItem
            key={language.label}
            style={{ margin: 5 }}
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
    </div>
  );
};
