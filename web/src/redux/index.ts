import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import * as slicesImport from "src/redux/reducers";

// -----------------------------------------------------------------------------
export type Slices = typeof slicesImport;
export type SlicesKey = keyof typeof slicesImport;
export type Reducers = { [K in keyof Slices]: Slices[K]["reducer"] };
export type Actions = { [K in keyof Slices]: Slices[K]["actions"] };
export type ActionTypesRecord = {
  [K in keyof Actions]: `${keyof Actions[K] & string}`;
};
export type ActionType = {
  [K in keyof Actions]: `${K}/${keyof Actions[K] & string}`;
}[SlicesKey];
export type State = ReturnType<typeof rootReducer>;
// -----------------------------------------------------------------------------

// @TODO-ZM: export `actions` instead, and make it work without dispatch
export const slices = slicesImport;
// @TODO-ZM: state getter where it chases the state when no action has been fired
// @TODO-ZM: enforce not using useSelector

const reducers = (Object.keys(slicesImport) as SlicesKey[]).reduce(
  (pV, sliceKey) => ({ ...pV, [sliceKey]: slicesImport[sliceKey].reducer }),
  {} as Reducers,
);
const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStore = () =>
  configureStore({ reducer: rootReducer, enhancers: composeEnhancers });

// @TODO-ZM: don't export store change it from `const` to `let`, and only export createStore(), which creates a store, returns it and also assign it to let store.
export const store = createStore();
