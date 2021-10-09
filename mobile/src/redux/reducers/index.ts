import { articlesScreen } from "./articles-screen";
import { combineReducers } from "redux";
import { contributeScreen } from "./contribute-screen";
import { faqScreen } from "./faq-screen";
import { learnScreen } from "./learn-screen";
import { general } from "./general";

export const mainReducer = combineReducers({
  articlesScreen,
  contributeScreen,
  faqScreen,
  learnScreen,
  general,
});
