import * as types from '../actions/actionTypes';
import { reject } from 'lodash';

const initialState = {
  list: []
};

function trips(state = initialState, action) {
  switch (action.type) {
    case types.GET_TRIPS_SUCCESS:
      return {
        'list': action.trips
      }
    case types.CREATE_TRIP_SUCCESS:
      return {
        'list': state.list.concat(action.trip)
      }
    case types.DELETE_TRIP_SUCCESS:
      const newTrips = reject(state.list, trip => { return trip.name === action.tripName });
      return { list: newTrips }
    default:
      return state;
  }
}

export default trips;
