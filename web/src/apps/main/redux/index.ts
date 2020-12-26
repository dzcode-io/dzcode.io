import { compose, createStore } from "redux";

import { applyMiddleware } from "redux";
import { mainReducer } from "./reducers";
import thunk from "redux-thunk";

const composeEnhancers = (((window as unknown) as Record<string, unknown>)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) as typeof compose;

export const mainStore = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
