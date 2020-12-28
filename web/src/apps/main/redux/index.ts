import { compose, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import { applyMiddleware } from "redux";
import { mainReducer } from "./reducers";

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * the main redux state, with all the reducers
 */
export const mainStore = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

/**
 * Creates a new redux state each time this function is called, this is used only for unit tests, to ensure that we have fresh state on each individual test
 */
export const createMainStore = () => {
  return createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)));
};

export type StateInterface = ReturnType<typeof mainStore.getState>;

export type ActionType =
  | "UPDATE_DOCUMENTATION"
  | "UPDATE_LEARN_PAGE"
  | "UPDATE_ARTICLES"
  | "UPDATE_ARTICLES_PAGE"
  | "UPDATE_PROJECTS"
  | "UPDATE_PROJECTS_PAGE"
  | "UPDATE_LANDING_PAGE"
  | "UPDATE_SETTINGS";

export interface Action<T> {
  type: ActionType;
  payload: Partial<T>;
}

export type ThunkResult<
  A = Record<string, unknown>,
  E = Record<string, unknown>
> = ThunkAction<void, StateInterface, E, Action<A>>;

export type Dispatch<A> = ThunkDispatch<
  StateInterface,
  Record<string, unknown>,
  Action<A>
>;
