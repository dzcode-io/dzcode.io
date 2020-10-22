import * as React from "react";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      fontFamily: theme.typography.fontFamily,
      position: "relative",
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.common.white,
      },
      "& $inputInput": {
        transition: theme.transitions.create("width"),
        width: 0,
        padding: theme.spacing(1, 1, 1, 4),
        "&:focus": {
          width: 170,
        },
      },
    },
    search: {
      width: theme.spacing(5),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 5),
    },
  }),
  { name: "AppSearch" },
);

/**
 * When using this component it is recommend to include a preload link
 * `<link rel="preload" href="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css" as="style" />`
 * to potentially reduce load times
 */
export default function AppSearch() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <SearchIcon />
      </div>
      <Input
        disableUnderline
        placeholder=""
        type="search"
        id="docsearch-input"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
}
