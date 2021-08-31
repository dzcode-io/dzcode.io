import { combineReducers } from "redux";
import { contributePage } from "./contribute-page";
import { general } from "./general";

export const mainReducer = combineReducers({
  contributePage,
  general,
});
