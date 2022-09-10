import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import * as slices from "src/redux/reducers";

// -----------------------------------------------------------------------------
export type Slices = typeof slices;
export type SlicesKey = keyof typeof slices;
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

// @TODO-ZM: state getter where it chases the state when no action has been fired
// @TODO-ZM: enforce not using useSelector

const reducers = (Object.keys(slices) as SlicesKey[]).reduce(
  (pV, sliceKey) => ({ ...pV, [sliceKey]: slices[sliceKey].reducer }),
  {} as Reducers,
);
const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStore = () =>
  configureStore({ reducer: rootReducer, enhancers: composeEnhancers });

// @TODO-ZM: don't export store change it from `const` to `let`, and only export createStore(), which creates a store, returns it and also assign it to let store.
export const store = createStore();

export const actions = (Object.keys(slices) as SlicesKey[]).reduce(
  (pV, sliceKey) => ({
    ...pV,
    [sliceKey]: Object.keys(slices[sliceKey].actions).reduce(
      (contextualActions, actionName) => ({
        ...contextualActions,
        [actionName]: (...args: any[]) =>
          store.dispatch((slices[sliceKey].actions as any)[actionName](...args)),
      }),
      {},
    ),
  }),
  {} as Actions,
);
