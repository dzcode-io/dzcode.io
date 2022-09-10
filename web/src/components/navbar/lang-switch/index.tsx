import { allLanguages } from "@dzcode.io/models/dist/language";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { slices } from "src/redux";
import { useSliceSelector } from "src/redux/selectors";

export const LanguageSwitch: FC = () => {
  const settings = useSliceSelector("settings");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
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
              dispatch(slices.settings.actions.set({ language }));
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
