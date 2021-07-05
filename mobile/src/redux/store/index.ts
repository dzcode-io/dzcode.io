
// import redux
import {createStore, combineReducers} from 'redux';

// import redux reducers
import {} from '../reducers';

// define app reducers
const appReducers = combineReducers({
  // you need to add your reducers here
});

// export store
export const store = createStore(appReducers);
