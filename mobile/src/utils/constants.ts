import React from "react";

// padding sizes
export const SMALL_PADDING_SIZE = 5;
export const MEDIUM_PADDING_SIZE = 10;
export const LARGE_PADDING_SIZE = 25;

// margin sizes
export const SMALL_MARGIN_SIZE = 5;
export const MEDIUM_MARGIN_SIZE = 10;
export const LARGE_MARGIN_SIZE = 25;

// text sizes
export const SMALL_TEXT_SIZE = 13;
export const MEDIUM_TEXT_SIZE = 19;
export const LARGE_TEXT_SIZE = 23;
export const BIG_TEXT_SIZE = 30;
export const HUGE_TEXT_SIZE = 50;

// border radius sizes
export const SMALL_BORDER_RADIUS = 10;
export const MEDIUM_BORDER_RADIUS = 20;

// prefrences context
export const PrefrencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});
