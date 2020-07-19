import { combineReducers } from "redux";
import { documentation } from "./documentation";
import { learnScene } from "./learn-scene";
import FaqScene from "./faq-scene";
import { articles } from "./articles";
import { articlesScene } from "./articles-scene";
import { projects } from "./projects";
import { projectsScene } from "./projects-scene";

export const mainReducer = combineReducers({
  documentation,
  learnScene,
  articles,
  articlesScene,
  FaqScene,
  projects,
  projectsScene,
});
