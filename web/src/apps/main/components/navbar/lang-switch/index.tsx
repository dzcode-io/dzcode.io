/* eslint sort-imports:off */
import { FC, useState } from "react";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { SettingsState } from "src/apps/main/redux/reducers/settings";
//Mui
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() =>
  createStyles({
    mu: {
      "& .MuiMenu-list": {
        padding: "3px 10px",
      },
    },
  }),
);

export const LanguageSwitch: FC = () => {
  const { settings } = useSelector<StateInterface, StateInterface>(
    (state) => state,
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<Dispatch<SettingsState>>();
  const classes = useStyles();

  // List of availble lang flags
  const flags: { [key: string]: string } = { en: "🇺🇸", fr: "🇫🇷 ", ar: "🇩🇿 " };

  // Show the list and languages
  const showMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Render the list all supported language except
  const langMenu = (): any[] => {
    const list: any[] = [];
    Object.keys(flags).forEach((key) => {
      if (key !== settings.lang)
        list.push(
          <>
            <MenuItem id={key} onClick={selectLang}>
              {flags[key] + " " + key.toUpperCase()}
            </MenuItem>
            <br />
          </>,
        );
    });
    return list;
  };

  const selectLang = (e: any) => {
    if (e.currentTarget.id)
      dispatch({
        type: "UPDATE_LANGUAGE",
        payload: { lang: e.currentTarget.id },
      });
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="btnAnchor"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={showMenu}
      >
        {flags[settings.lang] + " " + settings.lang}
      </Button>
      <Menu
        className={classes.mu}
        anchorEl={document.getElementById("btnAnchor")}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={selectLang}
      >
        {langMenu()}
      </Menu>
    </div>
  );
};
