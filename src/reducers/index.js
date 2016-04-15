import { combineReducers } from 'redux';

function trips(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  trips
});

export default rootReducer;
