import { articlesScreen } from "./articles-screen";
import { combineReducers } from "redux";
import { contributeScreen } from "./contribute-screen";
import { general } from "./general";

export const mainReducer = combineReducers({
  articlesScreen,
  contributeScreen,
  general,
});
