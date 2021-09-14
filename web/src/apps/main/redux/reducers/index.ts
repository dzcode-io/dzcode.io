import { articles } from "./articles";
import { articlesPage } from "./articles-page";
import { combineReducers } from "redux";
import { contributePage } from "./contribute-page";
import { documentation } from "./documentation";
import { faqPage } from "./faq-page";
import { footerComponent } from "./footer-component";
import { landingPage } from "./landing-page";
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
  landingPage,
  settings,
  faqPage,
  navbarComponent,
  footerComponent,
  contributePage,
  teamPage,
});
