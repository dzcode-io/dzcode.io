import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import * as slices from "src/redux/reducers";

// -----------------------------------------------------------------------------
type Slices = typeof slices;
export type SlicesKey = keyof typeof slices;
type Reducers = { [K in keyof Slices]: Slices[K]["reducer"] };
type Actions = { [K in keyof Slices]: Slices[K]["actions"] };
export type ActionType = {
  [K in keyof Actions]: `${K}/${keyof Actions[K] & string}`;
}[SlicesKey];
export type State = ReturnType<typeof rootReducer>;
// -----------------------------------------------------------------------------

const reducers = (Object.keys(slices) as SlicesKey[]).reduce(
  (pV, sliceKey) => ({ ...pV, [sliceKey]: slices[sliceKey].reducer }),
  {} as Reducers,
);
const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStore = () => configureStore({ reducer: rootReducer, enhancers: composeEnhancers });

let store = createStore();

type GetStoreParam = {
  cacheStore?: boolean;
};

export const getStore = ({ cacheStore = false }: GetStoreParam = {}) => {
  if (!cacheStore) {
    store = createStore();
  }
  return store;
};

// @TODO-ZM: cache this, and add a subscriber that refreshes the cache whenever new actions get dispatched
export const getState = store.getState;

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
