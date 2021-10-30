import { applyMiddleware, compose, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import { mainReducer } from "./reducers";

/**
 * the main redux state, with all the reducers
 */
export const mainStore = createStore(mainReducer, compose(applyMiddleware(thunk)));

/**
 * Creates a new redux state each time this function is called, this is used only for unit tests, to ensure that we have fresh state on each individual test
 */
export const createMainStore = () => {
  return createStore(mainReducer, compose(applyMiddleware(thunk)));
};

export type StateInterface = ReturnType<typeof mainStore.getState>;

export type ActionType =
  | "UPDATE_SETTINGS"
  | "UPDATE_GENERAL"
  | "UPDATE_CONTRIBUTE_SCREEN"
  | "UPDATE_ARTICLES_SCREEN"
  | "UPDATE_LEARN_SCREEN"
  | "UPDATE_PROJECTS_SCREEN";

export interface Action<T> {
  type: ActionType;
  payload: Partial<T>;
}

export type ThunkResult<A = Record<string, unknown>, E = Record<string, unknown>> = ThunkAction<
  void,
  StateInterface,
  E,
  Action<A>
>;

export type Dispatch<A> = ThunkDispatch<StateInterface, Record<string, unknown>, Action<A>>;
