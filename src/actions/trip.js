import * as types from './actionTypes';

const initialState = {
  name: '',
  people: [],
  expenses: []
};

function trip(state = initialState, action) {
  switch (action.type) {
    case types.GET_TRIP_SUCCESS:
      debugger;
      return {
        ...state
      }
    default:
      return state;
  }
}

export default trip;
