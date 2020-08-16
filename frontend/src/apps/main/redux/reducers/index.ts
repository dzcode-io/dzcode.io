import FaqScene from "./faq-scene";
import { articles } from "./articles";
import { articlesScene } from "./articles-scene";
import { combineReducers } from "redux";
import { documentation } from "./documentation";
import { landingScene } from "./landing-scene";
import { layout } from "./layout-reducer";
import { learnScene } from "./learn-scene";
import { projects } from "./projects";
import { projectsScene } from "./projects-scene";
import { settings } from "./settings";

export const mainReducer = combineReducers({
  documentation,
  learnScene,
  articles,
  articlesScene,
  projects,
  projectsScene,
  landingScene,
  settings,
  layout,
  FaqScene,
});
