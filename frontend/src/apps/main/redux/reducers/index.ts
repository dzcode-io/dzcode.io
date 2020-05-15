import { combineReducers } from "redux";
import { documentation } from "./documentation";
import { learnScene } from "./learn-scene";
import { articles } from "./articles";
import { articlesScene } from "./articles-scene";

export const mainReducer = combineReducers({
  documentation,
  learnScene,
  articles,
  articlesScene,
});
