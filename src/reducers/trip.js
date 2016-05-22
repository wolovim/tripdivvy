import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  name: '',
  expenses: [],
  travelers: []
}

function trip(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_TRIP:
      return {
        ...state,
        isFetching: true
      }
    case types.GET_TRIP_SUCCESS:
      return {
        ...state,
        ...action.trip,
        isFetching: false
      }
    case types.CREATE_TRIP_SUCCESS:
      return {
        ...state,
        ...action.trip
      }
    default:
      return state;
  }
}

export default trip;
