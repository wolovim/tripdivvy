import * as types from '../actions/actionTypes';

const initialState = {
  list: []
};

function trips(state = initialState, action) {
  switch (action.type) {
    case types.GET_TRIPS_SUCCESS:
      return {
        ...state,
        'list': action.trips
      }
    case types.CREATE_TRIP_SUCCESS:
      return {
        ...state,
        'list': state.list.concat(action.trip)
      }
    default:
      return state;
  }
}

export default trips;
