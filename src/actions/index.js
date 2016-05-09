import * as types from './actionTypes';
import trip from '../services/trip';

export function createTrip(tripName) {
  return dispatch => {
    trip.addTrip(tripName)
      .then(dispatch(createTripSuccess(tripName)));
  }
}

function createTripSuccess(tripName) {
  return { type: types.CREATE_TRIP_SUCCESS, tripName };
}

export function getTrips() {
  return dispatch => {
    trip.getTrips()
      .then(trips => dispatch(getTripsSuccess(trips)));
  }
}

function getTripsSuccess(trips) {
  return { type: types.GET_TRIPS_SUCCESS, trips };
}

export function getTrip(tripName) {
  return dispatch => {
    trip.getTrip(tripName)
      .then(trip => dispatch(getTripSuccess(trip)));
  }
}

function getTripSuccess(trip) {
  return { type: types.GET_TRIP_SUCCESS, trip };
}

export function addExpense(tripName, expense) {
  return dispatch => {
    trip.addExpense(tripName, expense)
      .then(() => dispatch(getTrip(tripName)));
  }
}
