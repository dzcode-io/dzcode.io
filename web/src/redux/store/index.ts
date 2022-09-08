import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import * as slicesImport from "src/redux/store/slices";

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

export const slices = slicesImport;

const reducers = (Object.keys(slicesImport) as SlicesKey[]).reduce(
  (pV, sliceKey) => ({ ...pV, [sliceKey]: slicesImport[sliceKey].reducer }),
  {} as Reducers,
);
const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({ reducer: rootReducer, enhancers: composeEnhancers });
