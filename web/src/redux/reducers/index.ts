import { combineReducers } from "redux";

import { articles } from "./articles";
import { articlesPage } from "./articles-page";
import { contributePage } from "./contribute-page";
import { documentation } from "./documentation";
import { faqPage } from "./faq-page";
import { footerComponent } from "./footer-component";
import { learnPage } from "./learn-page";
import { navbarComponent } from "./navbar-component";
import { projectsPage } from "./projects-page";
import { settings } from "./settings";
import { teamPage } from "./team-page";

export const mainReducer = combineReducers({
  documentation,
  learnPage,
  articles,
  articlesPage,
  projectsPage,
  settings,
  faqPage,
  navbarComponent,
  footerComponent,
  contributePage,
  teamPage,
});
