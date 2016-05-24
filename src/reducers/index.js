import { combineReducers } from 'redux';

import travelers from './travelers';
import trip from './trip';
import trips from './trips';

const rootReducer = combineReducers({
  travelers,
  trip,
  trips
});

export default rootReducer;
