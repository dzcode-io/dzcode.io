import { combineReducers } from "redux";
import { contributePage } from "./contribute-page";
import { articlesPage } from "./articles-page";
import { general } from "./general";

export const mainReducer = combineReducers({
  articlesPage,
  contributePage,
  general,
});
