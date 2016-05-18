import * as types from '../actions/actionTypes';

const initialState = {
  name: '',
  expenses: [],
  travelers: []
}

function trip(state = initialState, action) {
  switch (action.type) {
    case types.GET_TRIP_SUCCESS:
      return {
        ...state,
        ...action.trip
      }
    default:
      return state;
  }
}

export default trip;
