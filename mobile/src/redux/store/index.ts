import {} from "../reducers";
import { combineReducers, createStore } from "redux";

// define app reducers
const appReducers = combineReducers({
  // you need to add your reducers here
});

// export store
export const store = createStore(appReducers);
