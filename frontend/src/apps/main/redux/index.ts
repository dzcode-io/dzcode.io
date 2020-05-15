import { createStore, compose } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { mainReducer } from "./reducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const mainStore = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
