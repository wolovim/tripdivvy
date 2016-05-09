import { combineReducers } from 'redux';

import trips from './trips';
import trip from './trip';

const rootReducer = combineReducers({
  trip,
  trips
});

export default rootReducer;
