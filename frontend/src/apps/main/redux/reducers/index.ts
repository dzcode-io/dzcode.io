import { combineReducers } from "redux";
import { documentation } from "./documentation";
import { learnScene } from "./learn-scene";

export const mainReducer = combineReducers({
  documentation,
  learnScene,
});
