import { combineReducers } from "redux";

import { articlesScreen } from "./articles-screen";
import { contributeScreen } from "./contribute-screen";
import { faqScreen } from "./faq-screen";
import { general } from "./general";
import { learnScreen } from "./learn-screen";
import { projectsScreen } from "./projects-screen";

export const mainReducer = combineReducers({
  articlesScreen,
  contributeScreen,
  faqScreen,
  learnScreen,
  projectsScreen,
  general,
});
