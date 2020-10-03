import { articles } from "./articles";
import { articlesPage } from "./articles-page";
import { combineReducers } from "redux";
import { documentation } from "./documentation";
import { faqPage } from "./faq-page";
import { landingPage } from "./landing-page";
import { layout } from "./layout-reducer";
import { learnPage } from "./learn-page";
import { projectsPage } from "./projects-page";
import { settings } from "./settings";

export const mainReducer = combineReducers({
  documentation,
  learnPage,
  articles,
  articlesPage,
  projectsPage,
  landingPage,
  settings,
  layout,
  faqPage,
});
